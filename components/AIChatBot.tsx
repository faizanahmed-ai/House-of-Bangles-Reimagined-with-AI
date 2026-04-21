'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, Bot } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string }

const QUICK_QUESTIONS = [
  'How do I find my size?',
  "What's in the Velvet Deal Box?",
  'Best bangles for a wedding?',
  'What are your prices?',
]

const LOCAL_KB: { keywords: string[]; answer: string }[] = [

  // 1. GREETINGS
  {
    keywords: ['hi','hello','hey','heyy','heyyy','hii','hiii','salam','salaam','assalam','assalamualaikum','walaikum','aoa','aoawr','good morning','good afternoon','good evening','good night','goodnight','morning','evening','afternoon','sup','wassup','whats up',"what's up",'yo','hola','namaste','adaab','hy','hlw','hlo','helo','greetings','howdy','ahlan','marhaba'],
    answer: `Walaikum Assalam! 👋✨ Welcome to House of Bangles!\n\nI'm your personal HOB stylist — here 24/7 to help you with:\n💅 Sizes & measurements\n💰 Prices & products\n🎁 What's inside our deal boxes\n👑 Best picks for weddings & Eid\n🚚 Shipping info\n\nWhat can I help you with today? 😊`,
  },

  // 2. HOW ARE YOU
  {
    keywords: ['how are you','how r u','how ru','kya haal','kaisa hai','kaisi ho','kaise ho','theek ho','you good','you okay','hows it going',"how's it going",'all good','you well',"what's new",'whats new','sup with you','feeling','mood','aap theek'],
    answer: `Alhamdulillah, doing great and ready to help! 😊✨\n\nHope you're having a wonderful day too! 🌸\n\nAre you looking for bangles for a special occasion, or just exploring? I'm here to guide you!`,
  },

  // 3. WHO ARE YOU / BOT
  {
    keywords: ['who are you','what are you','are you a bot','are you ai','are you human','are you real','robot','chatbot','automated','talking to human','real person','your name','whats your name',"what's your name",'name kya hai','tum kaun ho','aap kaun hain','introduce yourself','gpt','chatgpt','claude','ai model'],
    answer: `I'm HOB Stylist — your AI-powered bangle assistant! 🤖✨\n\nI know everything about our products, prices, sizes, and policies. Available 24/7!\n\nFor direct human support:\n📱 WhatsApp: +92-313-8560441\n📸 Instagram: @houseofbanglesx\n\nWhat can I help you find? 💅`,
  },

  // 4. THANK YOU
  {
    keywords: ['thank you','thanks','thankyou','thank u','thx','ty','shukriya','shukria','jazakallah','jazak allah','bahut shukriya','bohat shukriya','appreciate','helpful','you helped','great help'],
    answer: `You're so welcome! 🌸 JazakAllah Khair!\n\nIf you need anything else — sizing, product info, or anything at all — I'm always here! Happy shopping! 🛍️✨`,
  },

  // 5. COMPLIMENTS TO HOB
  {
    keywords: ['love your bangles','beautiful bangles','nice bangles','great bangles','gorgeous','stunning','lovely','love hob','love this brand','best brand','best bangles','amazing bangles','obsessed','addicted','favourite brand','favorite brand','recommend to friends','masha allah','mashallah','subhanallah'],
    answer: `Aww that means everything to us! 🥰💕\n\nWe put so much love into every piece!\n\nTag us on Instagram @houseofbanglesx when you wear your bangles — we LOVE seeing our customers! 📸✨\n\nAnything I can help you find today? 😊`,
  },

  // 6. COMPLAINTS
  {
    keywords: ['complaint','complain','not happy','unhappy','disappointed','bad quality','broken','damaged','wrong order','wrong product','not delivered','late delivery','lost parcel','missing item','refund','money back','cheated','fraud','scam','not received','where is my order','order status','tracking','shikayat','problem','issue'],
    answer: `I'm really sorry to hear that! 😔 We take this very seriously.\n\nPlease contact our team directly:\n📱 WhatsApp: +92-313-8560441 (fastest)\n📸 Instagram: @houseofbanglesx\n\nShare: order details + photos if quality issue. We'll make it right, InshAllah! 🙏`,
  },

  // 7. FAREWELLS
  {
    keywords: ['bye','byeee','byee','goodbye','good bye','see you','cya','take care','later','ttyl','talk later','going now','khuda hafiz','allah hafiz','allahafiz','alvida','phir milenge','tc','bbye','ok bye','see ya','farewell','leaving'],
    answer: `Allah Hafiz! 💕 Thank you for visiting House of Bangles!\n\nCome back anytime — we're always here for you! 🌸\n\n📱 WhatsApp: +92-313-8560441\n📸 @houseofbanglesx\n\nHappy wearing! ✨`,
  },

  // 8. YES/OKAY/ACKNOWLEDGEMENT
  {
    keywords: ['okay','ok','okk','okkk','alright','sure','yes','yep','yup','yeah','yea','got it','understood','fine','noted','haan','ha','theek hai','theek','accha','acha','ji','ji haan','bilkul','zaroor','of course','received','seen'],
    answer: `Perfect! 😊 Anything else I can help you with?\n\nYou can ask about:\n• 📏 Sizes\n• 💰 Prices\n• 🎁 Deal box contents\n• 🚚 Shipping\n• 👑 Occasion picks\n\nJust ask! ✨`,
  },

  // 9. NO / NEGATIVE
  {
    keywords: ['no','nope','nah','nahi','nahin','not interested','not now','maybe later','pass','never mind','nevermind','its okay','its fine','dont need','dont want'],
    answer: `No problem at all! 😊 Whenever you're ready, I'm right here.\n\nFeel free to browse our collection at houseofbangles.store 🌸\n\nCome back anytime! Allah Hafiz! 💕`,
  },

  // 10. CONFUSED / FIRST TIME BUYER
  {
    keywords: ['confused','not sure','dont know',"don't know",'help me choose','what should i buy','suggest something','recommend something','kya lun','kya lu','samajh nahi','guide me','lost','overwhelmed','too many options','where to start','first time','new customer','never bought','first purchase','beginner','starter'],
    answer: `No worries — I've got you! 😊\n\n🥇 BEST STARTER — Velvet Deal Box (Rs. 3,000)\n120 bangles + pearls + kundan. 100+ set combos!\n\n💅 BUDGET PICK — Pearl Kara Pair (Rs. 600)\nSimple, elegant, works with everything.\n\n🔥 TRENDING — Hania Amir Pearl Bangles (from Rs. 700)\nOur most viral product!\n\n👑 PREMIUM — Metal Deal Box (Rs. 4,000)\nLuxurious, festive, unforgettable.\n\nWhat's your budget or occasion? I'll narrow it down! 😊`,
  },

  // 11. SIZE GUIDE
  {
    keywords: ['size','sizing','measure','wrist','fit','fitting','which size','what size','saiz','sawa','dhai','adha','do number','too tight','too loose','small wrist','big wrist','bangle size','size guide','how to measure','measurement','cm','centimeter','inch','kaun sa size','mera size','konsa size','size kya','size chart','right size','correct size','size select','size choose','2.4','2.6','2.8','2.0'],
    answer: `Complete Size Guide 📏\n\nMeasure wrist circumference (full circle) just below wrist bone:\n\n• 2.0" — Extra Small / "do" → ~14.5 cm\n• 2.4" — Small / "Adha pao do" → 15.5–16.5 cm\n• 2.6" — Medium / "Sawa do" → 16.5–17.5 cm ← Most Popular\n• 2.8" — Large / "Dhai" → 17.5–18.5 cm\n\n💡 Between sizes? Go one size UP.\n💡 No tape? Use a paper strip, mark it, measure with ruler.\n\nHomepage Size Guide has a calculator — enter cm, get size instantly!`,
  },

  // 12. VELVET DEAL BOX
  {
    keywords: ['velvet deal box','velvet deal','special velvet box','deal box velvet','3000','rs 3000','3,000','whats in velvet',"what's in velvet",'velvet box contains','velvet bundle','velvet set box','velvet deal kya'],
    answer: `HOB's Special Velvet Deal Box — Rs. 3,000 🎁\n\nIncludes:\n💎 10 Dozen Glass Velvet Bangles (120 bangles)\n🤍 1 Pair of Pearl Karras\n🌸 12 Thin Pearl Bangles\n👑 4 Kundan Bangles\n\n100+ set combinations possible!\nSizes: 2.0", 2.4", 2.6", 2.8"\nPackaging: White corrugated gift box 📦`,
  },

  // 13. METAL DEAL BOX
  {
    keywords: ['metal deal box','metal deal','special metal deal','4000','rs 4000','4,000','whats in metal deal','metal deal contains','metal bundle deal'],
    answer: `HOB's Special Metal Deal Box — Rs. 4,000 ✨\n\nIncludes:\n💍 10 Dozen Metal Bangles (120 bangles)\n🕊️ 1 Pair of Pearl Karras\n🌹 12 Slim Pearl Bangles\n👑 4 Kundan Bangles\n\n100+ combinations!\nSizes: 2.4", 2.6", 2.8"`,
  },

  // 14. METAL BANGLES BOX
  {
    keywords: ['metal bangles box','special metal bangles box','2500','rs 2500','2,500','metal 10 colors','metal box contains'],
    answer: `HOB's Special Metal Bangles Box — Rs. 2,500 💍\n\n• 120 Metal Bangles (10 Dozen)\n• 10 Different Colors\n• Polished metallic finish\n• Strong & lightweight\n\nSizes: 2.4", 2.6", 2.8"`,
  },

  // 15. VELVET BANGLES BOX
  {
    keywords: ['velvet bangles box','special velvet bangles box','1750','rs 1750','1,750','velvet 10 colors','velvet box kya hai'],
    answer: `HOB's Special Velvet Bangles Box — Rs. 1,750 🧶\n\n• 120 Velvet Bangles (10 Dozen)\n• 10 Different Colors\n• Soft velvet finish\n• Durable & lightweight\n\nSizes: 2.4", 2.6", 2.8"`,
  },

  // 16. ALL PRICES
  {
    keywords: ['price','prices','cost','how much','kitna','rate','rates','pricing','affordable','cheap','expensive','budget','all prices','price list','kitne ka','kitnay ka','full price list','catalogue','catalog','all products','complete list','what do you have','what do you sell','sab products','poora list'],
    answer: `Complete Price List 📋\n\n🎁 DEAL BOXES:\n• Velvet Deal Box — Rs. 3,000\n• Metal Deal Box — Rs. 4,000\n• Metal Bangles Box — Rs. 2,500\n• Velvet Bangles Box — Rs. 1,750\n\n💅 VELVET PEARL SETS — Rs. 1,450 each\n👑 KUNDAN SETS — Rs. 1,150 each\n🌸 THIN PEARL SETS — Rs. 1,250 each\n\n✨ PEARL SPECIALS:\n• Hania Amir Pearl — from Rs. 700\n• Triple Karra Set — Rs. 1,750\n• Pearl Kara Pair — Rs. 600\n\n⚙️ Glass Bangles (dozen) — Rs. 250\n🚚 Free shipping above Rs. 1,999!`,
  },

  // 17. SHIPPING
  {
    keywords: ['ship','shipping','delivery','deliver','dispatch','courier','karachi','lahore','islamabad','rawalpindi','faisalabad','multan','peshawar','quetta','hyderabad','pakistan','all cities','how long','kitne din','days','when will','kab ayega','free shipping','shipping charges','delivery charges','shipping fee','minimum order'],
    answer: `Shipping & Delivery 🚚\n\n✅ All cities across Pakistan\n📦 3–5 business days\n🆓 FREE shipping above Rs. 1,999\n⚠️ Minimum order: Rs. 1,250\n\nSecurely packed in white corrugated box.\n📱 Urgent? WhatsApp: +92-313-8560441`,
  },

  // 18. HANIA AMIR / VIRAL
  {
    keywords: ['hania','hania amir','viral','viral bangles','viral look','trending','trend','thin pearl','delicate pearl','700','rs 700','most popular','instagram famous','celebrity','influencer'],
    answer: `Hania Amir Inspired Pearl Bangles — from Rs. 700 🔥\n\nOur most viral product! Delicate thin pearl bangles inspired by Hania Amir's iconic look.\n\n💡 Stack 3–5 sets for full effect!\n\nRelated:\n• Triple Karra Set — Rs. 1,750\n• Pearl Kara Pair — Rs. 600`,
  },

  // 19. WEDDINGS / OCCASIONS
  {
    keywords: ['wedding','bridal','shaadi','nikah','walima','barat','eid','mehndi','mayun','occasion','event','function','party','festival','best for wedding','wedding bangles','gift','gifting','present','tuhfa','surprise gift','special occasion','formal'],
    answer: `Best for Special Occasions 👑\n\n🥇 WEDDINGS — Velvet Deal Box (Rs. 3,000)\n100+ combinations from one box!\n\n🥈 PREMIUM — Metal Deal Box (Rs. 4,000)\nGlamorous metallic for the big day.\n\n💅 MEHNDI/MAYUN — Velvet Pearl Sets (Rs. 1,450)\nColorful and traditional!\n\n🌸 EID GIFT — Velvet Bangles Box (Rs. 1,750)\n120 bangles in 10 colors, beautifully packed!`,
  },

  // 20. QUALITY / MATERIAL
  {
    keywords: ['quality','material','made of','original','fake','genuine','durable','last long','tarnish','fade','peel','authentic','real','trust','reliable','good quality','premium'],
    answer: `Quality & Materials 💎\n\n🧶 Velvet — Rich fabric, vibrant colors, luxurious texture\n👑 Kundan — Hand-placed stones, traditional craft\n🌸 Pearl — Genuine pearl-finish, lightweight & elegant\n💍 Metal — Polished, strong, long-lasting\n\n✅ 10,000+ customers trust our quality!\n\nCare tip: Avoid water & direct perfume contact.`,
  },

  // 21. COMPARING
  {
    keywords: ['compare','difference','vs','versus','which is better','best','top','popular','should i get','which should i buy','konsa lena','velvet vs metal','pearl vs kundan','which collection'],
    answer: `Comparison Guide 🤔\n\n🧶 VELVET — Traditional, colorful, soft. Best for ceremonies.\n👑 KUNDAN — Stonework, regal, bridal. Best for weddings.\n🌸 PEARL — Modern, elegant, minimalist. Best for everyday.\n💍 METAL — Durable, shiny, festive. Best for daily wear.\n\n🎁 DEAL BOXES — Best value: get ALL styles!\n\n💡 Most customers start with the Velvet Deal Box!`,
  },

  // 22. HOW TO ORDER
  {
    keywords: ['how to order','order process','place order','buy','purchase','order karna','kaise order','checkout','payment','pay','cod','cash on delivery','online payment','easypaisa','jazzcash','bank transfer','order steps'],
    answer: `How to Order 🛒\n\nWebsite:\n1. Select product & size\n2. Add to cart → Checkout\n\nWhatsApp (easiest!):\n1. Message: +92-313-8560441\n2. Product + Size + Address\n3. We ship!\n\n💳 Payment: COD • EasyPaisa • JazzCash • Bank Transfer\n🚚 Free shipping above Rs. 1,999!`,
  },

  // 23. EXCHANGE / RETURN
  {
    keywords: ['return','exchange','refund','wrong size','size issue','size problem','size galat','replace','return policy','exchange policy','can i return','can i exchange'],
    answer: `Exchange Policy 🔄\n\n✅ Exchanges for size issues\n✅ Original condition required\n\nContact us:\n📱 WhatsApp: +92-313-8560441\n📸 @houseofbanglesx\n\nShare order details + photos. We'll sort it quickly! 🙏`,
  },

  // 24. CONTACT
  {
    keywords: ['whatsapp','contact','call','number','phone','instagram','reach','social media','follow','customer service','support','helpline','email'],
    answer: `Contact Us 📱\n\n💬 WhatsApp: +92-313-8560441\n📸 Instagram: @houseofbanglesx\n🌐 houseofbangles.store\n\nYou can also order directly on WhatsApp!\nWe reply within a few hours ⚡`,
  },

  // 25. ABOUT HOB
  {
    keywords: ['about','about hob','who are hob','house of bangles','brand','company','story','hyderabad','authentic','how old','since when','established','where are you','location','based'],
    answer: `About House of Bangles 💫\n\nAuthentic Hyderabadi bangles, rooted in centuries of tradition. Sourced from master artisans in the old city of Hyderabad.\n\n📊 7+ years • 10,000+ orders • 500+ designs • 5-star rating\n🚚 Ships across all Pakistan\n📱 @houseofbanglesx | houseofbangles.store`,
  },

  // 26. WHOLESALE / BULK
  {
    keywords: ['wholesale','bulk','bulk order','resell','reseller','business','shop','retailer','large order','dozen','gross','many pieces'],
    answer: `Wholesale & Bulk Orders 📦\n\nDeal Boxes are perfect for resellers:\n• Velvet Deal Box — Rs. 3,000 (120 bangles)\n• Metal Deal Box — Rs. 4,000 (120 bangles)\n• Metal Bangles Box — Rs. 2,500 (120 bangles)\n• Velvet Bangles Box — Rs. 1,750 (120 bangles)\n\nCustom bulk orders:\n📱 WhatsApp: +92-313-8560441\n\nWe work with many resellers across Pakistan!`,
  },

  // 27. BORED / JUST CHATTING
  {
    keywords: ['bored','nothing to do','just chatting','just talking','kuch nahi','timepass','time pass','just browsing','just looking','window shopping','passing time'],
    answer: `Haha no worries, glad you stopped by! 😄✨\n\nDid you know our Hania Amir pearl bangles are going VIRAL? 🔥\n\nOr the Velvet Deal Box — 120 bangles for Rs. 3,000 — could be your next obsession! 😉\n\nAnything catch your eye? 💕`,
  },

  // 28. FUNNY / RANDOM
  {
    keywords: ['lol','lmao','haha','hehe','hihi','funny','joke','humor','laugh','lolll','lmaooo','omg','omgg','rofl','xd','lool'],
    answer: `Haha love the energy! 😄✨\n\nYou know what's even better than laughing? Finding the perfect bangles! 💅\n\nWhat are you looking for today? I'll make it fun, I promise! 😊`,
  },

  // 29. LOVE / CUTE MESSAGES
  {
    keywords: ['love you','love u','i love','cute','adorable','sweet','you are great','you are amazing','best chatbot','best bot','marry me','you are perfect'],
    answer: `Aww you're making me blush! 🥰💕\n\nWe love our customers right back — that's why we work so hard for you!\n\nAnything I can help you find today? 😊✨`,
  },

  // 30. URGENT ORDERS
  {
    keywords: ['urgent','urgently','fast','quickly','asap','immediately','jaldi','jaldi chahiye','kal chahiye','aaj chahiye','same day','express delivery','need today','need tomorrow','event tomorrow','wedding tomorrow','emergency'],
    answer: `For urgent orders — contact us directly on WhatsApp for fastest help! ⚡\n\n📱 WhatsApp: +92-313-8560441\n\nTell us: Product + Size + City\n\nStandard delivery: 3–5 business days. Our team will advise on fastest options! 🚀`,
  },

  // 31. BANGLE CARE
  {
    keywords: ['care','maintain','how to clean','clean bangles','store','how to store','keep safe','last longer','care tips','cleaning','wash','water','perfume','sweat','rust'],
    answer: `Bangle Care Tips 💎\n\n✅ Store in the box or dry place\n✅ Wipe with soft dry cloth\n✅ Handle gently\n\n❌ Avoid water\n❌ Avoid direct perfume spray\n❌ Avoid humid storage\n\nWith proper care, they'll stay beautiful for years! 🌸`,
  },

  // 32. COLORS AVAILABLE
  {
    keywords: ['colors','colours','color','colour','available colors','which colors','color options','konse rang','rang','shades','red','blue','green','pink','black','white','yellow','maroon','sea green','dark blue','dark green'],
    answer: `Colors Available 🎨\n\nVelvet Pearl Sets (Rs. 1,450 each):\n🔴 Maroon  🩷 Pink  ❤️ Red  🖤 Black  💛 Yellow\n🤍 White  💙 Dark Blue  🩵 Sea Green  💚 Dark Green\n\nKundan Sets (Rs. 1,150): White, Black, Maroon, Dark Blue\nThin Pearl Sets (Rs. 1,250): Black, Dark Green, Maroon, Red, Yellow\n\nDeal Boxes include multiple colors! 🎁`,
  },

  // 33. GLASS BANGLES
  {
    keywords: ['glass bangles','glass','churi','churian','golden glass','silver glass','250','rs 250','dozen bangles','12 bangles'],
    answer: `Glass Bangles 🪟\n\n• Golden Glass Bangles (dozen of 12) — Rs. 250\n• Silver Glass Bangles (dozen of 12) — Rs. 250\n\nPerfect for layering with velvet or pearl sets!\nAlso available inside our Deal Boxes in bulk quantities.\n\nSizes: 2.4", 2.6", 2.8"`,
  },

  // 34. KUNDAN SPECIFICALLY
  {
    keywords: ['kundan','kundan bangles','kundan set','stone bangles','polki','traditional','meenakari','bridal kundan','kundan velvet','what is kundan'],
    answer: `Kundan Velvet Sets — Rs. 1,150 each 👑\n\nKundan = traditional Hyderabadi craft with intricate stones set in gold-toned frames on velvet.\n\n4 Colors: White • Black • Maroon • Dark Blue\n\nFor maximum variety, the Velvet Deal Box (Rs. 3,000) includes 4 Kundan bangles + 120 velvet + pearls!\n\nSizes: 2.4", 2.6", 2.8"`,
  },

  // 35. VELVET SETS SPECIFICALLY
  {
    keywords: ['velvet bangles','velvet set','velvet pearl','velvet collection','velvet kya hai','maroon velvet','pink velvet','red velvet','black velvet','yellow velvet','white velvet'],
    answer: `Velvet Pearl Sets — Rs. 1,450 each 🧶\n\nVelvet bangles adorned with pearl accents. Available in 9 colors:\n🔴 Maroon  🩷 Pink  ❤️ Red  🖤 Black  💛 Yellow\n🤍 White  💙 Dark Blue  🩵 Sea Green  💚 Dark Green\n\nFor variety, the Velvet Deal Box (Rs. 3,000) = 120 bangles in multiple colors!\n\nSizes: 2.4", 2.6", 2.8"`,
  },

  // 36. PEARL SPECIFICALLY
  {
    keywords: ['pearl bangles','pearl set','pearl kara','pearl karra','pearl collection','pearl price','moti','triple karra','triple kara','karra set','kara set'],
    answer: `Pearl Collection 🌸\n\n• Hania Amir Pearl Bangles — from Rs. 700 🔥 (VIRAL)\n• Triple Karra Set — Rs. 1,750\n• Pearl Kara Pair — Rs. 600\n• Thin Pearl Sets — Rs. 1,250\n• Velvet Pearl Sets — Rs. 1,450\n\nDeal Boxes include Pearl Karras + Thin Pearls too!\n\nSizes: 2.4", 2.6", 2.8"`,
  },

  // 37. METAL SPECIFICALLY
  {
    keywords: ['metal bangles','metal set','metal collection','gajra','silver gajra','metallic bangles','1650','rs 1650'],
    answer: `Metal Collection ⚙️\n\n• Silver Gajra Set — Rs. 1,650 (intricate flower pattern)\n• Metal Bangles Box — Rs. 2,500 (120 bangles, 10 colors)\n• Metal Deal Box — Rs. 4,000 (120 metal + pearls + kundan)\n• Golden/Silver Glass Dozen — Rs. 250 each\n\nSizes: 2.4", 2.6", 2.8"`,
  },

  // 38. PACKAGING
  {
    keywords: ['packaging','packed','gift wrap','gift box','packing','how is it packed','safe','packaging kya','unboxing'],
    answer: `Packaging 📦\n\nAll orders packed in white corrugated boxes:\n✅ Secure — bangles won't break in transit\n✅ Clean & presentable — great for gifting\n✅ Gift-ready presentation\n\nThe packaging itself is beautiful — perfect to give as a gift directly! 🎁`,
  },

  // 39. DAILY WEAR
  {
    keywords: ['daily wear','everyday','casual','office','work','college','school','routine','roz','rozana','simple','simple bangles','lightweight','comfortable'],
    answer: `Best for Daily Wear 💅\n\n🌸 Pearl Kara Pair — Rs. 600 (simple & elegant)\n🔥 Hania Amir Pearls — from Rs. 700 (trendy everyday)\n🧶 Velvet Pearl Sets — Rs. 1,450 (colorful & comfortable)\n💍 Metal Sets — Rs. 1,450+ (durable for daily use)\n⚙️ Glass Bangles — Rs. 250/dozen (mix & match)\n\nAll lightweight and comfortable for all-day wearing!`,
  },

  // 40. STUDENT / TEEN
  {
    keywords: ['student','teen','teenage','young girl','young','16','17','18','19','20','college girl','university','pocket money','low budget','200','300','400','500','under 1000'],
    answer: `Best Budget Picks for Students 🎓\n\n💸 Rs. 250 — Glass Bangles (dozen)\n💸 Rs. 600 — Pearl Kara Pair\n💸 Rs. 700+ — Hania Amir Pearl Bangles (viral!)\n💸 Rs. 1,150 — Kundan Velvet Set\n💸 Rs. 1,250 — Thin Pearl Set\n\nAll stylish, all affordable! 🌸\n\n🚚 Free shipping above Rs. 1,999!`,
  },

  // 41. MOTHER / GIFT FOR MOM
  {
    keywords: ['mom','mother','ammi','ami','amma','mama','gift for mom','present for mother','mother gift','ammi ke liye','maa','maa ke liye','mom gift'],
    answer: `Gift Ideas for Mom 💕\n\n👑 Velvet Deal Box (Rs. 3,000) — the ultimate gift!\n🌸 Triple Karra Set (Rs. 1,750) — classic & elegant\n💅 Velvet Pearl Set (Rs. 1,450) — beautiful & traditional\n💍 Silver Gajra Set (Rs. 1,650) — intricate & special\n\nAll come in beautiful white gift box packaging! 🎁\n\nMoms absolutely love our bangles! 😍`,
  },

  // 42. SISTER GIFT
  {
    keywords: ['sister','behen','behan','sister gift','gift for sister','behen ke liye','behan ke liye','sibling','best friend gift','friend gift','bestie','bff'],
    answer: `Gift for Sister/BFF 🎁💕\n\n🔥 Hania Amir Pearl Bangles (from Rs. 700) — she'll obsess!\n🎁 Velvet Bangles Box (Rs. 1,750) — 120 bangles, she can style all year\n💅 Velvet Pearl Set (Rs. 1,450) — her favourite color\n✨ Velvet Deal Box (Rs. 3,000) — the ultimate sister gift!\n\nAll beautifully packaged. She'll love it! 😍`,
  },

  // 43. BRIDE HERSELF
  {
    keywords: ['i am the bride','bride','dulhan','brides bangles','bridal set','my wedding','apni shaadi','apni wedding','getting married','meri shaadi','dulhan bangles'],
    answer: `Congratulations on your wedding! 💍✨\n\nFor the bride, we recommend:\n\n🥇 Velvet Deal Box (Rs. 3,000)\n120 bangles + pearls + kundan — different sets for every ceremony!\n\n🥈 Metal Deal Box (Rs. 4,000)\nGorgeous metallic glamour for the big day!\n\n👑 Kundan Sets (Rs. 1,150 each)\nClassic Hyderabadi bridal style.\n\nWishing you the most beautiful wedding! 🌸`,
  },

  // 44. MULTIPLE SETS / STACKING
  {
    keywords: ['stack','stacking','layer','layering','mix match','mix and match','multiple bangles','combine','combination','set combination','how many','kitne sets','kitni bangles','wear together'],
    answer: `Stacking & Mixing Guide 💅\n\nOur most popular combinations:\n\n✨ Velvet Pearl + Thin Pearl (same color family)\n✨ Glass bangles + Velvet set (add shimmer!)\n✨ Kundan + Pearl Kara (traditional bridal look)\n✨ All Hania Amir pearls stacked × 3–5 sets (viral look!)\n\nThe Velvet Deal Box (Rs. 3,000) gives you ALL types to mix — 100+ combinations from ONE box! 🎁`,
  },

  // 45. WHAT COMES IN DEAL BOX (general)
  {
    keywords: ['whats in the box','whats inside','box mein kya','andar kya hai','deal box contains','deal box include','what is included','box contents','inside the box'],
    answer: `Here's what's inside our Deal Boxes 🎁\n\nVelvet Deal Box (Rs. 3,000):\n💎 120 Glass Velvet Bangles + 🤍 Pearl Karras + 🌸 12 Thin Pearls + 👑 4 Kundan\n\nMetal Deal Box (Rs. 4,000):\n💍 120 Metal Bangles + 🕊️ Pearl Karras + 🌹 12 Slim Pearls + 👑 4 Kundan\n\nMetal Bangles Box (Rs. 2,500):\n💍 120 Metal Bangles in 10 colors\n\nVelvet Bangles Box (Rs. 1,750):\n🧶 120 Velvet Bangles in 10 colors\n\nWhich one interests you? 😊`,
  },

  // 46. DISCOUNT / SALE / COUPON
  {
    keywords: ['discount','sale','offer','coupon','promo','promo code','voucher','deal','special offer','kam price','koi offer','cheap','cheaper','any sale','on sale','off'],
    answer: `Current Deals & Value 🎉\n\nOur Deal Boxes are already our best value:\n\n🎁 Velvet Deal Box — Rs. 3,000 for 120+ pieces!\nThat's only Rs. 25 per bangle!\n\n🎁 Metal Deal Box — Rs. 4,000 for 120+ pieces!\n\n🚚 PLUS: Free shipping on orders above Rs. 1,999!\n\nFor latest sales and offers, follow us:\n📸 Instagram: @houseofbanglesx`,
  },

  // 47. CUSTOM ORDER
  {
    keywords: ['custom','customize','custom order','special order','specific color','specific design','bespoke','tailor made','made to order','apna design','apna color','custom size'],
    answer: `Custom Orders 🎨\n\nFor special or custom requests:\n📱 WhatsApp: +92-313-8560441\n📸 @houseofbanglesx\n\nTell us what you need — color, size, quantity, occasion — and our team will do their best to help!\n\nFor bulk custom orders, WhatsApp is definitely the way to go! 😊`,
  },

  // 48. AVAILABILITY / STOCK
  {
    keywords: ['available','in stock','out of stock','sold out','available nahi','stock','do you have','kya hai','kya available','is this available','do you carry','stocked'],
    answer: `Stock & Availability 📦\n\nMost of our products are available year-round!\n\nFor specific item availability:\n📱 WhatsApp: +92-313-8560441\n\nOr browse our full collection at:\n🌐 houseofbangles.store/products\n\nIf something is sold out, our team can tell you when it'll be back! 🔄`,
  },

  // 49. INTERNATIONAL SHIPPING
  {
    keywords: ['international','abroad','outside pakistan','uk','usa','canada','dubai','uae','australia','saudi','qatar','bahrain','germany','foreign','overseas','bidesh','export'],
    answer: `International Shipping 🌍\n\nCurrently we primarily ship within Pakistan.\n\nFor international orders:\n📱 WhatsApp: +92-313-8560441\n\nOur team can discuss options for overseas customers. Many of our customers send gifts to family abroad through local addresses! 📦`,
  },

  // 50. REPEAT CUSTOMER
  {
    keywords: ['again','reorder','repeat order','ordered before','previous order','last time','phir se','dobara','again order','buy again','bought before','regular customer','loyal'],
    answer: `Welcome back! 🥰 We love our loyal customers!\n\nTo reorder:\n📱 WhatsApp: +92-313-8560441\nJust mention your previous order or what you want!\n\nOr browse our latest collection:\n🌐 houseofbangles.store/products\n\nIs there anything new you'd like to try this time? 😊`,
  },

  // 51. PAYMENT ISSUES
  {
    keywords: ['payment failed','payment issue','payment problem','transaction failed','didnt go through','charge','not charged','double charged','over charged','wrong amount','payment kya'],
    answer: `Payment Issues 💳\n\nFor any payment problems:\n📱 WhatsApp: +92-313-8560441 (fastest)\n\nPlease share:\n• Screenshot of issue\n• Transaction details\n• Amount\n\nOur team will resolve it immediately! We take payment issues very seriously. 🙏`,
  },

  // 52. INSTAGRAM / SOCIAL MEDIA
  {
    keywords: ['instagram','insta','ig','tiktok','facebook','fb','social','follow you','your page','your profile','content','reels','stories','posts','tag','tagged'],
    answer: `Find us on Social Media! 📸\n\n📸 Instagram: @houseofbanglesx\n\nWe post:\n✨ New arrivals\n💅 Styling inspiration\n🎁 Special offers\n📸 Customer features\n\nFollow us & tag us in your photos — we feature our customers! 🌸\n\nWe're most active on Instagram!`,
  },

  // 53. COMPARE TO OTHER BRANDS
  {
    keywords: ['other brands','competitors','better than','vs other','compared to','jhand','khurram','popular brand','where else','other shops','alternatives','why hob','why choose you'],
    answer: `Why Choose House of Bangles? 💪\n\n✅ Authentic Hyderabadi craft — real artisans, real tradition\n✅ 10,000+ happy customers and counting\n✅ 500+ unique designs\n✅ 7+ years of experience\n✅ Direct from artisans — no middleman premium\n✅ Ships across all Pakistan\n✅ Beautiful gift packaging\n✅ Exchange policy for size issues\n\nOur customers come back again and again — that's our proof! 🌟`,
  },

  // 54. MORNING / NIGHT SMALL TALK
  {
    keywords: ['good morning','good night','subah bakhair','shab bakhair','good day','have a good day','blessed day','jumma mubarak','ramadan mubarak','eid mubarak','muharram','milad'],
    answer: `JazakAllah Khair! 🌸 Same to you!\n\nWishing you a blessed day filled with joy!\n\n✨ If you're looking for beautiful bangles to make your day even more special — we're here! 💅\n\nAnything I can help you with? 😊`,
  },

  // 55. WHAT'S NEW / NEW ARRIVALS
  {
    keywords: ['new arrivals','latest','new collection','new products','what is new','kya naya','naye designs','new designs','latest collection','recently added','just launched','new in'],
    answer: `New Arrivals & Latest Collection 🆕✨\n\nFor our absolute latest arrivals:\n📸 Instagram: @houseofbanglesx (updated daily!)\n🌐 houseofbangles.store/products\n\nRecently popular:\n🔥 Hania Amir Inspired Pearls — viral right now!\n✨ Metal Deal Box — premium new addition\n💎 All Pearl Triple Karra Set — fresh in stock!\n\nFollow us on Instagram to never miss a new drop! 💅`,
  },

  // 56. TRUST / SAFE TO ORDER
  {
    keywords: ['safe to order','trustworthy','legit','not a scam','real website','genuine website','can i trust','safe payment','secure','fake website','is this real','real shop','verified'],
    answer: `Yes, completely safe to order! ✅\n\n🌟 10,000+ orders delivered successfully\n⭐ 5-star customer rating\n📱 Active on Instagram: @houseofbanglesx\n🌐 Official website: houseofbangles.store\n📱 WhatsApp: +92-313-8560441\n\nYou can see real customer reviews on our website and Instagram! We've been in business 7+ years. 🙏`,
  },

  // 57. HOW MANY BANGLES IN A SET
  {
    keywords: ['how many bangles','kitni bangles','kitne bangles','one set means','per set','set mein','bangles per set','count','quantity per set','1 set kitni'],
    answer: `Bangles Per Set/Product 🔢\n\n• Velvet/Kundan/Thin Pearl Sets = multiple bangles per set (varies by design)\n• Glass Bangles = 12 per dozen (Rs. 250)\n• Pearl Kara = 1 pair (2 pieces)\n• Deal Boxes = 120 bangles (10 dozen) + extras\n\nFor exact count of a specific set:\n📱 WhatsApp: +92-313-8560441 for details! 😊`,
  },

  // 58. WEIGHT / SIZE OF PRODUCT
  {
    keywords: ['weight','heavy','light','lightweight','heavy bangles','how heavy','gram','grams','bangle weight','thick','thin','thin bangles','thick bangles','width'],
    answer: `Weight & Feel 🪶\n\n🧶 Velvet Bangles — lightweight, comfortable for all-day wear\n🌸 Pearl Bangles — delicate and light\n💍 Metal Bangles — slightly heavier, durable shine\n👑 Kundan Bangles — moderate weight with stone detailing\n\nAll designed to be comfortable for extended wearing!\n\nFor very specific details, contact us:\n📱 WhatsApp: +92-313-8560441`,
  },

  // 59. CONFUSED ABOUT SIZE
  {
    keywords: ['size 2.4 or 2.6','2.4 vs 2.6','2.6 vs 2.8','which is larger','2.4 or 2.6 which','size difference','size comparison','between sizes','size help'],
    answer: `Size Comparison Help 📏\n\n2.0" < 2.4" < 2.6" < 2.8" (increasing size)\n\nThe number = bangle DIAMETER in inches\n\n• 2.6" is our MOST popular — fits most adult women\n• If your wrist is 16–17 cm → go with 2.6"\n• If your wrist is 15–16 cm → go with 2.4"\n• If your wrist is 17–18 cm → go with 2.8"\n\n💡 ALWAYS go one size UP if between two sizes!\n\nUse our homepage Size Calculator for exact fit! 🎯`,
  },

  // 60. ARE YOU STILL THERE / WAITING
  {
    keywords: ['are you there','hello?','you there','still here','anyone there','koi hai','response','waiting','slow','taking long','why so slow'],
    answer: `Yes, I'm right here! 😊✨\n\nSorry if there was a delay! I'm your 24/7 HOB stylist — always ready to help!\n\nWhat would you like to know? I can answer questions about:\n💰 Prices • 📏 Sizes • 🎁 Products • 🚚 Shipping • 👑 Recommendations\n\nJust ask! 😊`,
  },

  // 61. HOW MANY COLORS IN DEAL BOX
  {
    keywords: ['how many colors in box','colors in deal box','which colors in box','box mein konse rang','rang kitne','colors included','colors inside box'],
    answer: `Colors in Deal Boxes 🎨\n\n🎁 Velvet Deal Box (Rs. 3,000):\nMultiple colors of velvet + pearl + kundan\n\n🎁 Velvet Bangles Box (Rs. 1,750):\n10 Different Colors (120 bangles)\n\n🎁 Metal Bangles Box (Rs. 2,500):\n10 Different Colors (120 bangles)\n\n🎁 Metal Deal Box (Rs. 4,000):\nMultiple metallic shades + pearl + kundan\n\nFor exact color breakdown, WhatsApp us: +92-313-8560441 📱`,
  },

  // 62. PAYMENT METHODS DETAIL
  {
    keywords: ['easypaisa number','jazzcash number','bank account','account number','bank name','meezan','hbl','ubl','mcb','allied','payment details','send payment','transfer to'],
    answer: `Payment Details 💳\n\nFor account numbers and payment details:\n📱 WhatsApp: +92-313-8560441\n\nOur team will share:\n• EasyPaisa number\n• JazzCash number  \n• Bank account details\n\nCash on Delivery (COD) also available! 📦\n\nDon't share payment to anyone except verified HOB contacts. Stay safe! 🔒`,
  },

  // 63. RANDOM QUESTIONS ABOUT LIFE
  {
    keywords: ['weather','cricket','politics','news','football','favourite food','biryani','chai','tea','life','study','job','exam','results'],
    answer: `Haha! I'm a bangle specialist, not a life guru — but I appreciate the chat! 😄\n\nWhat I DO know really well:\n💅 Which bangles will make you look gorgeous\n💰 Best deals for your budget\n👑 Perfect picks for any occasion\n\nShall we find you some beautiful bangles? 😊✨`,
  },

  // 64. PRICE NEGOTIATION
  {
    keywords: ['negotiate','bargain','can you reduce','give discount','last price','final price','best price','aur kam','thoda kam','less price','too expensive','can you do','half price','reduce price'],
    answer: `Our prices are already very competitive for authentic Hyderabadi craftsmanship! 😊\n\nBest value options:\n• Glass Bangles — Rs. 250/dozen\n• Pearl Kara — Rs. 600\n• Hania Amir Pearls — from Rs. 700\n\nAnd Deal Boxes work out to just Rs. 25–33 per bangle! 🤩\n\nFor bulk/wholesale pricing:\n📱 WhatsApp: +92-313-8560441`,
  },

  // 65. DELIVERY TRACKING
  {
    keywords: ['track','tracking','track order','where is my parcel','parcel kahan','tracking number','courier','leopards','tcs','m&p','post','pcm','rider','delivery boy'],
    answer: `Order Tracking 📦\n\nOnce your order ships, we'll send you:\n✅ Tracking number\n✅ Courier company name\n✅ Expected delivery date\n\nFor tracking your current order:\n📱 WhatsApp: +92-313-8560441\nShare your order ID or phone number and we'll update you immediately! 🚚`,
  },

  // 66. WHICH IS CHEAPEST
  {
    keywords: ['cheapest','most affordable','lowest price','sab se sasta','sasta','kam se kam price','minimum price','entry level','budget option','low cost','cheap option'],
    answer: `Most Affordable Options 💸\n\n1️⃣ Glass Bangles — Rs. 250/dozen (12 bangles!)\n2️⃣ Pearl Kara Pair — Rs. 600\n3️⃣ Hania Amir Pearl Bangles — from Rs. 700\n4️⃣ Kundan Velvet Set — Rs. 1,150\n5️⃣ Thin Pearl Set — Rs. 1,250\n\n🚚 Free shipping above Rs. 1,999!\n\nFor Rs. 700–1,500, you can get beautifully styled bangles! 🌸`,
  },

  // 67. WHICH IS MOST EXPENSIVE / PREMIUM
  {
    keywords: ['most expensive','premium','luxury','high end','best quality','top quality','expensive','premium option','premium pick','sabse mehnga','mehnga','exclusive'],
    answer: `Premium Picks 👑\n\n🥇 Metal Deal Box — Rs. 4,000\nOur most premium product — 120 metal bangles + pearls + kundan!\n\n🥈 Silver Gajra Set — Rs. 1,650\nIntricate gajra (flower) pattern, sophisticated design.\n\n🥉 Triple Karra Set — Rs. 1,750\nHeavy pearl karras — statement luxury.\n\nAll premium products come in our signature white gift box! 🎁`,
  },

  // 68. FOR KIDS
  {
    keywords: ['kids','children','baby','toddler','small child','little girl','daughter','beti','bacha','choti','bachi','2 year','3 year','4 year','5 year','6 year','child size','tiny wrist'],
    answer: `Kids & Children's Bangles 👧\n\nFor small children:\n• Our smallest size is 2.0" (Extra Small / "do")\n• Wrist circumference: ~14.5 cm\n\nFor very young children (under 5), the 2.0" is our smallest available size.\n\nFor exact sizing for your child:\n📱 WhatsApp: +92-313-8560441\nOur team can advise on the best fit! 💕`,
  },

  // 69. ELDERLY WOMEN / LARGE SIZE
  {
    keywords: ['aunty','grandmother','nani','dadi','budhiya','older woman','elder','large size','bigger size','3.0','3 inch','very large wrist','plus size wrist','big wrist','large hand'],
    answer: `Larger Sizes 📏\n\nOur available sizes go up to 2.8" (Large / "Dhai")\nWrist: 17.5–18.5 cm\n\nFor wrists larger than 18.5 cm:\n📱 WhatsApp: +92-313-8560441\n\nOur team may be able to help with special sizing requests! We want everyone to find their perfect fit. 💕`,
  },

  // 70. WHAT'S TRENDING
  {
    keywords: ['trending','trend','whats hot','whats in','viral right now','what to buy','popular right now','hot item','must have','this season','2025','2026','summer','winter','season'],
    answer: `What's Trending Right Now 🔥\n\n1️⃣ Hania Amir Pearl Bangles (from Rs. 700) — VIRAL!\n2️⃣ Metal Deal Box (Rs. 4,000) — Flying off shelves\n3️⃣ All Pearl Triple Karra Set (Rs. 1,750) — Statement piece\n4️⃣ Black Velvet Kundan Set (Rs. 1,150) — Classic never dies\n5️⃣ Velvet Deal Box (Rs. 3,000) — Our all-time bestseller\n\nFollow @houseofbanglesx for daily trends! 📸`,
  },
]

