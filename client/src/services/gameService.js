import request from "../utils/request.js";

const baseUrl = 'http://localhost:3030/jsonstore/games'

export default {
    create(gameData) {
       return request.post(baseUrl, gameData)
    },
    async getAll() {
        const result = await request.get(baseUrl);
        const games = Object.values(result);

        return games;
    }
};