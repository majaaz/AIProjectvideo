import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(req: Request) {
  try {
    const { cartItems, historyItems } = await req.json()

    const prompt = `A user has these items in their cart: ${cartItems.join(', ')}. 
    Their browsing history includes: ${historyItems.join(', ')}.
    Suggest 3 complementary product categories or specific items they might want to buy next.
    Format your response as a simple comma-separated list of 3 items.`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }],
    })

    const recommendations = ((message.content[0] as any).text as string).split(',').map(s => s.trim())
    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Recommendation failed' }, { status: 500 })
  }
}
