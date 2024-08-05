import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { q_id } = req.body;

    try {
      const updatedQuiz = await prisma.quiz.update({
        where: {
            q_id: q_id,
        },
        data: {
            RunningStatus: true,
        }
      });

      res.status(200).json({ updatedQuiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while starting the quiz.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
