var express = require('express'),
    app = express(),
    server = require('http').createServer(app).listen(4555),
    io = require('socket.io').listen(server),
    bodyParser = require('body-parser'),
    sequelize = require('sequelize');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Port / Router
var port = process.env.PORT || 8080;
var router = express.Router();

//Internet connection flag
var conn = null;

/* Socket */
var server = function (req, res, next) {

    //Verify internet connection
    require('dns').resolve('www.google.com', function (err) {
        if (err) {
            conn = false;
        }
        else {
            conn = true;
        }
    });

    var notificar = req.query.notificacao || '';

    if (conn) {
        io.emit('notificacao', notificar);
        next();
    }

    return;
}


//Injeção de middleware em rota
app.use(server);
app.use('/alchemistAppServer', router);

router.route('/notificar').get(function (req, res) {
    //TODO - Iniciar banco de dados

    //aqui vamos receber a mensagem
    res.json({ message: "Você tem uma notificação!" })
})

app.listen(port);
console.log('conectado a porta ' + port);
