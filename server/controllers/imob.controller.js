import imobService from "../services/imob.service.js";
import mongoose from "mongoose"
const { createService, findAllService, countImob } = imobService;

const create = async (req, res) => {
    try {

        const { cep, num_casa, rua, bairro, cidade, estado } = req.body;

        if (!cep || !num_casa || !rua || !bairro || !cidade || !estado) {
            return res.status(400).send({
                message: "Submit all fields for registration",
            });
        }

        await createService({
            cep,
            num_casa,
            rua,
            bairro,
            cidade,
            estado,
            proprietario: req.userId,
        });

        return res.status(201).send();  // Corrigido para enviar status corretamente
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


const findAll = async (req, res) => {
    let { limit, offset } = req.query;

    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
        limit = 5;
    }

    if (!offset) {
        offset = 5;
    }


    const imob = await findAllService(offset, limit);
    const total = await countImob();
    const currentUrl = req.baseUrl;


    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null;

    const previous = offset - limit < 0? null: offset - limit;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;


    if (imob.length == 0) {
        return res.status(400).send({ message: "There are no registered imob" });

    }
    res.send(
        {nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: imob.map(imobItem => ({
                id: imobItem._id,
                cep: imobItem.cep,
                num_casa: imobItem.num_casa,
                rua: imobItem.rua,
                bairro: imobItem.bairro,
                cidade: imobItem.cidade,
                estado: imobItem.estado,
            }))
        });
}

export default { create, findAll };

