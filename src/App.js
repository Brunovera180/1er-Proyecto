import React, { Fragment, useState, useEffect} from 'react';
import Formulario from './componentes/formulario';
import Cita from './componentes/Cita';

function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Areglo de Citas
  const [citas, guradarCitas] = useState (citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
      if(citasIniciales){
        localStorage.setItem('citas', JSON.stringify(citas));
      } else {
        localStorage.setItem('citas', JSON.stringify([]));
      }
  }, [citas] );

  // Funcion que tome las citas actuales y agregue la nueva.
  const crearCita = cita => {
    guradarCitas([...citas,cita]);
  }

  // Funcion que elimina una cita por su ID
  const eliminarCita = id => {
      const nuevaCitas = citas.filter(cita => cita.id !== id);
      guradarCitas(nuevaCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay cictas' : 'Admininstra tus Citas';

  return(
    <Fragment>
      <h1> Administrador de Pacientes </h1>

    <div className="container">
        <div className="row">
              <div className="one-half column">
              <Formulario
              crearCita={crearCita}
              />
          </div>
          <div className="one-half column">
                <h2> {titulo} </h2>
                {citas.map(cita => (
                  <Cita
                    key={cita.id}
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />
                ))}
          </div>
        </div>
      </div>


    </Fragment>
  )

}
export default App;
