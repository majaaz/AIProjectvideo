import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { items, email, amount } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    // Simulate database order creation and processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate a simulated transaction ID
    const sessionId = `sim_${Math.random().toString(36).substring(7)}`

    return NextResponse.json({ 
      success: true, 
      id: sessionId,
      message: 'Simulated payment processed successfully' 
    })
  } catch (error: any) {
    console.error('Simulation Error:', error)
    return NextResponse.json({ error: error.message || 'Simulation failed' }, { status: 500 })
  }
}
