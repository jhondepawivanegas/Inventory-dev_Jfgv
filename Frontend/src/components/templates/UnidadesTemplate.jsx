import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../organismos/NavBar';
import SideBar from '../organismos/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function UnidadesTemplate() {

    const endpoint = 'http://localhost:3000/unidades';
    const [unidades, setUnidades] = useState([]);
    //listar categorias
    const getUnidades = async () => {
        try {
            const respuesta = await axios.get(`${endpoint}`);
            setUnidades(respuesta.data);
        } catch (error) {
            console.log("error al listar unidades", error);
        }
    };

    useEffect(()=>{
        getUnidades();
    }, []);
    
   
    //Modal Registro
    const [isOpen, setIsOpen] = useState(false);
    //valores para el registro
    const [value, setValue] = useState({
        nombre_unidad: ""
    });
    const valorInput = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    };

    const limpiarForm = ()  => {
        setValue({
            nombre_unidad: ""
        })
    };
    //función POST
    const postUnidad = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.post(endpoint, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
                limpiarForm();
            }
            setIsOpen(false);
            getUnidades();
        } catch (error) {
            console.log("error al registrar", error);
        }
    };

    //modal update
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [selectID, setSelectId] = useState(null);
    //valores para la actualización
    const editValorInput = (event) => {
        setValue(prevState =>({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    };
    const putUnidad = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.put(`${endpoint}/${selectID}`, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
                limpiarForm();
            }
            setIsOpenUpdate(false);
            getUnidades();
        } catch (error) {
            console.log("error al actualizar", error);
        }
    };
    //traer datos por ID
    const editUnidad = (unidad) => {
        setValue({
          nombre_unidad: unidad.nombre_unidad,
        });
        setSelectId(unidad.id_unidad);
        setIsOpenUpdate(true);
      };

      const limpiarFormulario = () => {
        limpiarForm();
        setSelectId(null);
      };
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
    <div className="flex gap-3 w-full justify-center items-center ">
    <div className="flex flex-col w-full  p-3 pt-24 h-screen">
    <div className="flex gap-2 justify-between w-full p-3 mt-5 mb-5">
                <div className="flex gap-2 justify-between items-center p-2">
                    <h2 className="font-medium">UNIDADES PRODUCTIVAS</h2>
                </div>
                <div className="p-1 flex bg-gray-300 justify-between items-center rounded-md w-1/2">
                <input type="search" className="border p-1 rounded-lg bg-gray-300 outline-none border-gray-300" placeholder="Buscar categoría por ID" />
                <FontAwesomeIcon icon={faSearch} className="text-2xl text-gray-500" />
                    </div>
                <button className='bg-greenSena font-semibold text-white rounded-md p-2'
    onClick={()=>setIsOpen(true)}
    >REGISTRAR UNIDAD</button>
            </div>
            
        <div>
        

   {
    //si isOpen es igual a true
    isOpen && (
        <form onSubmit={postUnidad}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
            
            <div className="flex w-full border-b-2">
                <h2 className="p-1 font-semibold">REGISTRAR NUEVA UNIDAD PRODUCTIVA</h2>
            </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-medium'>Nombre Unidad:</label>
                    <input value={value.nombre_unidad} onChange={valorInput} name="nombre_unidad"
                        className='border-gray-400 border outline-none rounded-sm p-1' type="text" placeholder="Ingresa el Nombre" required />
                </div>
                <div className='flex justify-center items-center gap-2 font-bold'>
                    <button type="button" className='bg-red-500 p-2 hover:bg-red-700 text-white rounded-md'
                        onClick={() => {setIsOpen(false);
                        limpiarFormulario();}}
                    >CANCELAR</button>
                    <button type="submit" className="bg-green-500 p-2 font-bold hover:bg-green-700 text-white rounded-md">REGISTRAR</button>
                </div>
            </div>
        </div>
    </form>
    
    )
   }
   {
    //si isOpen es igual a true
    isOpenUpdate && (
        <form onSubmit={putUnidad}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
            <div className="flex w-full border-b-2">
                <h2 className="p-1 font-semibold">EDITAR DATOS DE LA UNIDAD</h2>
            </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-medium'>Nombre Unidad:</label>
                    <input value={value.nombre_unidad} onChange={editValorInput} name="nombre_unidad"
                        className='border-gray-400 border outline-none rounded-sm p-1' type="text" placeholder="Ingresa el Nombre" required />
                </div>
                <div className='flex justify-center items-center gap-2 font-bold'>
                    <button type="button" className='bg-red-500 p-2 hover:bg-red-700 text-white rounded-md'
                        onClick={() => {setIsOpenUpdate(false);
                        limpiarFormulario();}}
                    >CANCELAR</button>
                    <button type="submit" className="bg-green-500 p-2 font-bold hover:bg-green-700 text-white rounded-md">ACTUALIZAR</button>
                </div>
            </div>
        </div>
    </form>
    
    )
   }
        </div>
        <div className="w-full flex justify-center pl-3 pr-3 ">
            <table className="w-full bg-white rounded-xl shadow-lg">
                <thead> 
                    <tr className='bg-gray-300'>
                        <th className="p-2 text-sm font-medium">ID</th>
                        <th className="p-2 text-sm font-medium">UNIDAD  PRODUCTIVA</th>
                        <th className="p-2 text-sm font-medium">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        unidades.map((unidad) => (
                            <tr key={unidad.id_unidad} className='border-b'>
                                <th className="p-1 font-normal">{unidad.id_unidad}</th>
                                <th className="p-1 font-normal">{unidad.nombre_unidad}</th>
                                <th className="p-1 font-normal">
                                <button className='bg-blue-500 w-20 p-1 text-white rounded-md'
                                onClick={()=>{   
                                 editUnidad(unidad);
                                }}
                                  >EDIT</button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    </div>
   </div>
   </div>
    </>
  )
}

export default UnidadesTemplate
