import jwt from 'jsonwebtoken';
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

export async function loginUsuario(req, res) {
    const { email, senha } = req.body;

    //1 buscar usuário no banco
    const usuario = await Usuario.findUserByEmail(email);

    //se não achar o usuário, nega o acesso
    if (!usuario) {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }

    //2 comparar a senha enviada com a criptografada (hash) no banco
    //o bycrypt faz a mágica de comparar "123" com "$2b$10$..."
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    
    if (!senhaValida) {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }

    //3 gerar o token JWT (o crachá)
    const token = jwt.sign(
        { id: usuario.id },     //o que guardamos no crachá
        process.env.JWT_SECRET, // o segredo do .env para assinar
        { expiresIn: '1h' }     //tempo de validade do token
    );

    res.json ({ token });
}
