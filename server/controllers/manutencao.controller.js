import {
    createManutencaoService,
    findAllManutencaoService,
    findManutencaoByIdService,
    updateManutencaoService,
    deleteManutencaoService,
} from "../services/manutencao.service.js";

// Create a new manutencao
export const createManutencao = async (req, res) => {
    try {
        const { imob, solicitacao, data_solicitacao, status, desc_total } = req.body;

        if (!imob || !solicitacao || !data_solicitacao || !status || !desc_total) {
            return res.status(400).send({ message: "Submit all fields for registration" });
        }

        const newManutencao = await createManutencaoService({ imob, solicitacao, data_solicitacao, status, desc_total });
        return res.status(201).send(newManutencao);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Get all manutencao records
export const findAllManutencao = async (req, res) => {
    try {
        const manutencao = await findAllManutencaoService();
        if (manutencao.length === 0) {
            return res.status(404).send({ message: "No manutencao records found" });
        }
        return res.send(manutencao);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Get manutencao by ID
export const findManutencaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const manutencao = await findManutencaoByIdService(id);
        if (!manutencao) {
            return res.status(404).send({ message: "Manutencao not found" });
        }
        return res.send(manutencao);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Update a manutencao by ID
export const updateManutencao = async (req, res) => {
    try {
        const { id } = req.params;
        const { imob, solicitacao, data_solicitacao, status, desc_total } = req.body;

        if (!imob || !solicitacao || !data_solicitacao || !status || !desc_total) {
            return res.status(400).send({ message: "Submit all fields for updating" });
        }

        const updatedManutencao = await updateManutencaoService(id, { imob, solicitacao, data_solicitacao, status, desc_total });
        if (!updatedManutencao) {
            return res.status(404).send({ message: "Manutencao not found" });
        }

        return res.send(updatedManutencao);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// Delete a manutencao by ID
export const deleteManutencao = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedManutencao = await deleteManutencaoService(id);
        if (!deletedManutencao) {
            return res.status(404).send({ message: "Manutencao not found" });
        }
        return res.status(200).send({ message: "Manutencao deleted successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
