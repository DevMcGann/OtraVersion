const express = require('express');
const router = express.Router();

const controladorInvitado = require('../controladores/controladorInvitado');


module.exports = function() {
    
    // Agrega nuevos clientes via POST
    router.post('/nuevo_invitado',
    controladorInvitado.nuevoInvitado 
    );

    // Obtener todos los clientes
    router.get('/invitados', 
    controladorInvitado.mostrarInvitados
    );
    

    // Muestra un cliente en especifico (ID)
    router.get('/invitados/:idInvitado', 
    controladorInvitado.mostrarInvitado );

    // Actualizar Cliente
    router.put('/invitados/:idInvitado', 
    controladorInvitado.actualizarInvitado);

    // Eliminar Cliente
    router.delete('/invitados/:idInvitado', 
    controladorInvitado.eliminarInvitado);

    //buscarDNI
    router.get('/invitados/buscar/:dni', 
    controladorInvitado.buscarDNI);

    return router;

}