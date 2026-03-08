import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(req: Request) {
  try {
    const { query } = await req.json()

    // Context: In a real app we'd fetch all product catalog metadata or use embeddings.
    // Here we simulate parsing the user intent to search products.
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: "You are an AI search assistant for an e-commerce platform. Extract the key product attributes, maximum price, and category from the user's natural language query. Return ONLY a valid JSON object matching: { keywords: string[], maxPrice: number | null, category: string | null }.",
      messages: [{ role: 'user', content: query }],
    })

    const extractedFilters = JSON.parse((message.content[0] as any).text as string)

    // For now we just return the extracted structured intent so the frontend can filter the products.
    return NextResponse.json({ intent: extractedFilters })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'AI Search failed' }, { status: 500 })
  }
}
