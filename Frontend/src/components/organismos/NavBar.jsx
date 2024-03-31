import React from 'react'
import logoSena from '../../assets/logoSena/logoSena.png'
import logoInventory from '../../assets/logoSena/inventoryview.png'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


function NavBar() {
  return (
    <>
    <div className='w-full h-20 bg-white shadow shadow-greenSena flex justify-between'>
      <div className='flex justify-center items-center' >
        <img src={logoSena} alt="logo" className='w-32'/>
      </div>
      <div className='flex gap-5 items-center'>
      <img src={logoInventory} alt="logo" className='w-20'/>
      <h1 className='font-bold text-3xl'>INVENTORY</h1>
      </div>
      <div className='flex items-center w-24 justify-center'>
        <FontAwesomeIcon icon={faBars} className='text-3xl' />
      </div>
    </div>
    </>
  )
}

export default NavBar