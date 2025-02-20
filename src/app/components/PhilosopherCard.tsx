"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Philosopher {
  id: string;
  name: string;
  period: string;
  description: string;
  image: string;
}

interface PhilosopherCardProps {
  philosopher: Philosopher;
}

export default function PhilosopherCard({ philosopher }: PhilosopherCardProps) {
  return (
    <Link href={`/chat/${philosopher.id}`}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Card className='bg-white/10 border-none shadow-lg hover:shadow-2xl transition-shadow duration-300'>
          <CardHeader className='relative p-0 overflow-hidden h-48'>
            <motion.div
              className='absolute inset-0'
              initial={{ scale: 1.2 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar className='w-full h-[300px]  rounded-none'>
                <AvatarImage
                  src={philosopher.image}
                  alt={philosopher.name}
                  className='object-cover'
                />
                <AvatarFallback>{philosopher.name[0]}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70' />
            <CardTitle className='absolute bottom-4 left-4 text-2xl font-bold text-white'>
              {philosopher.name}
            </CardTitle>
          </CardHeader>
          <CardContent className='p-4'>
            <p className='text-lg font-semibold text-gray-300 mb-2'>
              {philosopher.period}
            </p>
            <p className='text-gray-100 text-xl'>{philosopher.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
