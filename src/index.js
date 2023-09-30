const express = require('express')
const { TodosRepository  } = require('./todos/repository')

const app = express()

app.use(express.json())

app.get('/hello', (req, res) => {
  res.status(200).send('Hello Word!')
})

app.get('/hello/:name', (req, res) => {
  const name = req.params.name

  res.status(200).send(`Hello ${name}!`)
})

// ** Todos **
const todosRepository = TodosRepository()

const NotFound = {
  error: 'Not found',
  message: 'Resource not found'
}

app.get('/todos', async (req, res) => {
await todosRepository.list().then((todos) => {
  res.status(200).send(todos)
})
})

app.get('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  const todo = await todosRepository.get(id)
   if (!todo) {
    res.status(404).send(NotFound)
   }

   res.status(200).send(todo)
})

app.post('/todos', async (req, res) => {
  const todo = req.body

  const inserted = await todosRepository.insert(todo)
    res
    .status(201)
    .header('Location', `/todos/${inserted.id}`)
    .send(inserted)
  })

app.put('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const todo = {...req.body, id}

  const found = await todosRepository.get(id)

  if (!found) {
    res.status(404).send(NotFound)
    return
  }
  const updated = await todosRepository.update(todo)

  res.status(200).send(updated)
})

app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  const found = await todosRepository.get(id)

  if (!found) {
    res.status(404).send(NotFound)
    return
  }

  await todosRepository.del(id)
  res.status(204).send()
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is runnnig')
})
.once('error', (error) => {
  console.error(error)
  process.exit(1)
})
