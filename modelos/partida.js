var mongoose = require('mongoose');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var Usuario = new Schema(
    {
        _id: {type: Schema.ObjectId, ref: 'Usuario'},
        login: {type: String},
        juegosganados: {type: Number, default: 0},
        puntuacion: {type: Number, default:0}
    });
var partidaEsquema = new Schema(
    {
        IDmesa: {type: Schema.ObjectId, ref: 'Mesa'},
        FechaPartida: {type: String},
        P1:  {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //08:00-09:00                      estadopartida = 1:partida sin invitado,
        P2:  {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //09:00-10:00                                      2:partida cerrada,
        P3:  {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //10:00-11:00                                      3:partida pendiente de puntuar,
        P4:  {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //11:00-12:00                                      4:partida puntuada.
        P5:  {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //12:00-13:00
        P6:  {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //13:00-14:00
        P7:  {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //14:00-15:00
        P8:  {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //15:00-16:00
        P9:  {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //16:00-17:00
        P10: {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //17:00-18:00
        P11: {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //18:00-19:00
        P12: {creador: Usuario, invitado: Usuario, estadopartida:{type: Number, default: 0}}, //19:00-20:00
        created: {type: Date, default: Date.now}
    });
module.exports = mongoose.model('Partida', partidaEsquema);

