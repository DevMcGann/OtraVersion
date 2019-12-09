import React, {useState, useEffect} from 'react';
import clienteAxios from '../../axios';
import './buscar.css'

const Buscar = () => {

    const [buscarDni, setBuscarDni] = useState("")
    const [invitado, setInvitado] = useState({})
    const [invitados, setInvitados] = useState([])
    


    //query a la api
    const consultarAPI = async () =>{
        const invitadosConsulta = await clienteAxios.get('/invitados')  
        setInvitados(invitadosConsulta.data);
    }
    useEffect( ()=>{
        consultarAPI();
    }, [invitados]);  //cuando invitados cambie, vuelve a ejecutar consultarAPI
    


    

    // cuando apreta Buscar
    const buscarInvitado = e => {
        e.preventDefault();
        let filtrado = invitados.filter(function (uninvitado){
            return uninvitado.dni === buscarDni
        })
        setInvitado(filtrado[0]) 
    }

    //eliminar o marcar presente
    const eliminarInvitado = idInvitado => {
          clienteAxios.delete(`/invitados/${idInvitado}`)
         
    };


    const editarPresente = async idInvitado => {
      let seleccionado = {
        nombre: invitado.nombre,
        apellido: invitado.apellido,
        dni: invitado.dni,
        presente: true
      };
      await clienteAxios.delete(`/invitados/${idInvitado}`);
      await clienteAxios.post("/nuevo_invitado", seleccionado);
      
    };






    return (  
        <div className="contenedor">
            <h1>Buscar Invitado por DNI</h1>
            <div className="contenedor-formulario">  
          <form onSubmit={buscarInvitado}>
            <legend>Llena todos los campos</legend>

            <div className="campo">
              <label>Nombre:</label>
              <input
                type="text"
                placeholder="Ingrese DNI"
                value={buscarDni}
                onChange={e => setBuscarDni(e.target.value)}/>
            </div>
          </form>
          </div>

            <div className="resultado-busqueda">
                <p>{invitado.nombre ?  invitado.nombre : "nombre" } - {invitado.apellido ? invitado.apellido : "apellido"}</p>
                <h3>{invitado ?  invitado.dni : "Dni"}</h3>
                <div className="botonera" style={{ backgroundColor:  invitado.presente ? "green" : "red" }} >
                <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarInvitado(invitado._id)}>
          Eliminar Invitado
        </button>


        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
           onClick={() => editarPresente(invitado._id)}
        >
          
          {invitado.presente ? "Presente" : "Ausente"}
                 </button>           
                </div>
            </div>
        </div>
    );
}
 
export default Buscar;