import express from "express"; // Importa o módulo express para criar o servidor web
import bodyParser from "body-parser"; // Importa o módulo body-parser para analisar o corpo das requisições
import mongoose from "mongoose"; // Importa o módulo mongoose para interagir com o MongoDB
import cors from "cors"; // Importa o módulo cors para permitir solicitações de diferentes origens
import multer from "multer"; // Importa o módulo multer para manipulação de uploads de arquivos
import helmet from "helmet"; // Importa o módulo helmet para proteger o app de vulnerabilidades comuns
import morgan from "morgan"; // Importa o módulo morgan para registrar logs de requisições HTTP
import path from "path"; // Importa o módulo path para manipulação de caminhos de arquivos
import { fileURLToPath } from "url"; // Importa fileURLToPath para converter URLs de arquivos em caminhos locais
import connectDatabase from "./database/db.js"; // Importa a função connectDatabase para conectar ao banco de dados
import dotenv from "dotenv"; // Importa o módulo dotenv para carregar variáveis de ambiente a partir de um arquivo .env

// Define o caminho para o arquivo .env
const envPath = path.resolve('../.env'); // Ajuste o caminho conforme a estrutura do seu projeto

// Carrega variáveis de ambiente a partir do arquivo .env
dotenv.config({ path: envPath });

// Exibe a URL do MongoDB no console para verificação
console.log("MONGO_URL:", process.env.MONGO_URL);

// Define a porta do servidor, usando a variável de ambiente PORT ou 10000 por padrão
const port = process.env.PORT || 10000;

// Obtém o caminho do diretório atual
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Cria uma instância do aplicativo Express
const app = express();

// Configura o Express para analisar JSON
app.use(express.json());

// Configura o Helmet para aumentar a segurança do aplicativo
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Configura o Morgan para registrar logs das requisições HTTP
app.use(morgan("common"));

// Configura o Body-Parser para analisar JSON e dados codificados por URL com limites de tamanho
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Configura o CORS para permitir solicitações da origem especificada e métodos HTTP
app.use(cors({ origin: 'http://localhost:5173', methods: "GET,POST,PUT,DELETE,PATCH", credentials: true }));

// Serve arquivos estáticos da pasta 'public/assets'
app.use("/assets", express.static(path.join(dirname, 'public/assets')));

// Configura o Multer para o armazenamento de arquivos enviados
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos carregados
    cb(null, path.join(dirname, 'public/assets'));
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo carregado
    cb(null, file.originalname);
  }
});
const upload = multer({ storage }); // Cria uma instância do multer com a configuração de armazenamento

// Importa as rotas
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import imobRoute from "./routes/imob.route.js";
import contractRoute from "./routes/contract.route.js";
import despesasRoute from "./routes/despesas.routes.js";
import manutencaoRoute from "./routes/manutecao.routes.js";
import documentoRoute from "./routes/documento.route.js";
import pagamentoRoute from "./routes/pagamento.route.js";
import swaggerRoute from "./routes/swagger.route.cjs";

// Configura as rotas do Express
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/imob", imobRoute);
app.use("/contract", contractRoute);
app.use("/despesa", despesasRoute);
app.use("/manutencao", manutencaoRoute);
app.use("/documento", documentoRoute);
app.use("/pagamento", pagamentoRoute);
app.use("/doc",swaggerRoute);

// Conecta ao banco de dados e inicializa o servidor
connectDatabase() // Conecta ao banco de dados usando a função importada
mongoose.connect(process.env.MONGO_URL) // Conecta ao MongoDB usando a URL fornecida nas variáveis de ambiente
  .then(() => {
    // Se a conexão for bem-sucedida, inicia o servidor na porta especificada
    app.listen(process.env.PORT || port, () => console.log(`Server running on port: ${process.env.PORT || port}`));
  })
  .catch((error) => {
    // Se ocorrer um erro ao conectar ao MongoDB, exibe uma mensagem no console
    console.log(`${error} did not connect`);
  });
