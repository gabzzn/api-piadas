import bcrypt from "bcryptjs";
import * as Usuario from "../models/Usuario.js";

//função para registrar um novo usuário
export async function registrarUsuario(req, res) {
    const { email, senha } = req.body;

    //validação básica
    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    //criptografar a senha
    const senhaHash = await bcrypt.hash(senha, 10); //10 é o custo "custo" do hash

    try {
        //tenta criar o usuário no banco
        const novoUsuario = await Usuario.createUser(email, senhaHash);
        res.status(201).json({ message: 'Usuário registrado com sucesso.', usuario: novoUsuario });
    } catch (error) {
        //se der erro (ex: email já existe), retorna 500
        console.log(error);
        res.status(500).json({ message: "Erro ao registrar usuário.", error: error.message });
    }
}