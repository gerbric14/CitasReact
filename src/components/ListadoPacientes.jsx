import Paciente from "./Paciente"


const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {


  return (
    <div className='md:w-1/2 lg:w-3/5 mr-4 md:h-screen overflow-y-scroll'>

      {pacientes && pacientes.length ? (
        <>
          <h2 className='font-black text-3xl text-center'>Listado Pacientes</h2>

          <p className='text-lg mt-5 text-center mb-7'>Administra tus  {''}
            <span className='text-indigo-600 font-bold'>pacientes y citas</span>
          </p>

          {pacientes.map(paciente => (
            <Paciente
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            />
          ))}
        </>
      ) : (
          <>
            <h2 className='font-black text-3xl text-center'>No Hay Pacientes</h2>

            <p className='text-lg mt-5 text-center mb-7'>Comienza agregando pacientes y {''}
              <span className='text-indigo-600 font-bold'>apareceran en el listado</span>
            </p>
          </>

      )}

    </div>
  )
}

export default ListadoPacientes