const { Router } = require('express')
const { TodosRepository } = require('./repository')

const todosRepository = TodosRepository()

const router = Router()

const NotFound = {
  error: 'Not found',
  message: 'Resource not found'
}

router.get('/', async (req, res) => {
await todosRepository.list().then((todos) => {
  res.status(200).send(todos)
})
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  const todo = await todosRepository.get(id)
   if (!todo) {
    res.status(404).send(NotFound)
   }

   res.status(200).send(todo)
})

router.post('/', async (req, res) => {
  const todo = req.body

  const inserted = await todosRepository.insert(todo)
    res
    .status(201)
    .header('Location', `/todos/${inserted.id}`)
    .send(inserted)
  })

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  const found = await todosRepository.get(id)

  if (!found) {
    res.status(404).send(NotFound)
    return
  }

  await todosRepository.del(id)
  res.status(204).send()
})

module.exports = router
