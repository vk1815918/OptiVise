import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// OpenAI API configuration
const OPENAI_API_KEY =
  "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"

// Updated system prompt to encourage markdown formatting
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

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Add system prompt if not already included
    const messagesWithSystemPrompt =
      messages[0]?.role === "system" ? messages : [{ role: "system", content: SYSTEM_PROMPT }, ...messages]

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messagesWithSystemPrompt,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      response: data.choices[0].message.content,
    })
  } catch (error) {
    console.error("Error in chat API route:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}

