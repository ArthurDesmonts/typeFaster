import axios from "axios";


export async function insertGameResults(userId,gameResults) {
    try {
        console.log(userId);
        const response = await axios.post('https://api-rest-text-game.vercel.app/post/insertResult', {
            userId: userId,
            wpm: gameResults
        });
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
}