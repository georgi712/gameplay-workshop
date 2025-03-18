import { useContext, useEffect, useState } from "react";
import request from "../utils/request.js";
import { UserContext } from "../contexts/UserContext.js";

const baseUrl = 'http://localhost:3030/data/games'

export default {
    delete(gameId) {
        return request.delete(`${baseUrl}/${gameId}`);
    },
    edit(gameId, gameData) {
        console.log(gameId);
        return request.put(`${baseUrl}/${gameId}`, { ...gameData, _id: gameId });
    }
};

export const useGames = () => {
    const[games, setGames] = useState([]);
    
    useEffect(() => {
        request.get(baseUrl)
            .then(setGames)
    }, [])

    return {
        games,
    }
}

export const useGame = (gameId) => {
    const [game, setGame] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${gameId}`)
            .then(setGame)
    }, [gameId]);

    return {
        game
    }
}

export const useCreateGame = () => {
    const { accessToken } = useContext(UserContext);

    const options = {
        headers: {
            'X-Authorization': accessToken
        }
    }

    const create = (gameData) => 
        request.post(baseUrl, gameData, options);

    return { 
        create,
    }
}