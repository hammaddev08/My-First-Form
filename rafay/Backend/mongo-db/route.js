const routers = require('express');
const router = routers.Router();

const { createForm, getForm } = require('../controller');

router.post('/forms', createForm);
router.get('/forms', getForm);

module.exports = router;