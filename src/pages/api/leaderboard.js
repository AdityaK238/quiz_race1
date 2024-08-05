// /pages/api/leaderboard.js
import prisma from "../../lib/postgres/prisma";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const topPlayers = await prisma.userStatistics.findMany({
      orderBy: {
        score: 'desc',
      },
      take: 5,
      include: {
        user: true,
        quiz: true,
      },
    });

    const formattedPlayers = topPlayers.map((player) => ({
      name: player.user.email,
      points: player.score,
      correct: player.correct,
      incorrect: player.incorrect,
    }));

    res.status(200).json(formattedPlayers);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal Server Error' , details: error.message});
  }
}
