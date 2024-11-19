var express = require('express');
var router = express.Router();
var bibliotecaModel = require('../../models/bibliotecaModel');
var util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload)
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {
    var articulos = await bibliotecaModel.getArticulo();

    articulos = articulos.map(biblioteca => {
        if (biblioteca.img_id) {
            const imagen = cloudinary.image(biblioteca.img_id, {
                width: 100,
                height: 100,
                crop: 'fill'
            });
            return {
                ...biblioteca, imagen
            }
        } else {
            return { ...biblioteca, imagen: '' }
        }
    });

    res.render('admin/biblioteca', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        articulos
    });
});

router.get('/agregarArticuloBiblioteca', (req, res, next) => {
    res.render('admin/agregarArticuloBiblioteca', {
        layout: 'admin/layout'
    });
});

router.post('/agregarArticuloBiblioteca', async (req, res, next) => {
    try {
        let img_id = '';

        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.titulo && req.body.subtitulo && req.body.descripcion) {
            await bibliotecaModel.insertarArticulo({
                ...req.body,
                img_id
            });
            res.redirect('/admin/biblioteca');
        } else {
            res.render('admin/agregarArticuloBiblioteca', { 
                layout: 'admin/layout', 
                error: true, 
                message: 'Todos los campos son requeridos' 
            });
        }

    } catch (error) {
        console.log(error);
        res.render('admin/agregarArticuloBiblioteca', { 
            layout: 'admin/layout', 
            error: true, 
            message: 'No se cargó el articulo' 
        });
    }
});


router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await bibliotecaModel.deleteArticuloById(id);
    res.redirect('/admin/biblioteca')
});

router.get('/modificarArticuloBiblioteca/:id', async (req, res, next) => {
    let id = req.params.id;

    let articulo = await bibliotecaModel.getArticuloById(id);
    res.render('admin/modificarArticuloBiblioteca', {
        layout: 'admin/layout',
        articulo
    })
});

router.post('/modificarArticuloBiblioteca', async (req, res, next) => { 
    try {
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;

        // Comprobamos si se debe borrar la imagen actual
        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else if (req.files && req.files.imagen) {
            // Subimos la nueva imagen a Cloudinary
            const imagen = req.files.imagen;
            img_id = (await cloudinary.uploader.upload(imagen.tempFilePath)).public_id;
            borrar_img_vieja = true;
        }

        // Borramos la imagen vieja en Cloudinary si es necesario
        if (borrar_img_vieja && req.body.img_original) {
            await cloudinary.uploader.destroy(req.body.img_original);
        }

        // Objeto de datos para actualizar
        const obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            descripcion: req.body.descripcion,
            img_id
        };

        // Llamada al modelo para modificarArticuloBiblioteca el artículo
        await bibliotecaModel.modificarArticuloById(obj, req.body.id);
        res.redirect('/admin/biblioteca');
    } catch (error) {
        console.log(error);
        res.render('admin/modificarArticuloBiblioteca', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó el artículo'
        });
    }
});


module.exports = router;