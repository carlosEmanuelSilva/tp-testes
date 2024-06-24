import { db } from "../db/initSupabase.js"

/* GET PICTURES */
export const getPictures = async (req, res) => {
    try {
        const { data, error } = await db.from('picture').select()

        res.status(201).json({ message: "Fotos de perfil listadas", data: JSON.stringify(data), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível listar as fotos de perfil", error: err.message })
    }
}

/* GET PICTURE */
export const getPicture = async (req, res) => {
    try {
        const {
            pictureId,
        } = req.body

        const { data, error } = await db.from('picture')
        .select()
        .eq('id', pictureId)

        res.status(201).json({ message: "Foto de perfil retornada", data: JSON.stringify(data), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível retornar a foto de perfil", error: err.message })
    }
}