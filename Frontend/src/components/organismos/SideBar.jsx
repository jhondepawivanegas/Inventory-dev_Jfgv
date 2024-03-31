import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faLocationDot, faScrewdriverWrench, faTag, faToolbox, faUser } from '@fortawesome/free-solid-svg-icons'

function SideBar() {
  return (
    <>
    <div className='w-60 pt-20 bg-greenSena h-screen flex flex-col justify-center'>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-gray-300 text-center font-semibold text-white hover:text-black'>
          <Link to={'/'} className='flex gap-2 justify-center items-center'>
            <FontAwesomeIcon icon={faHome} className='text-xl'/>
           <h2 className='font-normal text-sm'>DASHBOARD</h2>
          </Link>
          </div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-gray-300 text-center font-semibold text-white hover:text-black'>
          <Link to={'/categorias'} className='flex gap-2 justify-center items-center'>
            <FontAwesomeIcon icon={faScrewdriverWrench} className='text-xl'/>
           <h2 className='font-normal text-sm'>CATEGORÍAS</h2>
          </Link>
          </div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-gray-300 text-center font-semibold text-white hover:text-black'>
          <Link to={'/unidades'} className='flex gap-2 justify-center items-center'>
            <FontAwesomeIcon icon={faTag} className='text-xl' />
         <h2 className='font-normal text-sm'> UNIDADES</h2>
          </Link>
          </div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-gray-300 text-center font-semibold text-white hover:text-black'>
        <Link to={'/equipos'} className='flex gap-2 justify-center items-center'>
        <FontAwesomeIcon icon={faToolbox} className='text-xl' />
          <h2 className='font-normal text-sm'>EQUIPOS</h2>
          </Link>
        </div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-gray-300 text-center font-semibold text-white hover:text-black'>
        <Link to={'/ubicaciones'} className='flex gap-2 justify-center items-center'>
        <FontAwesomeIcon icon={faLocationDot} className='text-xl' />
          <h2 className='font-normal text-sm'>UBICACIONES</h2>
          </Link>
        </div>
        <div className='hover:bg-white p-2 border-b cursor-pointer border-gray-300 text-center font-semibold text-white hover:text-black'>
        <Link to={'/usuarios'} className='flex gap-2 justify-center items-center'>
        <FontAwesomeIcon icon={faUser} className='text-xl' />
          <h2 className='font-normal text-sm'>ENCARGADOS</h2>
          </Link>
        </div>
    </div>
    
    </>
  )
}

export default SideBar