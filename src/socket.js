let io;

module.exports = {
    init(server){
        io = require('socket.io').listen(server);
     },
     
     emit(event){
        // Emit the event to all connected clients 
         io.emit(event);
     }
};