// // pages/api/publishScore.js
// import { pusherServer } from "../../lib/pusher/pusherServer";

// export default async (req, res) => {
//   const { quizId, playerName, score } = req.body;

//   await pusherServer.trigger(`quiz-${quizId}`, 'player-score', {
//     playerName,
//     score,
//   });

//   res.status(200).end();
// };