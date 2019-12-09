import React,{useEffect,useState} from 'react';
import './Invitados.css';
import clienteAxios from '../../axios';
import Invitado from './Invitado';




function Invitados(){

    //State
    const [invitados,guardarInvitados] = useState([]);

    //query a la api
    const consultarAPI = async () =>{
        const invitadosConsulta = await clienteAxios.get('/invitados')  
        guardarInvitados(invitadosConsulta.data);
    }

    useEffect( ()=>{
        consultarAPI();
    }, [invitados]);  //cuando invitados cambie, vuelve a ejecutar consultarAPI


       

    return(
        <div className="listado"> 
            <h2>Invitados a la Fiesta de Siglo</h2>

      

            <ul className="lista">
                {invitados.map(invitado => ( 
                    <Invitado
                        key ={invitado._id}
                        invitado={invitado}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Invitados;