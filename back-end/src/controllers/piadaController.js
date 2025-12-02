import * as Piada from "../models/Piada.js"; //importamos o model

export async function submeterPiada(req, res) {
    const { pergunta, resposta } = req.body; //pega os dados do corpo da requisição JSON}

//validacao: verifica se os campos foram preenchidos
    if (!pergunta || !resposta) {
        res.status(400).json({ message: "Os campos 'pergunta' e 'resposta' são obrigatórios." });
    }

    try {
        // chama o model para salvar
        const novaPiada = await Piada.createPiada(pergunta, resposta);

        //responde com sucesso (201 = created)
        res.status(201).json({
            message: "Sucesso! Piada enviada para a moderação.",
            piada: novaPiada
    });

    } catch (error) {
        //se der erro no banco, avisa o usuário (500 = erro interno)
        res.status(500).json({ message: "Erro ao criar piada." });
    }
}

export async function buscarPiadaAleatoria(req, res) {
    try {
        const piada = await Piada.getPiadaAleatoria(); //chama o model para pegar a piada

        //se nao tiver nenhuma piada aprovada no banco, o retorno será undefined
        if (!piada) {
            res.status(404).json(
                { 
                    message: "Nenhuma piada aprovada encontrada." 
                }
            );
        }

        //se achou, devolve a piada
        res.json(piada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao buscar piada." });
    }
}

export async function listarPiadasPendentes(req, res) {
    try {
        const piadas = await Piada.getPiadasPendentes();
        res.json(piadas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao buscar piadas pendentes." });
    }
}

export async function aprovarPiada(req, res) {
    const {id} = req.params; //pega o id da url

    try {
        //envia "1" para o model, indicando aprovação
        const sucesso = await Piada.moderarPiada(id, 1);

        if (sucesso) {
            res.json({message: `Piada ${id} aprovada com sucesso.`});
        } else {
            res.status(404).json({message: "Piada não encontrada."});
        }
    } catch (error) {
        res.status(500).json({message: "Erro ao moderar piada."});
    }
}
