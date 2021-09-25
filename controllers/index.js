
const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);
// need homepage
// need dashboard

router.use((req, res) => {
  res.status(404).end();

});


module.exports = router;