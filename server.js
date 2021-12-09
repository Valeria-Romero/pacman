const { Socket } = require('engine.io');
const express = require('express');
const app = express();

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use(express.static(__dirname + "/static"));

//----------------------------------------------------------------------------
app.get('/', function( request, response ){
	response.render( 'index' ); 
});
//----------------------------------------------------------------------------
const server = app.listen(8080, function(){
    console.log('Server with socket.io')
})

let prev = []

const io = require('socket.io')(server)

io.on("connection", function (socket) {
    console.log("Someone connected!");
    socket.emit('display', prev);
    
    socket.on("information", function (info) {
        prev.push(info);
        io.sockets.emit('msj', info);
    });
});





