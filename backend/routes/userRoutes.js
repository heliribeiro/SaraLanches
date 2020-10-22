import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/register',async(req,res)=> {
        const {name,username,password} = req.body
    try {
        const user = await User.create({name,username,password})
        user.password = undefined
        res.send(user)
    } catch (error) {
        res.status(400).send({error:'Não foi possível cadastrar o Usuário '+error})
    }
})

export default router