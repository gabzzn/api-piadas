import { Router } from "express";
import { submeterPiada, buscarPiadaAleatoria, listarPiadasPendentes, aprovarPiada } from "../controllers/piadaController.js";

const router = Router();

//define que, ao fazer um POST em '/piadas', executa a função 'submeterPiada'
router.post("/piadas", submeterPiada);

//pega uma piada aleatória aprovada
router.get("/piadas", buscarPiadaAleatoria);

//rotas admin (por enquanto abertas)
router.get('/piadas/pendentes', listarPiadasPendentes);
router.put('/piadas/:id/aprovar', aprovarPiada);

export default router;