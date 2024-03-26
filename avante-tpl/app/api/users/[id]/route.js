// pages/api/users/[id].js (método DELETE)
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const userId = req.query.id

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) }
      })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      res.json(user)
    } catch (error) {
      console.error('Error retrieving user:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, isAdmin, password } = req.body
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { name, isAdmin, password }
      })
      res.json(updatedUser)
    } catch (error) {
      console.error('Error updating user:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(userId) }
      })
      res.json(deletedUser)
    } catch (error) {
      console.error('Error deleting user:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
