import { db } from "../db/initSupabase.js"

export const getUsers = async (req, res) => {
    try {
        //const friendsArray = req.body.friendsArray
        const {
            userId
        } = req.body
        //const friendIdsArray = friendsArray.map(friendship => friendship.friend_id);

        const { data, error } = await db
            .from('user')
            .select('id, name, picture_id')
            //.notIn('id', [...friendIdsArray, userId]);



            ;
        res.status(201).json({ message: "Usuários listados", data, error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível listar os usuários", error: err.message })
    }

}

export const getImgUsers = async (req, res) => {
    try {
        const usersArray = req.body.usersArray
        const pictureIds = usersArray.map(user => user.picture_id);

        try {
            const { data, error: picturesError } = await supabase
                .from('picture')
                .select('id, path')
                .in('id', pictureIds);

            if (picturesError) {
                throw picturesError;
            }
        } catch (error) {
            console.error('Erro ao obter dados das imagens:', error.message);
            throw error;
        }
        res.status(201).json({ message: "Imagens listados", data, error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível listar as imagens", error: err.message })
    }

}

export const entrarNaSala = async (req, res) => {
    try {
        const { roomcode, user_id } = req.body;

        const { data: existingPlayerData, error: existingPlayerError } = await db.from('player').select().eq('user_id', user_id)

        if (existingPlayerError) {
            return res.status(500).json({ message: "Erro ao verificar o jogador existente", error: existingPlayerError })
        }

        if (existingPlayerData.length > 0) {
            return res.status(400).json({ message: "O usuário já é um jogador em uma sala", error: null })
        }

        const { data: roomData, error: roomError } = await db.from('player').select().eq('roomcode', roomcode)

        if (roomError) {
            return res.status(500).json({ message: "Erro ao verificar a sala existente", error: roomError })
        }

        if (roomData.length > 0) {
            const playerData = await createUserAsPlayer(req);
            if (playerData.error) {
                return res.status(500).json({ message: "Não foi possível criar o jogador", error: playerData.error })
            }
            return res.status(200).json({ message: "Usuário entrou na sala", playerData: playerData.data })
        } else {
            return res.status(404).json({ message: "Sala não encontrada" })
        }
    } catch (err) {
        return res.status(501).json({ message: "Não foi possível entrar na sala", error: err.message });
    }
};


export const createUserAsPlayer = async (req) => {
    try {
        const { user_id } = req.body
        const { points, roomcode } = req.body

        const { data: userData, error: userError } = await db.from('user').select().eq('id', user_id)

        if (userError || userData.length === 0) {
            return { data: null, error: userError }
        }

        const { data: playerData, error: playerError } = await db.from('player').insert({
            user_id: user_id,
            points: points,
            roomcode: roomcode,
        }).select()

        if (playerError) {
            return { data: null, error: playerError }
        }

        userData[0].playerId = playerData[0].id

        return { data: userData, error: null }
    } catch (err) {
        return { data: null, error: err.message }
    }
}

/* UPDATE NAME */
export const changeName = async (req, res) => {
    try {
        const {
            userId,
            name
        } = req.body
        
        const { data, error } = await db.from('user')
        .update({ name: name })
        .eq('id', userId)
        .select()

        delete data[0].password

        if(error) {
            console.log(error)
        }

        res.status(201).json({ message: "Nome alterado", data: JSON.stringify(data[0]), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível alterar o nome", error: err.message })
    }
}

/* UPDATE NAME */
export const changePicture = async (req, res) => {
    try {
        const {
            userId,
            pictureId
        } = req.body
        
        const { data, error } = await db.from('user')
        .update({ picture_id: pictureId })
        .eq('id', userId)
        .select()

        delete data[0].password

        if(error) {
            console.log(error)
        }

        res.status(201).json({ message: "Foto alterada", data: JSON.stringify(data[0]), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível alterar a foto", error: err.message })
    }
}