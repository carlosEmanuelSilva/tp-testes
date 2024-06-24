import { db } from "../db/initSupabase.js"

export const expulsarJogador = async (req, res) => {
    try {
        const {
            userId
        } = req.body

        const { data, error } = await db.from('player').delete().eq('user_id', userId) 

        res.status(201).json({ message: "Player expulso" })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível expulsar esse player", error: err.message })
    }
}

/* PLAYERS EM UMA SALA */
export const getPlayersByRoomCode = async (req, res) => {
    try {
        const {
            roomCode
        } = req.body
        
        const { data } = await db.from('player').select('*, user:user_id(name,picture_id,email)').eq('roomcode', roomCode)

        res.status(200).json({ message: "Jogadores retornados com sucesso", data: JSON.stringify(data) })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível retornar os jogadores dessa sala", error: err.message })
    }
}

/* PLAYERS EM UMA SALA */
export const addPlayer = async (req, res) => {
    try {
        const {
            userId,
            roomCode
        } = req.body

        console.log(JSON.stringify(req.body))
        
        const { data } = await db.from('player').insert({
            user_id: Number(userId),
            roomcode: `${roomCode}`
        }).select()

        res.status(200).json({ message: "Jogador adicionado com sucesso", data: JSON.stringify(data[0]) })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível adicionar jogador", error: err.message })
    }
}

/* PLAYER */
export const getPlayerByUserId = async (req, res) => {
    try {
        const {
            userId
        } = req.body
        
        const { data } = await db.from('player').select('*, user:user_id(name,picture_id,email)').eq('user_id', userId)

        res.status(200).json({ message: "Usuário retornado com sucesso", data: JSON.stringify(data[0]) })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível retornar o usuário", error: err.message })
    }
}

/* DELETE PLAYER */
export const deletePlayer = async (req, res) => {
    try {
        const {
            userId
        } = req.body

        console.log(JSON.stringify(req.body))
        
        await db.from('player').delete().eq('user_id', Number(userId))

        res.status(200).json({ message: "Jogador deletado com sucesso"})
    } catch (err) {
        res.status(500).json({ message: "Não foi possível deletar o jogador", error: err.message })
    }
}