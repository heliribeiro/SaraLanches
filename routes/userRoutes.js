import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

const router = express.Router()

router.post('/register',async(req,res)=> {
        const {name,username,password} = req.body
    try {
        if(await User.findOne({username}))
            return res.status(400).json('O usuário ja existe!')

        const user = await User.create({name,username,password})
        user.password = undefined
        res.send(user)
    } catch (error) {
        res.status(400).send({error:'Não foi possível cadastrar o Usuário '+error})
    }
})

router.post('/authenticate',async(req,res)=>{
    const {username,password} = req.body

    try {
        const user = await User.findOne({username}).select('+password')
        if(!user)
            res.status(400).send({error:"O usuário não está cadastrado"})
        
        if(!await bcrypt.compare(password, user.password))
           res.status(400).send({error:"Senha inválida"})
       
        res.send({user})

    } catch (error) {
        res.status(400).send({error:'Não foi possível fazer o login '+error})
    }
})


export default router