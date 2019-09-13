'use strict'

const express 		= require('express')
const bodyParser 	= require('body-parser')
const path 			= require('path')
const logger 		= require('morgan')

const session = require("express-session")
const cookieParser 	= require('cookie-parser')
const FileStore = require('session-file-store')(session)

const http 				= require('http');
const io 				= require('./libs/io');

const app = express();


//Declaracion de archivos de rutas
const rutas = require('./routes/index');
const secure = require('./routes/secure');
const empresa = require('./routes/empresa');
const granja = require('./routes/granja');
const perfil = require('./routes/perfil');
const usuario = require('./routes/usuario');
const detallePerfil = require('./routes/detallePerfil');
const permiso = require('./routes/permiso');
const cliente = require('./routes/cliente');
const vendedor = require('./routes/vendedor');
const ruta = require('./routes/ruta');
const correlativo = require('./routes/correlativo');
const puntodeVenta = require('./routes/puntodeVenta');
const bodega = require('./routes/bodega');
const producto = require('./routes/producto');
const familia = require('./routes/familia');
const detalleRuta = require('./routes/detalleRuta');
const selectorRuta = require('./routes/selectorRuta');
const webMovil = require('./routes/webServicemovil');
const inventario = require('./routes/inventario');
const grupo = require('./routes/grupo');
const opcionesgrupo = require('./routes/opcionesgrupo');
const selectorGrupo = require('./routes/selectorGrupo');
const proveedor = require('./routes/proveedor');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express configuration
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	resave: true, 
	store: new FileStore({
	}),
	saveUninitialized: true, 
	secret: 'T!v!4pp-appName', 
	cookie: { maxAge: (1000*60*60*24*6) }
}));
app.use(express.static(path.join(__dirname, '../server/public')))
//USADOS PARA PERMITOR EL CROSS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
})
// API routes
app.use('/', rutas)
app.use('/post', secure)
app.use('/empresa', empresa)
app.use('/granja', granja)
app.use('/perfil', perfil)
app.use('/usuario', usuario)
app.use('/detallePerfil', detallePerfil)
app.use('/permiso', permiso)
app.use('/cliente', cliente)
app.use('/vendedor', vendedor)
app.use('/ruta', ruta)
app.use('/correlativo', correlativo)
app.use('/puntodeVenta', puntodeVenta)
app.use('/bodega', bodega)
app.use('/producto', producto)
app.use('/familia', familia)
app.use('/detalleRuta', detalleRuta)
app.use('/selectorRuta', selectorRuta)
app.use('/webMovil', webMovil)
app.use('/inventario',inventario)
app.use('/grupo',grupo)
app.use('/opcionesgrupo',opcionesgrupo)
app.use('/selectorGrupo',selectorGrupo)
app.use('/proveedor',proveedor)



app.use((req, res, next)=>{
	// cargando el SocketIO al request
	//req.session.login
	// if (!req.session.SessionStatus) {
	// 	req.session.SessionStatus = 'logged';
	// 	req.session.save();
	// }
	req.io = io;
	next();
});
function inisocket() {
	io.use(function(socket, next) {
		return next();
		// try {
		// 	let data = socket.handshake || socket.request;
		// 	if (data.headers.host && (data.headers.host == 'localhost:32100' || data.headers.host == '127.0.0.1:32100')) {
		// 		return next();
		// 	};
		// 	console.log("new Socket0");
		// 	console.log(data.headers.host);
		// 	if (! data.headers.cookie) {
		// 		return next(new Error('Missing cookie headers'));
		// 	};

		// } catch (err) {
		// 	console.error(err.stack);
		// 	next(new Error('Internal server error'));
		// }
	});
}

// Fallback to index.html
// app.get('*', (req, res, next) => {
// 	if (req.accepts('html')) {
// 		res.sendFile(path.join(__dirname, 'public', 'index.html'))
// 	} else {
// 		next()
// 	}
// })

// Run the server
// app.listen(32100, () => console.log('Express running on port 32100'))
// io.attach(app);


var port = process.env.PORT || 32100
let server = http.createServer(app);
server.listen(port, () => console.log('Express running on port ' + port ));






// app.listen(port, function() {
//     console.log("Express running on port " + port);
// });



io.attach(server);
//io.attach(sever);
inisocket();





//app.listen(32100, () => console.log('Express running on port 32100'))