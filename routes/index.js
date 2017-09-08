var express = require('express');
var router = express.Router();
var demoRouter = require('./demo');
const mockRouter = require('./mock');

//mock data
router.use(mockRouter);

// 配置子路由
router.use(demoRouter);

/* GET home page. */
router.get('**', function(req, res, next) {
	res.render('crm');
});

module.exports = router;
