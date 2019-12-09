import React,{useState} from 'react'
import clienteAxios from '../../axios';
import './Nuevo.css'
import Swal from 'sweetalert2';
import {withRouter, Link} from 'react-router-dom';



const Nuevo = ({history}) => {

    const[invitado,guardarInvitado] = useState({
        nombre:"",
        apellido:"",
        dni:"",
        presente:false,
    

    });

    //handler de los imputs
    const actualizarState = e => {
       guardarInvitado({
           ...invitado,
           [e.target.name] : e.target.value
       }); 
    }

    //validar formulario
    const validarinvitado = () =>{
        const{nombre,apellido,dni} = invitado;

        let valido = !nombre.length || !apellido.length || !dni.length;
        return valido;
    }
    

    //manddar el submit a la API para que añada el invitado nuevo

    const agregarinvitado = e => {
        e.preventDefault();

        clienteAxios.post('/nuevo_invitado', invitado)
        .then(res => {
           if(res.data.code === 11000){
               Swal.fire({
                   type:'error',
                   title:"Hubo un error!",
                   text:"Ese DNI ya está registrado"
               }) //<--Mail ya existe 11000
           }else{
              Swal.fire(
                  'Se Agregó el nuevo invitado',
                  res.data.mensaje,
                  'success'
              );
           }
           //redirect
           history.push('/');

        });
    }



    return (
    <React.Fragment>
      <div className="logo">
        <img src={"fiesta.jpg"} alt="nick" className="logo"/>
      </div>

      <div className="contenedor-formulario">  
          <form onSubmit={agregarinvitado}>
            <legend>Llena todos los campos</legend>

            <div className="campo">
              <label>Nombre:</label>
              <input
                type="text"
                placeholder="Nombre invitado"
                name="nombre"
                onChange={actualizarState}
              />
            </div>

            <div className="campo">
              <label>Apellido:</label>
              <input
                type="text"
                placeholder="Apellido invitado"
                name="apellido"
                onChange={actualizarState}
              />
            </div>

            <div className="campo">
              <label>DNI:</label>
              <input
                type="text"
                placeholder="DNI invitado"
                name="dni"
                onChange={actualizarState}
              />
            </div>

            <div className="enviar">
              <input
                type="submit"
                className="btn btn-azul"
                value="Agregar invitado"
                disabled={validarinvitado()}
              />
            </div>
          </form>
        
          <Link to = {`/listado`} > 
          <h1>Ver Listado</h1>
          </Link>

          <Link to = {`/buscar`} > 
          <h1>Buscar DNI</h1>
          </Link>
      </div>
      </React.Fragment>
    );
}
 
export default withRouter(Nuevo);