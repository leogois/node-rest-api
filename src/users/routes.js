const { Router } = require('express')

const withAsyncErrorHandler = require('../middlewares/async-error')

const router = Router()

const createUser = async (req, res) => {
  res.status(201).header('Location', '/users/').send({})
}
router.post('/users', withAsyncErrorHandler(createUser))

router.get('/', withAsyncErrorHandler(async (req, res) => {
  res.status(200).send({ users: [] })
}))

router.get('/:id', withAsyncErrorHandler(async (req, res) => {
  res.status(200).send({})
}))

router.put('/:iid', withAsyncErrorHandler(async (req, res) => {
  res.status(203).send({})
}))

router.delete('/:id', async (req, res) => {
  res.status(204).send
})

module.exports = router
