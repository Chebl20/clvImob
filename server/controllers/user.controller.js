const create = (req,res) => {
    const {name,username,email,senha}= req.body;

    if(!name||!username||!email||!senha){
        res.status(400).send({mesage : "Submit all fields for registration"})
    }

    res.status(201).send({
        mesage: "User created",
        user:{
            name,
            username,
            email
        }
    })
}


export default { create};