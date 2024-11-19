var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function (req, res, next) {
    res.render('admin/index',{
        layout: 
            'admin/layout'

    }); // Renderiza una vista llamada index.hbs
    /*res.render('admin/login', {
        layout: 'admin/layout'
    });*/
});

module.exports = router;