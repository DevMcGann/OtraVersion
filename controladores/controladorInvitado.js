const Invitado = require("../modelos/Invitado");

//agregar
exports.nuevoInvitado = async (req, res, next) => {
  const invitado = new Invitado(req.body);

  try {
    // almacenar el registro
    await invitado.save();
    res.json({ mensaje: "Se agrego un nuevo invitado" });
  } catch (error) {
    // si hay un error, console.log y next
    res.send(error);
    next();
  }
};

// Muestra todos los invitados
exports.mostrarInvitados = async (req, res, next) => {
  try {
    const invitado = await Invitado.find({});
    res.json(invitado);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra un invitado por su ID
exports.mostrarInvitado = async (req, res, next) => {
  try {
    const invitado = await Invitado.findById(req.params.idInvitado);

    if (!invitado) {
      res.json({ mensaje: "Ese invitado no existe" });
      next();
    }
    // Mostrar el cliente
    res.json(invitado);
  } catch (error) {
    console.log(error);
    next();
  }
  const invitado = await Invitado.findById(req.params.idInvitado);

  if (!invitado) {
    res.json({ mensaje: "Ese invitado no existe" });
    next();
  }
  // Mostrar el cliente
  res.json(invitado);
};

// invitado por su ID
exports.actualizarInvitado = async (req, res, next) => {
  try {
    const invitado = await Invitado.findOneAndUpdate(
      { _id: req.params.idInvitado },
      req.body,
      {
        new: true
      }
    );
    res.json(invitado);
  } catch (error) {
    res.send(error);
    next();
  }
};

// Elimina un invitado por su ID
exports.eliminarInvitado = async (req, res, next) => {
  try {
    await Invitado.findOneAndDelete({ _id: req.params.idInvitado });
    res.json({ mensaje: "El invitado se ha eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.buscarDNI = async (req, res, next) => {
  try {
    console.log("req params  " + req.params.dni);
    const invitado = await Invitado.findOne({ dni: req.params.dni }); //ruta /invitados/:dni
    console.log("invitado  " + invitado);
    res.json(invitado);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarInvitadoporDni = async (req, res, next) => {
  try {
    const invitado = await Invitado.findOne({ dni: req.params.dni });

    if (!invitado) {
      res.json({ mensaje: "Ese invitado no existe" });
      next();
    }
    // Mostrar el cliente
    console.log("invitado " + invitado);
    res.json(invitado);
  } catch (error) {
    console.log(error);
    next();
  }
};
