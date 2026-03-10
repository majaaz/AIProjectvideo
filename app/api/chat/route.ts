import { Anthropic } from '@anthropic-ai/sdk'
import { AnthropicStream, StreamingTextResponse } from 'ai'

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // System prompt defines the AI's personality and knowledge
    const systemPrompt = `
      You are Nova, an elite AI shopping assistant for NovaCart, a premium 3D e-commerce marketplace.
      Your goal is to help users find products, explain 3D features, and provide support with a professional, helpful, and sophisticated tone.
      
      NovaCart Key Features:
      - 3D Product Exploration: Users can interact with products in 3D.
      - Premium Aesthetic: Inspired by Stripe's minimalist and high-contrast design.
      - Dual-Role System: Users can be Buyers or Sellers.
      
      Guidelines:
      - Always be helpful and polite.
      - If asked about specific products, mention that you can help them explore features in 3D.
      - Keep responses concise but information-rich.
      - Avoid generic AI greetings; be direct and sophisticated.
    `

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
      stream: true,
    })

    const stream = AnthropicStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
