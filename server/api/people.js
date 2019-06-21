const router = require('express').Router()
module.exports = router

//shows specific user
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
