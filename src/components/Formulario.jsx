import {useState, useEffect} from 'react'
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])


  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    //VALIDACION DEL FORMULARIO
    if([nombre, propietario, email, fecha, sintomas].includes('') ){
      console.log('Hay al meno sun campo vacios');
      setError(true)
      return;
    }
    setError(false);

    //CONSTRUIR OBJETO PACIENTE
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
      
    }

    if(paciente.id){
      //EDITANDO EL REGISTRO
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados);
      setPaciente({});

    }else{
      //NUEVO REGISTRO
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    //REINICIAR VALORES DEL FORMULARIO
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }


  return (
    <div className='md:w-1/2 lg:w-2/5 ml-4 mx-5'>

        <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

        <p className='text-lg mt-5 text-center mb-7'>Agregar paciente y {''}
          <span className='text-indigo-600 font-bold'>administralo</span>
        </p>

        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>

          {error && <Error mensaje='Todos los campos son obligatorios' /> }
          <div className='mb-5'>
            <label htmlFor='mascota' className='block text-gray-700 font-bold uppercase'>Nombre Mascota</label>
            <input type="text"
              id='mascota' 
              placeholder='Nombre de la mascota'
              className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
              value={nombre}
              onChange={ (e) => setNombre(e.target.value) }
              />
          </div>

          <div className='mb-5'>
            <label htmlFor='propietario' className='block text-gray-700 font-bold uppercase'>Nombre Propietario</label>
            <input type="text"
              id='propietario' 
              placeholder='Nombre del propietario'
              className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
              value={propietario}
              onChange={ (e) => setPropietario(e.target.value) }
              />
          </div>

          <div className='mb-5'>
            <label htmlFor='email' className='block text-gray-700 font-bold uppercase'>Email</label>
            <input type="email"
              id='email' 
              placeholder='Email del propietario'
              className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
              />
          </div>

          <div className='mb-5'>
            <label htmlFor='alta' className='block text-gray-700 font-bold uppercase'>Alta</label>
            <input type="date"
              id='alta' 
              className='border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md'
              value={fecha}
              onChange={ (e) => setFecha(e.target.value) }
              />
          </div>

          <div className='mb-5'>
            <label htmlFor='sintomas' className='block text-gray-700 font-bold uppercase'>Sintomas</label>
            <textarea id='sintomas' 
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              placeholder='Describe los sintomas' 
              value={sintomas}
              onChange={ (e) => setSintomas(e.target.value) }
              />
          </div>

          <input type="submit" 
            className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 
              cursor-pointer transition-all'
            value={ paciente.id ? 'Editar PAciente ':'Agregar Paciente'}
            />
        </form>
    </div>
  )
}

export default Formulario