import { useEffect, useState } from "react";
import request from "../utils/request.js";
import useAuth from "../hooks/useAuth.js";

const baseUrl = 'http://localhost:3030/data/games'

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

export const useLatestGames = () => {
    const PAGE_SIZE = 3;
    const [latestGames, setLatestGames] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams({
        sortBy: '_createdOn desc',
        pageSize: PAGE_SIZE,
        select: '_id,title,imageUrl'
    })

    request.get(`${baseUrl}?${searchParams.toString()}`)
        .then(setLatestGames)

  }, [])

  return {
    latestGames
  }
}

export const useCreateGame = () => {
    const { request } = useAuth()

    const create = (gameData) => 
        request.post(baseUrl, gameData);

    return { 
        create,
    }
}

export const useEditGame = () => {
    const { request } = useAuth();
     
    const edit = (gameId, gameData) => 
        request.put(`${baseUrl}/${gameId}`, { ...gameData, _id: gameId });
    
    return {
        edit,
    }
}

export const useDeleteGame = () => {
    const { request } = useAuth();
     
    const deleteGame = (gameId) => 
        request.delete(`${baseUrl}/${gameId}`);

    return {
        deleteGame,
    }
    
}