import request from "../utils/request.js";

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export default {
    create(email, gameId, comment) {
        request.post(baseUrl, { email, gameId, comment });
    }
}