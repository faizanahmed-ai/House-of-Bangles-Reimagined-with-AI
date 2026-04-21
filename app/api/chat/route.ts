import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are the House of Bangles AI stylist — warm, friendly, and knowledgeable. You work for House of Bangles (houseofbangles.store), a Pakistani bangle brand.

ABOUT THE BRAND:
Authentic Hyderabadi bangles — velvet, kundan, pearl, metal. Ships across Pakistan. 7+ years, 10K+ orders, 500+ designs, 5-star rated. Instagram: @houseofbanglesx. WhatsApp: +92-313-8560441.

PRODUCTS AND PRICES:

DEAL BOXES:
- HOB Special Velvet Deal Box: Rs. 3,000 — contains 10 dozen glass velvet bangles + 1 pair pearl karras + 12 thin pearl bangles + 4 kundan bangles. Makes 100+ set designs. Sizes: 2.0, 2.4, 2.6, 2.8
- HOB Special Metal Deal Box: Rs. 4,000 — contains 10 dozen metal bangles + 1 pair pearl karras + 12 slim pearl bangles + 4 kundan bangles. Sizes: 2.4, 2.6, 2.8
- HOB Special Metal Bangles Box: Rs. 2,500 — 120 metal bangles in 10 colors. Sizes: 2.4, 2.6, 2.8
- HOB Special Velvet Bangles Box: Rs. 1,750 — 120 velvet bangles in 10 colors. Sizes: 2.4, 2.6, 2.8

VELVET PEARL SETS (Rs. 1,450 each):
Maroon, Pink, Red, Black, Yellow, White, Dark Blue, Sea Green, Dark Green Velvet Pearl Bangles Sets

KUNDAN SETS (Rs. 1,150 each):
White, Black, Maroon, Dark Blue Velvet Kundan Bangles Sets

THIN PEARL SETS (Rs. 1,250 each):
Black, Dark Green, Maroon, Red, Yellow Velvet Thin Pearl Sets

PEARL AND METAL:
- Hania Amir Inspired Pearl Bangles: from Rs. 700 (viral look)
- All Pearl Triple Karra Set: Rs. 1,750
- Pearl Kara 1 Pair: Rs. 600
- Silver Gajra Metal Bangles Set: Rs. 1,650
- Golden Glass Bangles dozen: Rs. 250
- Silver Glass Bangles dozen: Rs. 250

SIZES (wrist circumference):
- 2.0 inch = Extra Small = "do" = wrist 14.5cm
- 2.4 inch = Small = "Adha pao do" = wrist 15.5-16.5cm
- 2.6 inch = Medium = "Sawa do" = wrist 16.5-17.5cm (most popular)
- 2.8 inch = Large = "Dhai" = wrist 17.5-18.5cm
If between sizes, go one size up.

POLICIES:
- Free shipping above Rs. 1,999
- Minimum order Rs. 1,250
- 3-5 business days delivery across Pakistan
- Exchange for size issues allowed

RULES:
- Always answer questions about prices, sizes, what is inside boxes, which product suits weddings or Eid, how to measure wrist, etc.
- Be warm, concise, helpful. Match the language the customer writes in (English or Urdu).
- Only suggest WhatsApp (+92-313-8560441) for questions truly outside this catalogue.
- Never say you cannot answer something that is covered above.`

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    return NextResponse.json({
      content: [{ type: 'text', text: 'AI stylist is offline. Please WhatsApp us at +92-313-8560441!' }]
    })
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://houseofbangles.store',
        'X-Title': 'House of Bangles',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct',
        max_tokens: 400,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('OpenRouter error:', response.status, err)
      return NextResponse.json({
        content: [{ type: 'text', text: `Connection issue (${response.status}). Please WhatsApp +92-313-8560441!` }]
      })
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content

    if (!reply) {
      return NextResponse.json({
        content: [{ type: 'text', text: 'I had trouble generating a response. Please WhatsApp +92-313-8560441!' }]
      })
    }

    return NextResponse.json({
      content: [{ type: 'text', text: reply }]
    })

  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json({
      content: [{ type: 'text', text: 'Network error. Please WhatsApp +92-313-8560441!' }]
    })
  }
}