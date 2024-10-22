import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import { mainRouter } from "./routers/main";
import path from "path";  // Importar o path para gerar o caminho correto

const server = express();
server.use(helmet());
server.use(cors({
    origin: '*',
    credentials: true,
}));
server.use(urlencoded({ extended: true }));
server.use(express.json());

// Middleware para servir arquivos estáticos da pasta uploads
server.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas
server.use(mainRouter);

server.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running ${process.env.BASE_URL}`);
});
