import { useState, useEffect } from "react"
import Error from "./Error"
const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const[nombre, setNombre] = useState('')
  const[propietario, setPropietario] = useState('')
  const[email, setEmail] = useState('')
  const[fecha, setFecha] = useState('')
  const[sintomas, setSintomas] = useState('');
  const[error, setError]=useState(false)

    useEffect(() => {
      if (Object.keys(paciente).length > 0) {
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
          
      }
  
    }, [paciente])

  //Validacion del formulario
  const handleSubmit = (event) =>{
    event.preventDefault()
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      
     setError(true)
    return;
  }
  
  setError(false)  
    
  const generarId = () =>{
    const random= Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }

// Objeto de paciente
  const objetoPaciente ={
    nombre, 
    propietario, 
    email, 
    fecha, 
    sintomas
        
  }

  if (paciente.id) {
    //Editando el registro
    objetoPaciente.id = paciente.id

    const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ?objetoPaciente : pacienteState)
    setPacientes(pacientesActualizados)
    setPaciente({})
    
  }else{
    objetoPaciente.id = generarId()
    setPacientes([...pacientes,objetoPaciente])
  }

  
  //reiniciar el form
  setEmail('')
  setNombre('')
  setPropietario('')
  setFecha('')
  setSintomas('')
}
  return (
    
    <div className="md:w-1/2 lg:w-3/5">
    <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
    <p className='text-lg mt-5 text-center mb-10'>
      Añade Pacientes y {' '}
      <span className='text-indigo-500 font-bold text-lg'>Administralos</span>
    </p>

    <form 
    
    onSubmit={handleSubmit}
    className='bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5'>
      
      {error && <Error mensaje='Todos los campos son obligatorios' />}
      
      <div className='mb-5'>  
        
        <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
        
        <input 
        id="mascota"
        type="text" 
        placeholder="Nombre de la Mascota"
        className='border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md outline-none '
        value={nombre}
        onChange= {(event)=>setNombre(event.target.value)}// EventListener de React
        />
      </div>
      
      <div className='mb-5'>  
        
        <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
        
        <input 
        id="propietario"
        type="text" 
        placeholder="Nombre del Propietario"
        className='border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md outline-none'
        value={propietario}
        onChange= {(event)=>setPropietario(event.target.value)}
        />
      </div>
      
      <div className='mb-5'>  
        
        <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email Propietario</label>
        
        <input 
        id="email"
        type="email" 
        placeholder="Email del Propietario"
        className='border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md outline-none'
        value={email}
        onChange= {(event)=>setEmail(event.target.value)}
        />
      </div>
      
      <div className='mb-5'>  
        <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
        
        <input 
        id="alta"
        type="date" 
        className='border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md outline-none'
        value={fecha}
        onChange= {(event)=>setFecha(event.target.value)}
        />
      </div>
      
      <div className='mb-5'>  
        <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
          Sintomas
        </label>
        
        <textarea id="sintomas" cols="5" rows="5" placeholder="Describe los sintomas"
        className='border-2 w-full p-2 mt-2 placeholder-gray-700 outline-none rounded-md'
        value={sintomas}
        onChange= {(event)=>setSintomas(event.target.value)}>  
        </textarea>
      </div>
        
        <input
        type='submit'
        className='bg-indigo-600 w-full p-5 text-white uppercase rounded-md font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
        value = {paciente.id ? 'Editar Paciente':'Agregar Paciente'}
        />
    </form>
    
    </div>
  )
    
}

export default Formulario