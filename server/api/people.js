const router = require('express').Router()
module.exports = router

//shows specific user
router.get('/:id.json', async (req, res, next) => {
  try {
    const id = req.params.id
    // console.log(
    //   'req.session.passport.user in order get route: ',
    //   req.session.passport.user
    // )
  } catch (err) {
    next(err)
  }
})
