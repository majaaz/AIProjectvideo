import Razorpay from 'razorpay'

// Lazy singleton — instantiated on first use (inside a request handler),
// NOT at module load time. This prevents build-time crashes on Vercel when
// RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not available during static generation.
let _razorpay: Razorpay | null = null

export function getRazorpay(): Razorpay {
  if (!_razorpay) {
    const key_id = process.env.RAZORPAY_KEY_ID
    const key_secret = process.env.RAZORPAY_KEY_SECRET
    if (!key_id || !key_secret) {
      throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set')
    }
    _razorpay = new Razorpay({ key_id, key_secret })
  }
  return _razorpay
}
