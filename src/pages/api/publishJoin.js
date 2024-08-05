// // pages/api/publishJoin.js
// import { pusherServer } from "../../lib/pusher/pusherServer";

// export default async (req, res) => {
//   const { quizId, playerName } = req.body;

//   await pusherServer.trigger(`quiz-${quizId}`, 'player-joined', {
//     playerName,
//   });

//   res.status(200).end();
// };

