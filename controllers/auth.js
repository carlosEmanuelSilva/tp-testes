import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { db } from "../db/initSupabase.js"

/* SIGNUP */
export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const { data, error } = await db.from('user').insert({
            name: name,
            password: passwordHash,
            email: email
        }).select()

        delete data[0].password

        if(error) {
            console.log(error)
        }

        res.status(201).json({ message: "Usuário cadastrado", data: JSON.stringify(data), error })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível cadastrar usuário", error: err.message })
    }
}

/* LOGIN */
export const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        
        const { data } = await db.from('user').select().eq('email', email)
        
        if (data == null || !data[0]) {
            return res.status(400).json({ message: "Usuário não encontrado", error: "Verifique o email inserido" })
        }
        
        const isMatch = await bcrypt.compare(password, data[0].password)
        
        if (!isMatch) {
            return res.status(400).json({ message: "Não foi possível entrar", error: "Senha incorreta" })
        }

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET)
        delete data[0].password

        res.status(200).json({ message: "Login realizado com sucesso", token, data: JSON.stringify(data[0]) })
    } catch (err) {
        res.status(500).json({ message: "Não foi possível entrar", error: err.message })
    }
}