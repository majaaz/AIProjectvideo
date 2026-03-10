import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(req: Request) {
  try {
    const { bulletPoints, productName } = await req.json()

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      messages: [{ 
        role: 'user', 
        content: `Create an SEO-optimized product description for a product named "${productName}". 
        Incorporate these key features:\n${bulletPoints.join('\n')}\n
        Make it persuasive, easy to read, and geared towards online shoppers.` 
      }],
    })

    const description = (message.content[0] as any).text
    return NextResponse.json({ description })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Description generation failed' }, { status: 500 })
  }
}
