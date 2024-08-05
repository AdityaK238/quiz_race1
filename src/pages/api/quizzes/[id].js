// pages/api/quizzes/[id].js

import prisma from "../../../lib/postgres/prisma";

export default async function handler(req, res) {
  const quizId = parseInt(req.query.id);

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        q_id: quizId,
      },
      include: {
        Questions: true,
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error(`Error fetching quiz with ID ${quizId}:`, error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
}
