const router = require('express').Router()
module.exports = router

//shows project list for specific user
router.get('/:userName/list.json', async (req, res, next) => {
  try {
    const userName = req.params.userName
    // console.log(
    //   'req.session.passport.user in order get route: ',
    //   req.session.passport.user
    // )
  } catch (err) {
    next(err)
  }
})

//shows project details for specific project
router.get('/:userName/:id.json', async (req, res, next) => {
  try {
    const userName = req.params.userName
    const id = req.params.id
    // console.log(
    //   'req.session.passport.user in order get route: ',
    //   req.session.passport.user
    // )
  } catch (err) {
    next(err)
  }
})

//add a photo to a specific project
router.post('/:userName/:id/create_photo.json', async (req, res, next) => {
  try {
    const userName = req.params.userName
    const id = req.params.id
  } catch(err) {
    next(err)
  }
})
