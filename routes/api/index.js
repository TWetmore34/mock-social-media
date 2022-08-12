const router = require('express').Router()

router.get('/', (req, res) => {
    res.end('still working?')
})

module.exports = router