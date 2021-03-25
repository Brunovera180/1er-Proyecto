import React, { Fragment , useState} from 'react';
import {v4 as uuid} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

  //Crear State de Citas
  const [cita, actualizarCita] = useState ({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });

const [error, actualizarError] = useState (false)

//Funcion que se ejecuta cada vez que el usuario escribe en el input
const actualizarState = e => {
  actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
  })
}

const { mascota, propietario, fecha, hora, sintomas} = cita;

    //cuando el usuario precione agregara cita
    const submitCita = e => {
      e.preventDefault();


        // Validar
        if ( mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' ||
        hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        //Eliminar mensaje previo
        actualizarError(false)

        // Asignar id
        cita.id = uuid();
        console.log(cita);

        // Crear una Cita
        crearCita(cita);

        // Reiniciar form
        actualizarCita({
          mascota: '',
          propietario: '',
          fecha: '',
          hora: '',
          sintomas: ''
        })

    }

  return (
    <Fragment>
      <h2> Crear Citas </h2>

      { error ?  <p className='alerta-error'> Se requiere completar todos los campos</p>
      : null }

      <form
              onSubmit={submitCita}
      >

            <label> Nombre Mascota </label>
            <input
                  type="text"
                  name="mascota"
                  className="u-full-width"
                  placeholder="Nombre Mascota"
                  onChange={actualizarState}
                  value = {mascota}
            />

            <label> Nombre Dueño </label>
            <input
                  type="text"
                  name="propietario"
                  className="u-full-width"
                  placeholder="Nombre Dueño de la mascota"
                  onChange={actualizarState}
                  value = {propietario}
            />

            <label> Fecha </label>
            <input
                  type="date"
                  name="fecha"
                  className="u-full-width"
                  onChange={actualizarState}
                  value = {fecha}
            />

            <label> Hora </label>
            <input
                  type="time"
                  name="hora"
                  className="u-full-width"
                  onChange={actualizarState}
                  value = {hora}
            />

            <label> Sintomas </label>
            <textarea
                name="sintomas"
                className="u-full-width"
                onChange={actualizarState}
                value = {sintomas}
            ></textarea>

            <button
                tipe="submit"
                className="u-full-width button-primary"
            >Agregar Cita </button>
        </form>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
