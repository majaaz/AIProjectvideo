import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      messages,
      system: `
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
      `,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
