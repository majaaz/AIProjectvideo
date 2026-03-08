import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { reviews } = await req.json()

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: "You are an e-commerce review summarizer. The user will provide a list of reviews. Summarize them into a concise, 2-3 sentence overview highlighting what customers love and any common concerns. Format like: 'Most customers love X but mention Y as a concern.'",
      messages: [{ 
        role: 'user', 
        content: reviews.join('\n---\n') 
      }],
    })

    return NextResponse.json({ summary: (message.content[0] as any).text })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Review summary failed' }, { status: 500 })
  }
}
