import { db } from "../db/initSupabase.js"

export const getInvites = async (req, res) => {
    try {
        const {
            userId
        } = req.body

        const { data, error } = await db.from('invite').select().eq('invited_id', userId) // Gets every record from the invite table that has the invited_id equals to the logged user

        /*
        data = [
            {id: id, roomcode: roomcode, date: date, sender_id: sender_id, invited_id: invited_id},
            {id: id, roomcode: roomcode, date: date, sender_id: sender_id, invited_id: invited_id},
            ...
        ]
        */
        res.status(201).json({ message: "Convites listados", data: JSON.stringify(data), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível listar os convites", error: err.message })
    }
}

export const getFriendRequests = async (req, res) => {
    try {
        const {
            userId
        } = req.body

        const { data, error } = await db.from('friendship').select('*, user:user_id(name,picture_id)').eq('friend_id', userId).eq('status', 0) // Gets every record from the friendship table that has the friend_id equals to the logged user and the status = 0; status types: 0 = requested; 1 = accepted; 2 = rejected;

        /*
        data = [
            {user_id: user_id, friend_id: friend_id, status: status, date: date},
            {user_id: user_id, friend_id: friend_id, status: status, date: date},
            ...
        ]
        */

        res.status(201).json({ message: "Pedidos de amizade listados", data: JSON.stringify(data), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível listar os pedidos de amizade", error: err.message })
    }
}