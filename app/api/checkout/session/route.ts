import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { CartItem } from '@/types'

export async function POST(req: Request) {
  try {
    const { items, email } = await req.json()
    const origin = req.headers.get('origin')

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    const line_items = items.map((item: CartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.products?.name || 'Unknown Product',
          images: item.products?.image_url ? [item.products.image_url] : [],
          description: item.products?.description || '',
        },
        unit_amount: Math.round((item.products?.price || 0) * 100), // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
      customer_email: email || undefined,
      metadata: {
        item_count: items.length.toString(),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe Session Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
