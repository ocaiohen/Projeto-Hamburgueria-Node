const express = require("express")
const server = express()
const uuid = require("uuid")
server.use(express.json())
const port = 3000

const pedidos = []

const logarMetodoRequisicaoUrl = (request, response, next) => {
    console.log(`[${request.method}]; ${request.url}`)
    next()
}
const verificarID = (request, response, next) =>{
    const {id} = request.params
    const index = pedidos.findIndex(item => item.id === id)
    
    if(index === -1){
        response.status(404).json({error: "The ID does not exist!"})
    }

    request.index = index

    next()
}
server.use(logarMetodoRequisicaoUrl)

server.get("/documents", (request, response) => {
    return response.json(pedidos)
})
server.post("/documents", (request, response) => {
    const {order, clientName, price, status} = request.body

    const pedidoRecebido = {id: uuid.v4(), order, clientName, price, status}
    pedidos.push(pedidoRecebido)

    response.sendStatus(201)
})
server.get("/documents/:id", verificarID, (request, response) => {
    const {id} = request.params
    const index = pedidos.findIndex(item => item.id === id)
    response.json(pedidos[index])
})
server.put("/documents/:id", verificarID, (request, response) => {
    const {id} = request.params
    const {order, clientName, price, status} = request.body
    const index = pedidos.findIndex(item => item.id === id)
    const pedidoAtualizado = {id, order, clientName, price, status }

    pedidos[index] = pedidoAtualizado

    response.json(pedidos[index])
})
server.delete("/documents/:id", verificarID, (request, response) => {
    const {id} = request.params
    const index = pedidos.findIndex(item => item.id === id)
    
    pedidos.splice(index, 1)
    
    response.sendStatus(204)
})
server.patch("/documents/:id", verificarID, (request, response) => {
    const {id} = request.params
    const index = pedidos.findIndex(item => item.id === id)
    pedidos[index].status = "Pronto"
    response.json(pedidos[index].status)
})


server.listen(port)

