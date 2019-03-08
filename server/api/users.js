const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // console.log(
    //   'req.session.passport.user in order get route: ',
    //   req.session.passport.user
    // )
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    // console.log(
    //   'req.session.passport.user in order get route: ',
    //   req.session.passport.user
    // )
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/projects', async (req, res, next) => {
  try {
    const userId = req.params.userId
    // console.log(
    //   'req.session.passport.user in order get route: ',
    //   req.session.passport.user
    // )
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/projects/:projectId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const projectId = req.params.projectId
    // console.log(
    //   'req.session.passport.user in order get route: ',
    //   req.session.passport.user
    // )
  } catch (err) {
    next(err)
  }
})
