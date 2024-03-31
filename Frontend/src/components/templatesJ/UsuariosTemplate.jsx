import React, {useState,useEffect} from 'react'
import SideBar from '../organismos/SideBar'
import NavBar from '../organismos/NavBar'
import axios from 'axios'
import Swal from 'sweetalert2';

function UsuariosTemplate() {

  const [useUsuarios,setUsuarios] = useState();

  const listarUsuarios=()=>{
    axios.get('http://localhost:3000/usuarios/listar')
    .then(response=>{
      setUsuarios(response.data);
      console.log(response.data);
    })
  }
  const registrarUsuario=()=>{
    axios.get('http://localhost:3000/usuario/listar')
    .then(response=>{
      
    }).then(()=>{
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Usuario registrado!",
        //html:"<i>El usuario <strong>"+nombre+"</strong> ha sido registrado con éxito!</i>",
        showConfirmButton: false,
        timer: 3000
      });
    })
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(()=>{
    listarUsuarios();
  },[]);


  return (
    <>
      {
        <div className='relative'>
            <div className='absolute top-0 left-0 right-0 z-50'>
                <NavBar/>
            </div>
            <div className='flex'>
            <div>
                <SideBar/>
            </div>
            {/* <div className='container flex flex-col gap-3 justify-center items-center'>
              <h1>hahah</h1>
            </div> */}
            <div style={{ position:'relative', top:'150px', width: '1050px', height: '300px' }} className='container shadow-lg p-3 mt-10 mb-3 bg-slate-300 rounded  flex flex-col gap-3 justify-center items-center'>

                     <div style={{borderBottom:'2px solid gray'}} className='flex w-full '>
                        <h3 style={{position:'relative', top:'5px'}} className='fw-bold uppercase mb-3'>Encargados</h3>
                        <div className="mb-3">
                            <input style={{position:'relative', left:'50px', width:'650px'}} type="text" className="form-control" placeholder="Buscar..." />
                        </div>
                        <button style={{position:'relative', left:'115px', bottom:'13px'}} className='btn btn-primary fw-blod' onClick={()=>{
                          toggleModal();
                        }}>Registrar usuario</button>
                     </div>
                     
                  <table className="table table-striped">
                      <thead>
                          <tr className='fw-bold'>
                            <td>ID usuario</td>
                            <td>Identificacion</td>
                            <td>Nombres</td>
                            <td>Apellidos</td>
                            <td>Telefono</td>
                            <td>Email</td>
                            <td>Rol</td>
                            <td>Unidad productiva</td>
                            <td>Opciones</td>
                          </tr>
                      </thead>
                      <tbody>
                          {
                          useUsuarios && useUsuarios.map(user=>(
                              <tr key={user.id_usuario}>
                                  <td>{user.id_usuario}</td>
                                  <td>{user.identificacion}</td>
                                  <td>{user.nombres}</td>
                                  <td>{user.apellidos}</td>
                                  <td>{user.telefono}</td>
                                  <td>{user.email}</td>
                                  <td>{user.rol}</td>
                                  <td>{user.nombre_unidad}</td>
                                  <td>
                                    <button className='btn btn-primary'>Editar</button>
                                  </td>
                                  
                              </tr>
                            ))
                          }
                      </tbody>
                  </table>
                </div>
            </div>
        </div>
      }

      

{/* <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
      </button> */}

      {isModalOpen && (
        <div  id="crud-modal" tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative  w-full max-w-md max-h-full">
        
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Registrar encargado
                </h3>
                <button onClick={toggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
          
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Identificacion</label>
                    <input type="text" name="identificacion" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese una identificacion..." required=""/>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres</label>
                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nombre..." required=""/>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                    <input type="text" name="apellidos" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un apellido..." required=""/>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" name="email" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un email..." required=""/>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
                    <input type="text" name="telefono" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un telefono..." required=""/>
                  </div>
                
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}



    </>
  )
}

export default UsuariosTemplate
