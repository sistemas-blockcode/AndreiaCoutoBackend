import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import { mainRouter } from "./routers/main";
import path from "path";  // Importar o path para gerar o caminho correto

const server = express();

// Configurar Helmet para segurança
server.use(helmet());

// Configuração do CORS para permitir todas as origens
server.use(cors({
    origin: '*',  // Permite todas as origens
}));

// Middleware para parsing de dados
server.use(urlencoded({ extended: true }));
server.use(express.json());

// Middleware para servir arquivos estáticos da pasta uploads
server.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas
server.use(mainRouter);

// Inicialização do servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (process.env.BASE_URL) {
        console.log(`Base URL: ${process.env.BASE_URL}`);
    }
});
