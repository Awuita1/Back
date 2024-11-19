var express = require('express');
var router = express.Router();
var staffModel = require('../../models/staffModel');  // Cambiar el modelo a staffModel
var util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

// Ruta para obtener los artículos del staff
router.get('/', async function (req, res, next) {
    var articulos = await staffModel.getArticulo();  // Usar el modelo específico de staff

    articulos = articulos.map(staff => {
        if (staff.img_id) {
            const imagen = cloudinary.image(staff.img_id, {
                width: 100,
                height: 100,
                crop: 'fill'
            });
            return {
                ...staff, imagen
            }
        } else {
            return { ...staff, imagen: '' }
        }
    });

    res.render('admin/staff', {  // Cambiar la vista a staff
        layout: 'admin/layout',
        usuario: req.session.nombre,
        articulos
    });
});

// Ruta para agregar un nuevo artículo de staff
router.get('/agregarArticuloStaff', (req, res, next) => {
    res.render('admin/agregarArticuloStaff', {
        layout: 'admin/layout'
    });
});

router.post('/agregarArticuloStaff', async (req, res, next) => {
    try {
        let img_id = '';

        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.apellido && req.body.nombre && req.body.cargo) {
            await staffModel.insertarArticulo({
                ...req.body,
                img_id
            });
            res.redirect('/admin/staff');
        } else {
            res.render('admin/agregarArticuloStaff', { 
                layout: 'admin/layout', 
                error: true, 
                message: 'Todos los campos son requeridos' 
            });
        }

    } catch (error) {
        console.log(error);
        res.render('admin/agregarArticuloStaff', { 
            layout: 'admin/layout', 
            error: true, 
            message: 'No se cargó el artículo' 
        });
    }
});

// Ruta para eliminar un artículo de staff
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await staffModel.deleteArticuloById(id);
    res.redirect('/admin/staff')
});

// Ruta para modificar un artículo de staff
router.get('/modificarArticuloStaff/:id', async (req, res, next) => {
    let id = req.params.id;
    let articulo = await staffModel.getArticuloById(id);
    res.render('admin/modificarArticuloStaff', {
        layout: 'admin/layout',
        articulo
    })
});

router.post('/modificarArticuloStaff', async (req, res, next) => {
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
            apellido: req.body.apellido,
            nombre: req.body.nombre,
            cargo: req.body.cargo,
            img_id
        };

        await staffModel.modificarArticuloById(obj, req.body.id);
        res.redirect('/admin/staff');
    } catch (error) {
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó el artículo'
        });
    }
});

module.exports = router;
