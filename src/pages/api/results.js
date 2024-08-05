// /pages/api/quizzes/results.js
import prisma from "../../lib/postgres/prisma";

export default async (req, res) => {
  if (req.method === 'POST') {
    const { quizId, userId, playerScore, correctAnswers, incorrectAnswers } = req.body;

    if (!quizId || !userId) {
      return res.status(400).json({ error: 'Quiz ID and User ID are required' });
    }

    try {
      const result = await prisma.userStatistics.create({
        data: {
          score: playerScore,
          correct: correctAnswers,
          incorrect: incorrectAnswers,
          user: {
            connect: { u_id: userId },
          },
          quiz: {
            connect: { q_id: quizId },
          },
        },
      });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error saving results:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
