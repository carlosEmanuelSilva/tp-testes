import { db } from "../db/initSupabase.js"

async function getPointsByUserId(userId) {
    const { data, error } = await db.from('player')
        .select('points')
        .eq('user_id', userId)

    return {data: data[0], error}
}

/* GET PLAYER POINTS */
export const getPoints = async (req, res) => {
    try {
        const {
            userId,
        } = req.body
        
        const retorno = await getPointsByUserId(userId)

        const data = retorno.data

        const error = retorno.error

        res.status(201).json({ message: "Pontos retornados", data: JSON.stringify(data), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível retornar os pontos", error: err.message })
    }
}

/* ADD POINTS */
export const addPoints = async (req, res) => {
    try {
        const {
            userId,
            addedPoints
        } = req.body
        
        const retorno = await getPointsByUserId(userId)

        const erro = retorno.error

        if(erro) {
            res.status(500).json({ message: "Não foi possível alterar os pontos", error: erro })
        }

        const anterior = JSON.parse(JSON.stringify(retorno.data))

        const pontos = anterior.points + addedPoints

        const { data, error } = await db.from('player')
        .update({ points: pontos })
        .eq('user_id', userId)
        .select()

        if(error) {
            console.log(error)
        }

        res.status(201).json({ message: "Pontos alterados", data: JSON.stringify(data), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível alterar os pontos", error: err.message })
    }
}