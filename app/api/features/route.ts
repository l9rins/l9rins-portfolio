import { NextResponse } from 'next/server'

export async function GET() {
  // Simulate API call
  const data = {
    message: 'Hello from API',
    timestamp: new Date().toISOString(),
    features: [
      'SSR with Next.js',
      'TypeScript support',
      'Advanced state management with Zustand',
      'Performance optimizations'
    ]
  }

  return NextResponse.json(data)
}