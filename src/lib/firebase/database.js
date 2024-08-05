import {db} from "./firebase"
import { ref, set, get } from 'firebase/database'

export const startQuiz = async (quizId) => {
    try {
        const quizRef = ref(db, 'quizzes/' + quizId);
        await set(quizRef, {players: {}});
        console.log("Quiz started successfully!");
    } catch (err) {
        console.error(err);
    }
};

export const joinQuiz = async (quizId, playerId, email) => {
    try {
        const playerRef = ref(db, `quizzes/${quizId}/players/${playerId}`);
        await set(playerRef, {name: email, score: 0});
        console.log("Player joined successfully");
    } catch (err) {
        console.error(err);
    }
};

export const updateScore = async (quizId, playerId, score) => {
    try {
        const scoreRef = ref(db, `quizzes/${quizId}/players/${playerId}/score`);
        await set(scoreRef, score);
        console.log("Player score updated:", score);
    } catch (err) {
        console.err(err);
    }
};

export const getScoreboard = async (quizId) => {
    try {
        const quizRef = ref(db, `quizzes/${quizId}/players`);
        const snapshot = await get(quizRef);
        if (snapshot.exists()) {
            const players = snapshot.val();
            const scoreboard = Object.keys(players).map(playerId => ({
                name: players[playerId].name,
                score: players[playerId].score
            })).sort((a,b) => b.score - a.score);
            return scoreboard;
        } else {
            console.log('No data available');
            return [];
        }
    } catch (err) {
        console.error("Error fetching leaderboard", err);
    }
};