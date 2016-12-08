module.exports = function (app) {
    var _base = "http://localhost:3000";
    var mongoose = require('mongoose');
    var Mesa = require('../modelos/mesa.js');
    var formidable = require('formidable');

    //GET - Obtener todas las mesas de la colecccion mesas de la BBDD
    ObtenerMesas = function (req, res) {
        Mesa.find(function (err, mesas) {
            if (err) res.send(500, err.message);

            console.log('GET /mesas');
            res.status(200).jsonp(mesas);
        });
    };

    //variables para operar con ficheros
    var fs = require('fs');
    var imagen;
    //PUT- Funcion para subir la foto al servidor
    uploadimage = function (req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log(files);
            var tmp_path = files.file.path;
            var tipo = files.file.type;//tipo del archivo

            if (tipo == 'image/png' || tipo == 'image/jpg' || tipo == 'image/jpeg') {
                //Si es de tipo png jpg o jpeg
                var aleatorio = Math.floor((Math.random() * 9999) + 1);//Variable aleatoria
                filename = aleatorio + "" + files.file.name;//nombre del archivo mas variable aleatoria

                var target_path = './public/images/' + filename;// hacia donde subiremos nuestro archivo dentro de nuestro servidor
                fs.rename(tmp_path, target_path, function (err) {//Escribimos el archivo
                    fs.unlink(tmp_path, function (err) {//borramos el archivo tmp
                        //damos una respuesta al cliente
                        console.log('<p>Imagen subida OK</p></br><img  src="./images/' + filename + '"/>');
                    });

                });
                console.log(req.params.mesa);
                Mesa.findOne({nombre: req.params.mesa}, function (err, mesa) {
                    imagen ="/images/" + filename;
                    mesa.urlfoto = imagen;

                    mesa.save(function (err) {
                        if (err) return res.send(500, err.message);
                        res.status(200).jsonp(mesa);
                    });
                });

            } else {
                console.log('Tipo de archivo imagen no soportada');
            }

            if (err) {
                console.error(err.message);
                return;
            }


        });

    };

    //POST - Agregar mesa
    CrearMesa = function (req, res, next) {
        var mesa = new Mesa(req.body);

        mesa.save(function (err, mesa) {
            if (err) {
                return next(err)
            }
            res.json(mesa);
            console.log('POST /mesa/' + req.body.mesa);
        })
    };

    //GET - Obtner mesa a partir de el ID
    ObtenerMesaporID = function (req, res) {
        Mesa.findById(req.params.id, function (err, mesa) {
            if (err) return res.send(500, err.message);

            console.log('GET /mesa/' + req.params.id);
            res.status(200).jsonp(mesa);
        });
    };

    //PUT Modificar datos de un mesa existente por ID
    ModificarMesa = function (req, res) {
        Mesa.findById(req.params.id, function (err, mesa) {
            console.log('PUT');
            console.log(req.body);
            mesa.localizacion = req.body.localizacion,
                mesa.nombre = req.body.nombre,
                mesa.urlfoto = req.body.urlfoto,

                mesa.save(function (err) {
                    if (err) return res.send(500, err.message);
                    res.status(200).jsonp(mesa);
                });
        });
    };

    //DELETE - Eliminar mesa v2
    EliminarMesaporID = function (req, res) {
        console.log('DELETE mesa');
        console.log(req.params.id);
        Mesa.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.send(err)
            }
            res.json({message: 'Mesa eliminada correctamente'});
        })
    };

    //GET Obtener todas las mesas de la colecccion mesas paginado
    ObtenerMesasP = function (req, res) {
        console.log('post /obtenermesasP');
        var sort;
        var sortObject = {};
        var count = req.query.count || 5;
        var page = req.query.page || 1;

        var filter = {
            filters: {
                mandatory: {
                    contains: req.query.filter
                }
            }
        };
        var pagination = {
            start: (page - 1) * count,
            count: count
        };

        if (req.query.sorting) {
            var sortKey = Object.keys(req.query.sorting)[0];
            var sortValue = req.query.sorting[sortKey];
            sortObject[sortValue] = sortKey;
        }
        else {
            sortObject.desc = '_id';
        }

        sort = {
            sort: sortObject
        };

        Mesa
            .find()
            .filter(filter)
            .order(sort)
            .page(pagination, function (err, mesas) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(mesas);
                }
            });

    };

    //ENDPOINTS
    app.post('/mesa/CrearMesa', CrearMesa);
    app.get('/mesa/ObtenerMesas', ObtenerMesas);
    app.get('/mesa/ObtenerMesasPaginadas', ObtenerMesasP);
    app.get('/mesa/ObtenerMesaporID/:id', ObtenerMesaporID);
    app.put('/mesa/ModificarMesa/:id', ModificarMesa);
    app.delete('/mesa/EliminarMesaporID/:id', EliminarMesaporID);
    app.put('/mesa/upload/:mesa', uploadimage);
}
