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
