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

router.get('/:id', async(req,res)=>{
    const {id} = req.params
    try {
        const food = await Food.findById(id)
        if(!food)
            return res.status(400).send('Id inválido!')
            
        res.send({food})
    } catch (error) {
        res.status(400).send({error:"Não foi possível buscar o lanche "+error})
    }
})

router.post('/',async(req,res)=>{
    const {name,link_picture,price,description} = req.body
    try {
    
        if(await Food.findOne({name}))
           return res.status(400).send("Você ja cadastrou um lanche com esse nome!!")
            
        const newFood = await Food.create({name,link_picture,price,description})

        res.send({newFood})
    } catch (error) {
        res.status(400).send({error:"Não foi possível criar o lanche "+error})
    }

})

router.put('/:id', async(req,res)=>{
    const {name, link_picture,price,description} = req.body
    const {id} = req.params
    try {
        if(!await Food.findById(id) )
            return res.status(400).send('Id inválido!')

        const food = await Food.findByIdAndUpdate(id,{name,link_picture,price,description}, {new:true})

        res.send({food})

    } catch (error) {
        res.status(400).send({error:"Não foi possível atualizar o lanche"})
    }
})


router.delete('/:id', async(req,res)=>{
    const {id} = req.params
    try {
        if(!await Food.findById(id) )
            return res.status(400).send('Id inválido!')

        await Food.findByIdAndDelete(id)
        res.send({ok:"Lanche removido com sucesso!"})
    } catch (error) {
        res.status(400).send({error:"Não foi possível remover o lanche! "+error})
    }
})




export default router