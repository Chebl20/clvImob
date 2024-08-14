import Manutencao from "../models/manutencao.js";

// Create a new manutencao
export const createManutencaoService = async (data) => {
    const manutencao = new Manutencao(data);
    return manutencao.save();
};

// Find all manutencao records
export const findAllManutencaoService = async () => {
    return Manutencao.find().populate("imob");
};

// Find manutencao by ID
export const findManutencaoByIdService = async (id) => {
    return Manutencao.findById(id).populate("imob");
};

// Update a manutencao by ID
export const updateManutencaoService = async (id, data) => {
    return Manutencao.findByIdAndUpdate(id, data, { new: true }).populate("imob");
};

// Delete a manutencao by ID
export const deleteManutencaoService = async (id) => {
    return Manutencao.findByIdAndDelete(id);
};
