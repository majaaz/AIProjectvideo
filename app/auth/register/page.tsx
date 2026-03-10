'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Eye, EyeOff, Mail, Lock, ShoppingBag, Store } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller'>('buyer')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (signUpError) throw signUpError

      // Update user role
      if (data.user) {
        const { error: updateError } = await supabase
          .from('users')
          .update({ role: selectedRole })
          .eq('id', data.user.id)

        if (updateError) {
          console.error('Error updating user role:', updateError)
        }

        // Redirect based on role
        const redirectTo = selectedRole === 'seller' ? '/seller/dashboard' : '/'
        router.push(redirectTo)
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setLoading(true)
    setError('')

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?role=${selectedRole}`,
        },
      })

      if (error) throw error

      window.location.href = data.url
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-[#1C1C1C] tracking-tight">NovaCart</h1>
          </Link>
          <p className="mt-2 text-sm text-[#1C1C1C]/70">Create your account</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole('buyer')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'buyer'
                      ? 'border-[#FF6B3D] bg-[#FF6B3D]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <ShoppingBag className={`w-6 h-6 mx-auto mb-2 ${
                    selectedRole === 'buyer' ? 'text-[#FF6B3D]' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    selectedRole === 'buyer' ? 'text-[#1C1C1C]' : 'text-gray-500'
                  }`}>Buy</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('seller')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === 'seller'
                      ? 'border-[#FF6B3D] bg-[#FF6B3D]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Store className={`w-6 h-6 mx-auto mb-2 ${
                    selectedRole === 'seller' ? 'text-[#FF6B3D]' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    selectedRole === 'seller' ? 'text-[#1C1C1C]' : 'text-gray-500'
                  }`}>Sell</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1C1C1C] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]/20 focus:border-[#FF6B3D] transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1C1C1C] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]/20 focus:border-[#FF6B3D] transition-all"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1C1C1C] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]/20 focus:border-[#FF6B3D] transition-all"
                  placeholder="Re-enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#111111] text-white font-semibold rounded-xl hover:bg-[#FF6B3D] focus:outline-none focus:ring-2 focus:ring-[#FF6B3D]/20 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or continue with</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By creating an account, you agree to our Terms of Use and Privacy Notice.
          </p>
        </div>

        <p className="text-center text-sm text-[#1C1C1C]/70">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-[#FF6B3D] hover:text-[#111111] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
