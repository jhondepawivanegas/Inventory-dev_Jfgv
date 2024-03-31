import React, { useState } from 'react';

function PruebasTemplate() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className='bg-green-500 text-white rounded-md'
        onClick={() => setIsOpen(true)}
      >OPEN L</button>

      {
        isOpen && (
          <div className='fixed inset-0 flex bg-gray-900 bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-gray-100 p-5  rounded-md flex flex-col justify-center items-center gap-5'>
              <div className='flex justify-center items-center gap-2'>
                <label className='font-bold'>Nombre:</label>
                <input className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Nombre" />
              </div>
              <div className='flex justify-center items-center gap-2'>
                <label className='font-bold' >Apellido:</label>
                <input className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Apellido" />
              </div>
              <div>
                <button className='bg-blue-500 p-2 hover:bg-blue-700 text-white rounded-md'
                  onClick={() => setIsOpen(false)}
                >CLOSE </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default PruebasTemplate;
