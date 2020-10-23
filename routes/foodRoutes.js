import express from 'express'
import Food from '../models/Food.js'

const router = express.Router()

router.get('/',async(req,res)=>{
    try {
        const foods = await Food.find() 
        res.send({foods})       
    } catch (error) {
        res.status(400).send({error:"Não foi possível listar os lanches "+error})
    }
})

router.post('/',async(req,res)=>{
    const {name,link_picture,price,description} = req.body
    try {
        const food = await Food.create({name,link_picture,price,description})

        res.send({food})
    } catch (error) {
        res.status(400).send({error:"Não foi possível criar o lanche "+error})
    }
})




export default router