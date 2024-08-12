import contract from "../models/Contract.js";

export const createService = (body) => contract.create(body);

export const findAllService = (offset, limit) => contract.find().skip(offset).limit(limit).populate("proprietario");

export const countContract = () => contract.countDocuments();