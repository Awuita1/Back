var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');
var util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

// Ruta para obtener novedades
router.get('/', async function (req, res, next) {
    var articulos = await novedadesModel.getArticulo();

    articulos = articulos.map(novedad => {
        if (novedad.img_id) {
            const imagen = cloudinary.image(novedad.img_id, {
                width: 100,
                height: 100,
                crop: 'fill'
            });
            return {
                ...novedad, imagen
            }
        } else {
            return { ...novedad, imagen: '' }
        }
    });

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        articulos
    });
});

// Ruta para agregarArticuloNovedades una nueva novedad
router.get('/agregarArticuloNovedades', (req, res, next) => {
    res.render('admin/agregarArticuloNovedades', {
        layout: 'admin/layout'
    });
});

router.post('/agregarArticuloNovedades', async (req, res, next) => {
    try {
        let img_id = '';

        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.titulo && req.body.subtitulo && req.body.cuerpo) {
            await novedadesModel.insertarArticulo({
                ...req.body,
                img_id
            });
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/agregarArticuloNovedades', { 
                layout: 'admin/layout', 
                error: true, 
                message: 'Todos los campos son requeridos' 
            });
        }

    } catch (error) {
        console.log(error);
        res.render('admin/agregarArticuloNovedades', { 
            layout: 'admin/layout', 
            error: true, 
            message: 'No se cargó el artículo' 
        });
    }
});

// Ruta para eliminar una novedad
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteArticuloById(id);
    res.redirect('/admin/novedades')
});

// Ruta para modificar una novedad
router.get('/modificarArticuloNovedades/:id', async (req, res, next) => {
    let id = req.params.id;
    let articulo = await novedadesModel.getArticuloById(id);
    res.render('admin/modificarArticuloNovedades', {
        layout: 'admin/layout',
        articulo
    });
});

router.post('/modificarArticuloNovedades', async (req, res, next) => {
    try {
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;

        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            img_id = (await cloudinary.uploader.upload(imagen.tempFilePath)).public_id;
            borrar_img_vieja = true;
        }

        if (borrar_img_vieja && req.body.img_original) {
            await cloudinary.uploader.destroy(req.body.img_original);
        }

        const obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo,
            img_id
        };

        await novedadesModel.modificarArticuloById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error);
        res.render('admin/modificarArticuloNovedades', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó el artículo'
        });
    }
});

module.exports = router;