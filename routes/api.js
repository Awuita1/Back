var express = require('express');
var router = express.Router();
var bibliotecaModel = require('./../models/bibliotecaModel');
var novedadesModel = require('./../models/novedadesModel');
var staffModel = require('./../models/staffModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require("nodemailer");

/* Carga el contenido de Biblioteca */
router.get('/biblioteca', async function(req, res, next) {
    let biblioteca = await bibliotecaModel.getArticulo();

    biblioteca = biblioteca.map(biblioteca => {
        if(biblioteca.img_id){
            const imagen = cloudinary.url(biblioteca.img_id, {
                width: 960,
                height: 200,
                crop: 'fill'
            });
            return {
                ...biblioteca,
                imagen
            }
        } else {
            return{
                ...biblioteca,
                imagen: ''
            }
        }
    });
    res.json(biblioteca)
});

/* Carga el contenido de Novedades */
router.get('/novedades', async function(req, res, next) {
    let novedades = await novedadesModel.getArticulo();

    novedades = novedades.map(novedades => {
        if(novedades.img_id){
            const imagen = cloudinary.url(novedades.img_id, {
                width: 960,
                height: 200,
                crop: 'fill'
            });
            return {
                ...novedades,
                imagen
            }
        } else {
            return{
                ...novedades,
                imagen: ''
            }
        }
    });
    res.json(novedades)
});

/* Carga el contenido de Staff */
router.get('/staff', async function(req, res, next) {
    let staff = await staffModel.getArticulo();

    staff = staff.map(staff => {
        if(staff.img_id){
            const imagen = cloudinary.url(staff.img_id, {
                width: 960,
                height: 200,
                crop: 'fill'
            });
            return {
                ...staff,
                imagen
            }
        } else {
            return{
                ...staff,
                imagen: ''
            }
        }
    });
    res.json(staff)
});

/* Contacto */
router.post('/contacto', async (req, res) =>{
    const mail = {
        to: "franagus370@gmail.com",
        subject: "Contacto web",
        html: `${req.body.nombre} se contacto a traves de la web y quiere mas informacion a este correo: ${req.body.email} <br> Ademas, hizo el siguiente comentario. ${req.body.mensaje} <br> Su tel es: ${req.body.telefono}`
    }
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail);

    res.status(201).json({
        error: false,
        message: "Mensaje enviado"
    });
})


module.exports = router; 