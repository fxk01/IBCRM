var express = require('express');
var router = express.Router();

/* 正在排版页面 */
router.get('/demo', function (req, res) {
  res.render('demo');
});

router.get('/homePage', function (req, res) {
  res.render('homePage');
});

// router.get('/manage', function (req, res) {
//   res.render('manage');
// });
module.exports = router;