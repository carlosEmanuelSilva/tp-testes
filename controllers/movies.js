import { db } from "../db/initSupabase.js";

export const getMovies = async (req, res) => {
    try {
        const userId = req.query.id;
        const { data, error } = await db.from('moviegame').select('name').eq('user_id', userId);
        res.status(200).json({ message: "Filmes listados com sucesso", data: JSON.stringify(data), error});
    } catch(err) {
        res.status(500).json({ message: "Não foi possivél buscar os filmes no banco de dados", error: err.message});
    }
};

export const insertMovie = async (req, res) => {
    try {
        const {
            userId,
            movieName
        } = req.body;

        const { data, error } = await db.from('moviegame').insert({name: movieName, user_id: userId});
        res.status(201).json({ message: "Filme adicionado com sucesso", data: JSON.stringify, error});

    } catch(err) {
        res.status(500).json({message: "Não foi possível adicionar filme ao banco de dados", error: err.message})
    }
}