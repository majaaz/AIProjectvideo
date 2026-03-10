'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Bot,
  Minimize2,
  Maximize2,
  MoreHorizontal,
  HeadphonesIcon
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

import { useChat } from '@ai-sdk/react'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        content: 'Hi there! I\'m Nova, your AI shopping assistant. How can I help you today?',
        role: 'assistant'
      }
    ]
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              filter: 'blur(0px)',
              height: isMinimized ? '80px' : '600px',
              width: '400px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="bg-white/80 backdrop-blur-2xl border border-white shadow-stripe-xl rounded-[2.5rem] overflow-hidden mb-6 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white flex items-center justify-between bg-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-stripe-blurple to-stripe-pink flex items-center justify-center text-white shadow-inner">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 tracking-tight flex items-center">
                     Nova AI
                     <span className="ml-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   </h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Always Active</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                 <button 
                   onClick={() => setIsMinimized(!isMinimized)}
                   className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                 >
                   {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                 </button>
                 <button 
                   onClick={() => setIsOpen(false)}
                   className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                 >
                   <X className="w-4 h-4" />
                 </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium tracking-tight shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-slate-900 text-white rounded-br-none px-6' 
                          : 'bg-white border border-slate-50 text-slate-700 rounded-bl-none px-6'
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-50 p-4 rounded-3xl rounded-bl-none">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-white bg-white/20">
                   <form onSubmit={handleSubmit} className="relative group">
                     <input 
                       value={input}
                       onChange={handleInputChange}
                       placeholder="Ask about orders, products..."
                       className="w-full pl-6 pr-14 py-4 bg-white/50 border border-white rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-stripe-blurple/5 transition-all text-sm font-medium text-slate-600"
                     />
                     <button 
                       type="submit"
                       className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-stripe-blurple text-white rounded-full shadow-lg hover:shadow-stripe-hover hover:scale-105 active:scale-95 transition-all"
                     >
                       <Send className="w-4 h-4" />
                     </button>
                   </form>
                   <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                     <span className="flex items-center">
                       <HeadphonesIcon className="w-3 h-3 mr-1" />
                       Talk to an agent
                     </span>
                     <span className="flex items-center">
                       Powered by Claude
                       <Sparkles className="w-3 h-3 ml-1 text-amber-400" />
                     </span>
                   </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-stripe-xl transition-all duration-500 overflow-hidden relative group ${
          isOpen ? 'bg-slate-900 rotate-90' : 'bg-stripe-blurple'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
             <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               <X className="w-8 h-8 text-white" />
             </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
              <MessageSquare className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-stripe-blurple animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hover Sparkle Effect */}
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </motion.button>
    </div>
  )
}
