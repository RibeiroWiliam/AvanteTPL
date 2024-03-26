import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany()
    res.json(users)
  } else if (req.method === 'POST') {
    const { name, isAdmin, password } = req.body
    const newUser = await prisma.user.create({
      data: { name, isAdmin, password }
    })
    res.status(201).json(newUser)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
