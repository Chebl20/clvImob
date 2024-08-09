import bcrypt from "bcryptjs";
import {loginService} from "../services/auth.service.js"
const mensagem = "User and/or Password not found";

export const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await loginService(email);

    if(!user){
        return res.status(404).send({message: mensagem})
    }

    const passwordValid =bcrypt.compareSync(password, user.password);

    if(!passwordValid||!user){
        return res.status(404).send({message: mensagem})
    }


    res.send("Login sucess");
};