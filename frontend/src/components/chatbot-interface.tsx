"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  sender: "user" | "bot"
  text: string
  timestamp: Date
}

// OpenAI API configuration
const OPENAI_API_KEY =
  "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"
const SYSTEM_PROMPT = `You are a highly knowledgeable and trustworthy financial advisor. 
You provide clear, actionable advice tailored to the user's situation and goals. 
Your responses are concise, easy to understand, and avoid unnecessary jargon unless it's clearly explained.

Always ask clarifying questions if the user's request is vague, and explain the reasoning behind your suggestions.

When relevant, explain both pros and cons of decisions and provide examples.

Use this tone: Professional, friendly, helpful.

FORMAT YOUR RESPONSES USING MARKDOWN:
- Use **bold** for important points
- Use bullet points for lists
- Use headings (## or ###) for sections
- Use *italics* for emphasis
- Use > for important quotes or callouts
- Use numbered lists for steps or prioritized items

Example task types: 
Budget planning
Investment strategy
Retirement savings
Risk assessment
Debt repayment options`

export function ChatbotInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "# Welcome to OptiVise\n\nI'm your personal financial advisor. I'm here to help with:\n\n- **Investment strategies**\n- Retirement planning\n- Risk assessment\n- Portfolio optimization\n\nWhat financial topic would you like to discuss today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // Function to call OpenAI API
  const callOpenAI = async (userMessage: string, messageHistory: Message[]) => {
    try {
      // Format message history for the API
      const formattedMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messageHistory.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
        { role: "user", content: userMessage },
      ]

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error("Error calling OpenAI API:", error)
      return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Could you try again in a moment?"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue("")
    setIsLoading(true)

    try {
      // Call OpenAI API with the user's message and conversation history
      const aiResponse = await callOpenAI(inputValue, messages)

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I apologize, but I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Minimized Chat Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[450px] bg-white rounded-lg shadow-xl overflow-hidden z-50 flex flex-col border border-gray-200"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-red-600 text-white">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h3 className="font-medium">OptiVise Financial Advisor</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="h-8 w-8 rounded-full text-white hover:bg-red-700/50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user" ? "bg-red-600 text-white" : "bg-white border border-gray-200 text-black"
                    }`}
                  >
                    {message.sender === "bot" ? (
                      <div className="markdown-content text-sm">
                        <ReactMarkdown
                          components={{
                            h1: ({ node, ...props }) => <h1 className="text-lg font-bold my-2" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-base font-bold my-2" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-sm font-bold my-1" {...props} />,
                            p: ({ node, ...props }) => <p className="my-1" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-1" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-1" {...props} />,
                            li: ({ node, ...props }) => <li className="my-0.5" {...props} />,
                            a: ({ node, ...props }) => <a className="text-red-600 underline" {...props} />,
                            blockquote: ({ node, ...props }) => (
                              <blockquote className="border-l-2 border-red-600 pl-2 italic my-2" {...props} />
                            ),
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start mb-3">
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 max-w-[80%]">
                    <div className="flex space-x-1">
                      <motion.div
                        className="h-2 w-2 rounded-full bg-red-600"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0 }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full bg-red-600"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.2 }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full bg-red-600"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Ask me anything about your investments..."
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="h-10 w-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

