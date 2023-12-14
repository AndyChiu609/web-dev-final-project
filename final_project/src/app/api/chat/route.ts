import { privateEnv } from "@/lib/env/private"
import { Message } from "@/lib/types/db";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai"
import { z } from "zod";

const openai = new OpenAI({
    apiKey: privateEnv.OPENAI_KEY,
});

// const POSTMessageSchema = z.object({

// })
export async function POST(request: NextRequest) {
    try {
        // Get the message from the request query
        const requestBody = await request.json();
        // Please use a validator in production
        const messages = requestBody.messages as Message[];
    
        // Send the message to OpenAI
        const response = await openai.chat.completions.create({
          messages: messages,
          model: "gpt-3.5-turbo",
          temperature: 0,
          max_tokens: 1000,
        });
    
        const newMessage: Message = response.choices[0].message;
        return NextResponse.json(newMessage, { status: 200 });
      } catch (error) {
        console.log(error)
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
    