// ── Smart multi-strategy matcher ─────────────────────────────────────────────
function getLocalAnswer(input: string): string | null {
  const normalized = input
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const words = normalized.split(' ')

  for (const entry of LOCAL_KB) {
    for (const kw of entry.keywords) {
      const kwNorm = kw.toLowerCase()
      if (normalized.includes(kwNorm)) return entry.answer
      const kwWords = kwNorm.split(' ')
      if (kwWords.length === 1 && kwWords[0].length >= 4) {
        if (words.some(w => w === kwWords[0] || w.startsWith(kwWords[0]))) {
          return entry.answer
        }
      }
    }
  }
  return null
}

const INITIAL_MSG: Message = {
  role: 'assistant',
  content: 'Salam! 👋✨ Welcome to House of Bangles!\n\nI\'m your personal HOB stylist — ask me anything about sizes, prices, deal boxes, occasions, or just say hi! 😊',
}

export default function AIChatBot() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [dots, setDots]         = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [messages, open])

  useEffect(() => {
    if (!loading) return
    const id = setInterval(() => setDots(d => (d + 1) % 4), 400)
    return () => clearInterval(id)
  }, [loading])

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')

    const localAnswer = getLocalAnswer(text)
    if (localAnswer) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: localAnswer }])
      }, 300)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text ?? 'Please WhatsApp us at +92-313-8560441!'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection issue. WhatsApp +92-313-8560441! 💬' }])
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  return (
    <>
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-70 no-print touch-manipulation"
        aria-label="Open AI stylist"
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
        animate={open ? {} : { y: [0, -4, 0] }}
        transition={open ? {} : { duration: 2.5, repeat: Infinity }}
      >
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-maroon-700 border border-gold-400/40 shadow-gold flex items-center justify-center">
          <AnimatePresence mode="wait">
            {open
              ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={18} className="text-ivory-200" /></motion.div>
              : <motion.div key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Sparkles size={20} className="text-gold-400" /></motion.div>
            }
          </AnimatePresence>
          {!open && <span className="absolute inset-0 animate-ping bg-maroon-700/30 pointer-events-none" />}
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.22 }}
            className="fixed z-70 no-print bottom-[72px] right-3 left-3 sm:bottom-[88px] sm:right-6 sm:left-auto sm:w-[380px] bg-ivory-100 border border-gold-200 shadow-luxury flex flex-col h-[65vh] sm:h-[520px] max-h-[600px]"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gold-200/60 bg-maroon-700 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <Bot size={16} className="text-gold-400" />
                <div>
                  <p className="font-body text-sm font-medium text-ivory-100">HOB Stylist</p>
                  <p className="font-body text-[10px] text-ivory-300/60">Always here to help ✨</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-ivory-300/60 hover:text-ivory-100 p-1 touch-manipulation"><X size={15} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-2.5 overscroll-contain">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 text-xs sm:text-sm font-body leading-relaxed whitespace-pre-line ${msg.role === 'user' ? 'bg-maroon-700 text-ivory-100' : 'bg-ivory-200 text-stone-700 border border-gold-200/50'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-ivory-200 border border-gold-200/50 px-3 py-2 text-stone-500 font-body text-xs">{'Thinking' + '.'.repeat(dots)}</div>
                </div>
              )}
              {messages.length === 1 && !loading && (
                <div className="mt-1 space-y-1.5">
                  <p className="label-luxury text-stone-400 text-[9px] sm:text-[10px]">Quick questions</p>
                  {QUICK_QUESTIONS.map(q => (
                    <button key={q} onClick={() => send(q)} className="block w-full text-left px-2.5 py-2 text-[11px] sm:text-xs font-body text-maroon-700 border border-gold-200 hover:border-gold-400 hover:bg-gold-50/50 transition-all duration-150 touch-manipulation">{q}</button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-gold-200/60 px-2.5 sm:px-3 py-2.5 flex gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 text-xs sm:text-sm font-body bg-ivory-200/60 border border-gold-200 text-stone-700 placeholder:text-stone-400 outline-none focus:border-gold-400 transition-colors min-w-0"
              />
              <button onClick={() => send(input)} disabled={!input.trim() || loading} className="w-9 h-9 bg-maroon-700 text-ivory-100 flex items-center justify-center hover:bg-maroon-900 transition-colors disabled:opacity-40 flex-shrink-0 touch-manipulation">
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
