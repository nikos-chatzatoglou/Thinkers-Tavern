import Link from "next/link";

export default function Home() {
  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>Philosophical Dialogues</h1>
        <p className='text-xl mb-8'>
          Engage in meaningful conversations with history$apos;s greatest
          philosophers.
        </p>
        <Link
          href='/philosophers'
          className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition'
        >
          Meet the Philosophers
        </Link>
      </div>
    </main>
  );
}
