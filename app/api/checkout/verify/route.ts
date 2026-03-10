import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || ''
    
    // Create the expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex')

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
      // Return success and let the client handle redirection/order creation
      return NextResponse.json({ success: true, message: 'Payment verified successfully' })
    } else {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Razorpay Verification Error:', error)
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 500 })
  }
}
