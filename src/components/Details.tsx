'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

// Define the User type to match your Prisma schema
interface User {
  id: number
  username: string
  createdAt: string
}

export default function Details() {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      navigate('/login')
    }
  }, [navigate])

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="flex justify-between">
            <strong>Username:</strong> 
            <span>{user.username}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}