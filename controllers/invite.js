import { db } from "../db/initSupabase.js"

/* SEND INVITE */
export const sendInvite = async (req, res) => {
    try {
        const {
            senderId,
            invitedId,
            roomCode
        } = req.body

        const { data, error } = await db.from('invite').insert({
            sender_id: senderId,
            invited_id: invitedId,
            roomcode: roomCode
        }).select()

        if(error) {
            console.log(error)
        }

        res.status(201).json({ message: "Convite para a sala enviado", data: JSON.stringify(data), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível enviar o convite para a sala", error: err.message })
    }
}

/* DELETE ROOM INVITES */
export const deleteRoomInvites = async (req, res) => {
    try {
        const {
            roomCode
        } = req.body

        const { error } = await db.from('invite')
        .delete()
        .eq('roomcode', roomCode)

        if(error) {
            console.log(error)
        }

        res.status(201).json({ message: "Convites da sala limpados", error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível limpar os convites da sala", error: err.message })
    }
}