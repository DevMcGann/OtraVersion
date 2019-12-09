import React from "react";

import './invitado.css'
import Swal from "sweetalert2";
import clienteAxios from "../../axios";

function Invitado({ invitado }) {
  const { _id, nombre, apellido, dni } = invitado;

  //eliminar cliente
  const eliminarInvitado = idInvitado => {
    Swal.fire({
      title: "Estas seguro que deseas eliminar?",
      text: "No podrás revertir esta acción",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        clienteAxios.delete(`/invitados/${idInvitado}`).then(res => {
          Swal.fire("Eliminado!", res.data.mensaje, "success");
        });
      }
    });
  };

  const editarPresente = async idInvitado => {
    let seleccionado = {
      nombre: invitado.nombre,
      apellido: invitado.apellido,
      dni: invitado.dni,
      presente: true
    };

    alert(JSON.stringify(seleccionado));

    await clienteAxios.delete(`/invitados/${idInvitado}`);

    await clienteAxios.post("/nuevo_invitado", seleccionado);
  };

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          {nombre} {apellido}
        </p>
        <p className="dni">{dni}</p>
      </div>
      <div className="acciones" style={{ backgroundColor:  invitado.presente ? "green" : "red" }}>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarInvitado(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Invitado
        </button>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => editarPresente(_id)}
        >
          <i className="fas fa-times"></i>
          {invitado.presente ? "Presente" : "Ausente"}
        </button>
      </div>
    </li>
  );
}

export default Invitado;
