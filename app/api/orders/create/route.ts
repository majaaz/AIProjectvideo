import { NextResponse } from 'next/server'

// POST /api/orders/create
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, items, shippingAddress, paymentIntentId } = body

    const totalAmount = items.reduce((sum: number, item: { price: number; quantity: number }) => {
      return sum + (item.price * item.quantity)
    }, 0)

    // In production, create order in Supabase
    // const { data: order, error } = await supabase
    //   .from('orders')
    //   .insert({
    //     user_id: userId,
    //     total_amount: totalAmount,
    //     shipping_address: shippingAddress,
    //     payment_intent_id: paymentIntentId,
    //     status: 'pending'
    //   })
    //   .select()
    //   .single()

    // Create order items
    // for (const item of items) {
    //   await supabase.from('order_items').insert({
    //     order_id: order.id,
    //     product_id: item.productId,
    //     quantity: item.quantity,
    //     price_at_purchase: item.price
    //   })
    // }

    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`

    return NextResponse.json({ success: true, orderId })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
