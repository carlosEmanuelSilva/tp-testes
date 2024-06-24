import { db } from "../db/initSupabase.js"

/* GET FRIENDS */
export const getFriends = async (req, res) => {
    try {
        const {
            userId,
        } = req.body

        let friendsList = []
        
        const { data: firstData, error: firstError } = await db.from('friendship')
        .select('date, user:user_id(id,name,picture_id)')
        .eq('status', 1)
        .eq('friend_id', userId)

        if(!firstError) {
            friendsList = firstData
        }
        
        const { data: secondData, error: secondError } = await db.from('friendship')
        .select('date, user:friend_id(id,name,picture_id)')
        .eq('status', 1)
        .eq('user_id', userId)

        if(!secondError) {
            friendsList = friendsList.concat(secondData)
        }

        res.status(201).json({ message: "Amigos listados", data: JSON.stringify(friendsList), error: null })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível listar os amigos", error: err.message })
    }
}

/* ADD FRIEND */
export const addFriend = async (req, res) => {
    try {
        const {
            userId,
            friendId
        } = req.body

        const { data, error } = await db.from('friendship').insert({
            user_id: userId,
            friend_id: friendId
        }).select()

        if(error) {
            console.log(error)
        }

        res.status(201).json({ message: "Pedido de amizade enviado", data: JSON.stringify(data), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível enviar pedido de amizade", error: err.message })
    }
}

/* DELETE FRIEND REQUEST */
export const declineFriendship = async (req, res) => {
    try {
        const {
            userId,
            friendId
        } = req.body

        const { error } = await db.from('friendship')
        .delete()
        .eq('user_id', userId)
        .eq("friend_id", friendId)

        if(error) {
            console.log(error)
        }

        res.status(201).json({ message: "Pedido de amizade recusado", error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível recusar pedido de amizade", error: err.message })
    }
}