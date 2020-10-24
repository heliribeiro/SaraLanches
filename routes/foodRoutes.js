import express from 'express'
import Food from '../models/Food.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: Food management
 */


/**
 * @swagger
 * path:
 *  /foods:
 *    get:
 *      summary: Get a list of all foods
 *      tags: [Foods]
 *      responses:
 *        "200":
 *          description: An foods array of object
 */
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

/**
 * @swagger
 * path:
 *  /foods:
 *    post:
 *      summary: Create a new food
 *      tags: [Foods]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Food'
 */
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

/**
 * @swagger
 * path:
 *  /foods/{id}:
 *    put:
 *      summary: update a food
 *      tags: [Foods]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            descritipon: Id of the food
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Food'
 *      responses:
 *          "200":
 *              descripion: An array of foods
 */
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

/**
 * @swagger
 * path:
 *  /foods/{id}:
 *    delete:
 *      summary: delete the food
 *      tags: [Foods]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            descritipon: Id of the food
 *      responses:
 *          "200":
 *              descripion: deletado com sucesso
 */
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