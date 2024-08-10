import bodyParser from "body-parser";
import Imob from "../models/Imobs.js";

const createService = (body) => Imob.create(body);

const findAllService = (offset, limit) => Imob.find().skip(offset).limit(limit).populate("proprietario"); // Corrigido para "proprietario"
 // Supondo que "user" seja o campo que referencia o modelo User

const countImob =  () => Imob.countDocuments();

export default {
    createService,
    findAllService,
    countImob
};
