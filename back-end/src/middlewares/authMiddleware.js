import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
    //pega o token do cabeçalho Authorization
    const { autgorization } = req.headers;

    //se não tiver token, nega o acesso
    if (!authorization) {
        return res.status(401).json({ message: "Token não fornecido." });
    }
    
    //o token vem no formato "Bearer <token>", então precisamos separar
    const parts = authorization.split(' ');

    if (parts.lenght !==2 ) {
        return res.status(401).json({ message: "Erro no formato do Token." });
    }

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: "Token mal formatado." });
    }

    //3 verifica se o token é válido e não expirou
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido." });
        }
        
        //4 se tudo ok, guarda o ID do usuário na requisição para usar depois
        req.userId = decoded.id;

        //o next() manda a requisição seguir para o controller
        return next();
    });
}