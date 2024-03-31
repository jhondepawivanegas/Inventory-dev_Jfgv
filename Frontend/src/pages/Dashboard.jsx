import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/organismos/NavBar'
import SideBar from '../components/organismos/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToolbox, faUser } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
  return (
    <>
       <div className="relative">
    <div className="absolute top-0 left-0 right-0 z-50">
        <NavBar></NavBar>
    </div>
   <div className="flex">
   <div>
    <SideBar></SideBar>
    </div>
   <div className='flex flex-col w-full  pt-24'>
      <div className='flex items-center justify-around'>
        <div className='w-48 bg-greenSena h-24 flex justify-center items-center rounded-3xl'>
         <Link to={'/usuarios'} className='flex flex-col justify-center items-center'>
          <p className='text-white'>USUARIOS</p>
          <p className='text-white'>45</p>
          <FontAwesomeIcon icon={faUser} className="text-white"/>
         </Link>
        </div>
        <div className='w-48 bg-greenSena h-24 flex justify-center items-center rounded-3xl'>
         <Link to={'/equipos'} className='flex flex-col justify-center items-center'>
          <p className='text-white'>EQUIPOS</p>
          <p className=' text-white'>45</p>
          <FontAwesomeIcon icon={faToolbox} className="text-white"/>
         </Link>
        </div>
        <div className='w-48 bg-greenSena h-24 flex justify-center items-center rounded-3xl'>
         <Link to={'/equipos'} className='flex flex-col justify-center items-center'>
          <p className='text-white text-center'>MANTENIMIENTOS TÉCNICOS</p>
          <p className='text-white'>45</p>
          <FontAwesomeIcon icon={faToolbox} className=" text-white"/>
         </Link>
        </div>
        <div className='w-48 bg-greenSena h-24 flex justify-center items-center rounded-3xl'>
         <Link to={'/equipos'} className='flex flex-col justify-center items-center'>
          <p className='text-center text-white'>MANTENIIENTOS PREVENTIVOS</p>
          <p className=' text-white'>45</p>
          <FontAwesomeIcon icon={faToolbox} className="text-white"/>
         </Link>
        </div>
       
        
      </div>

      <div className='flex flex-col gap-3 justify-around'>
        <div className=' pl-12 pt-8'>
          <h2 className='font-bold border-b pb-2'>TOTAL DE EQUIPOS POR UNIDAD PRODUCTIVA</h2>
        </div>
       <div className='flex justify-around'>
       <div className='w-48 bg-greenSena h-24 flex justify-center items-center rounded-3xl'>
         <Link to={'/equipos'} className='flex flex-col justify-center items-center'>
          <p className='text-white'>AGROINDUSTRIA</p>
          <p className='text-white'>5</p>
          <FontAwesomeIcon icon={faToolbox} className="text-white"/>
         </Link>
        </div>
        <div className='w-48 bg-greenSena h-24 flex justify-center items-center rounded-3xl'>
         <Link to={'/equipos'} className='flex flex-col justify-center items-center'>
          <p className='text-white'>GASTRONOMÍA</p>
          <p className=' text-white'>15</p>
          <FontAwesomeIcon icon={faToolbox} className="text-white"/>
         </Link>
        </div>
        <div className='w-48 bg-greenSena h-24 flex justify-center items-center rounded-3xl'>
         <Link to={'/equipos'} className='flex flex-col justify-center items-center'>
          <p className='text-white text-center'>TICS</p>
          <p className='text-white'>45</p>
          <FontAwesomeIcon icon={faToolbox} className=" text-white"/>
         </Link>
        </div>
        <div className='w-48 bg-greenSena h-24 flex justify-center items-center rounded-3xl'>
         <Link to={'/equipos'} className='flex flex-col justify-center items-center'>
          <p className='text-center text-white'>ESCUELA DEL CAFÉ</p>
          <p className=' text-white'>45</p>
          <FontAwesomeIcon icon={faToolbox} className="text-white"/>
         </Link>
        </div>
       </div>
      </div>
   </div>
   </div>
   </div>
      
    </>
  )
}

export default Dashboard