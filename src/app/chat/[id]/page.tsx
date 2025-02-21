"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Send, Sparkles, User, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const philosophers = {
  socrates: {
    name: "Socrates",
    greeting:
      "Greetings, seeker of wisdom. I am Socrates. What truth shall we uncover today?",
    prompt:
      "You are Socrates, the ancient Greek philosopher. Use the Socratic method by asking probing questions. Be concise and focus on ethics and wisdom. Also pretend that you do not know anything from the future. Your knowledge is limited to the year 399 BC.",
    avatar: "/socrates.webp",
  },
  plato: {
    name: "Plato",
    greeting:
      "Welcome to the realm of ideas, dear student. I am Plato. What shall we contemplate in our journey towards enlightenment?",
    prompt:
      "You are Plato, student of Socrates and teacher of Aristotle. Focus on your Theory of Forms, justice, and the ideal state. Be philosophical but clear in your responses. Your knowledge is limited to the year 347 BC.",
    avatar: "/plato.webp",
  },
  aristotle: {
    name: "Aristotle",
    greeting:
      "Greetings, inquisitive mind. I am Aristotle. Let us explore the nature of things and seek the golden mean. What is your inquiry?",
    prompt:
      "You are Aristotle, the great philosopher and scientist. Focus on logic, ethics, and metaphysics. Be analytical and practical in your responses. Your knowledge is limited to the year 322 BC.",
    avatar: "/aristotle.webp",
  },
};

export default function Chat() {
  const { id } = useParams();
  const router = useRouter();
  const philosopher = philosophers[id as keyof typeof philosophers];

  const [messages, setMessages] = useState([
    { role: "assistant", content: philosopher.greeting },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [puterLoaded, setPuterLoaded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPuterLoaded(false);
    if (typeof window !== "undefined") {
      if (!window.puter) {
        const script = document.createElement("script");
        script.src = "https://js.puter.com/v2/";
        script.onload = () => {
          setPuterLoaded(true);
        };
        document.body.appendChild(script);
      } else {
        setPuterLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []); //Corrected dependency

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !puterLoaded) return;

    setIsLoading(true);
    const userMessage = { role: "user", content: input };
    setInput("");

    try {
      // @ts-expect-error
      const response = await window.puter.ai.chat(
        `${philosopher.prompt}\n\nUser: ${input}\n\n${philosopher.name}:`
      );

      const aiResponse = response.message.content;
      setMessages((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${
            error instanceof Error ? error.message : "Failed to get response"
          }`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-900 via-black to-teal-800 p-4'>
      <Card className='w-full max-w-2xl shadow-xl bg-gray-700'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <Button
            variant='secondary'
            size='icon'
            onClick={() => router.push("/")}
            className='bg-teal-800 hover:bg-teal-900 text-white'
          >
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <CardTitle className='text-2xl font-bold text-white'>
            Dialogue with {philosopher.name}
          </CardTitle>
          <Avatar>
            <AvatarImage src={philosopher.avatar} alt={philosopher.name} />
            <AvatarFallback>{philosopher.name[0]}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className='bg-gray-700'>
          <ScrollArea className='h-[70vh] pr-4' ref={scrollAreaRef}>
            <AnimatePresence initial={false}>
              {messages.map((m, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start space-x-2 mb-4 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <Avatar>
                      <AvatarImage
                        src={philosopher.avatar}
                        alt={philosopher.name}
                      />
                      <AvatarFallback>
                        <Bot className='h-4 w-4' />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      m.role === "user"
                        ? "bg-blue-600 text-white user-input"
                        : "bg-gray-600 text-gray-200 chat-message"
                    } max-w-[80%]`}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <Avatar>
                      <AvatarFallback>
                        <User className='h-4 w-4' />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex items-center space-x-2 text-gray-300'
              >
                <Sparkles className='h-4 w-4 animate-pulse' />
                <span className='handwritten'>
                  {philosopher.name} is pondering...
                </span>
              </motion.div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={handleSubmit}
            className='flex w-full items-center space-x-2'
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${philosopher.name} a question...`}
              disabled={isLoading || !puterLoaded}
              className='flex-grow font-cormorant text-white font-semibold placeholder:text-gray-100'
            />
            <Button
              type='submit'
              disabled={isLoading || !puterLoaded}
              className='bg-teal-800 hover:bg-teal-900 text-white'
            >
              <Send className='h-4 w-4' />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
