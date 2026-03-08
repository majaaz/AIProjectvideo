import { NextResponse } from 'next/server'

// POST /api/cart/add
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, quantity, userId } = body

    // In production, save to Supabase
    // const { data, error } = await supabase
    //   .from('cart')
    //   .upsert({ user_id: userId, product_id: productId, quantity }, { onConflict: 'user_id,product_id' })

    return NextResponse.json({ success: true, message: 'Item added to cart' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 })
  }
}
