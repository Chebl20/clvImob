// testando o git pelo main
// pagina principal
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import MongoStore from 'connect-mongo';

// import de rota


// configuracoes
dotenv.config();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: 'http://localhost:3000/', methods: "GET,POST,PUT,DELETE", credentials: true }));
app.use("/assets", express.static(path.join(dirname, 'public/assets')));


// Configuração do multer para armazenamento de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public/assets'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage });




//   rotas
// fazer rotas aqui


// conexao do mongo
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`)); 
