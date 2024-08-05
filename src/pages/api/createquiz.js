import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, questions, user } = req.body;

    try {
      const createdQuiz = await prisma.quiz.create({
        data: {
          title,
          description,
          user: {
            connect: { u_id: user }
          },
          Questions: {
            createMany: {
              data: questions.map((question) => ({
                question_text: question.question,
                answer: question.answer,
                options: question.options ? question.options.join(',') : '', 
                type: question.type
              }))
            }
          }
        },
        include: {
          Questions: true
        }
      });

      res.status(200).json({ createdQuiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the quiz.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
