import { db } from "../db/initSupabase.js";

export const getRules = async (req, res) => {
    try {
        //BLZ, a variavél que recebe o valor que veio do corpo da requisição tem que ser um objeto, não pode ser um "tipo primitivo como int, float, string, double"
        const movieId = req.query.movieId;
        const { data, error } = await db.from('movierule').select('description').eq('moviegame_id', movieId);
        res.status(200).json({ message: "Regras listadas com sucesso", data: JSON.stringify(data), error});
    } catch(err) {
        res.status(500).json({ message: "Não foi possivél buscar as regras do filme no banco de dados", error: err.message});
    }
}

//Estou pensando em fazer a lógica de inserir várias regras de uma vez no mobile. Tipo quando apertar no botão de adicionar filme eu faço um for para cada regra e chamo essa rota da API
export const insertRules = async (req, res) => {
    try {
        const {
            movieId,
            rule
        } = req.body
        
        const { data, error} = await db.from('movierule').insert({moviegame_id: movieId, description: rule});
        res.status(201).json({message: "Regra adicionada com sucesso", data: JSON.stringify, error});
    } catch(err) {
        res.status(500).json({ message: "Não foi possível adicionar regras do filme ao banco de dados", error: err.message})
    }
}