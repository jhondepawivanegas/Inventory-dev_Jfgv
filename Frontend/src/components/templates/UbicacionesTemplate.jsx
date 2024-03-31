import axios from "axios"
import { useState, useEffect} from "react";
import SideBar from "../organismos/SideBar";
import NavBar from "../organismos/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function UbicacionesTemplate() {

    const endpoint = 'http://localhost:3000/ubicaciones';
    const [ubicaciones, setUbicaciones] = useState([]);
    const getUbicaciones = async() => {
        try {
            const respuesta = await axios.get(`${endpoint}`);
            setUbicaciones(respuesta.data);
        } catch (error) {
            console.log("error al listar las ubicaciones", error);
        }
    };
    useEffect(() => {
        getUbicaciones();
        getUnidades();
    },[]);

    const apiUnidades = 'http://localhost:3000/unidades';
    const [unidades, setUnidades] = useState([]);
    const getUnidades = async () => {
        try {
            const respuesta = await axios.get(`${apiUnidades}`);
            if (respuesta.status === 200) {
                setUnidades(respuesta.data);
            }
        } catch (error) {
            console.log("error al buscar unidades", error);
        }
    };
    //modal registro
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState({
        fk_unidad_productiva: "",
        ambiente: "",
        sitio: ""
    });
    const valorInput = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    };
    const limpiarForm = ()  => {
        setValue({
            fk_unidad_productiva: "",
            ambiente: "",
            sitio: ""
        })
    };
    const postUbicacion = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.post(endpoint, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
                limpiarForm();
            }
            setIsOpen(false);
            getUbicaciones();
        } catch (error) {
            console.log("error al registrar", error);
        }
    };

    //modal update
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [selectID, setSelectId] = useState(null);
    const editValorInput = (event) => {
        setValue(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }; 

    const putUbicacion = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.put(`${endpoint}/${selectID}`, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
                limpiarForm();
            }
            setIsOpenUpdate(false);
            getUbicaciones();
        } catch (error) {
            console.log("error al actualizar", error);
        }
    };

    //traer datos en el formulario
    const getDatosForm  = (ubicacion) => {
        setValue({
            fk_unidad_productiva: ubicacion.fk_unidad_productiva,
            ambiente: ubicacion.ambiente,
            sitio: ubicacion.sitio
        });
        setSelectId(ubicacion.id_ubicacion);
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
                    <h2 className="font-medium">UBICACIONES</h2>
                </div>
                <div className="p-1 flex bg-gray-300 justify-between items-center rounded-md w-1/2">
                <input type="search" className="border p-1 rounded-lg bg-gray-300 outline-none border-gray-300" placeholder="Buscar categoría por ID" />
                <FontAwesomeIcon icon={faSearch} className="text-2xl text-gray-500" />
                    </div>
                <button className='bg-greenSena font-semibold text-white rounded-md p-2'
    onClick={()=>setIsOpen(true)}
    >REGISTRAR UBICACIÓN</button>
            </div>
            
        <div>
        

   {
    //si isOpen es igual a true
    isOpen && (
        <form onSubmit={postUbicacion}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
            <div className="flex w-full border-b-2">
                <h2 className="p-1 font-semibold">REGISTRAR NUEVA UBICACIÓN</h2>
            </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-medium'>Unidad Productiva:</label>
                    <select value={value.fk_unidad_productiva} onChange={valorInput} name="fk_unidad_productiva"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="I" required >
                            <option value="">Selecciona Unidad Productiva</option>
                            {
                                unidades.map((unidades) => (
                                    <option key={unidades.id_unidad} value={unidades.id_unidad} >{unidades.nombre_unidad}</option>
                                ))
                            }
                            </select>
                </div>
                <div className='flex items-center justify-between gap-2 w-full'>
                    <label className='font-medium '>Ambiente:</label>
                    <input value={value.ambiente} onChange={valorInput} name="ambiente"
                        className='border-gray-400 border w-60  rounded-sm p-1' type="text" placeholder="Ingresa el nombre del ambiente" required />
                </div>
                <div className='flex justify-between w-full items-center gap-2'>
                    <label className='font-medium'>Sitio:</label>
                    <input value={value.sitio} onChange={valorInput} name="sitio"
                        className='border-gray-400 border w-60 rounded-sm p-1' type="text" placeholder="Ingresa el Nombre del sitio" required />
                </div>
                <div className='flex justify-center items-center gap-2 font-bold'>
                    <button type="button" className='bg-red-500 p-2 hover:bg-red-700 text-white rounded-md'
                        onClick={() =>{ 
                            setIsOpen(false);
                        limpiarFormulario()}}
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
        <form onSubmit={putUbicacion}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
            <div className="flex w-full border-b-2">
                <h2 className="p-1 font-semibold">EDITAR DATOS DE UBICACIÓN</h2>
            </div>
            <div className='flex justify-center items-center gap-2'>
                    <label className='font-medium'>Unidad Productiva:</label>
                    <select value={value.fk_unidad_productiva} onChange={editValorInput} name="fk_unidad_productiva"
                        className='border-gray-400 border rounded-sm p-1' type="text" placeholder="I" required >
                            <option value="">Selecciona Unidad Productiva</option>
                            {
                                unidades.map((unidades) => (
                                    <option key={unidades.id_unidad} value={unidades.id_unidad} >{unidades.nombre_unidad}</option>
                                ))
                            }
                            </select>
                </div>
                <div className='flex justify-between w-full items-center gap-2'>
                    <label className='font-medium'>Ambiente:</label>
                    <input value={value.ambiente} onChange={editValorInput} name="ambiente"
                        className='border-gray-400 border w-60 rounded-sm p-1' type="text" placeholder="Ingresa el nombre del ambiente" required />
                </div>
                <div className='flex justify-between w-full items-center gap-2'>
                    <label className='font-medium'>Sitio:</label>
                    <input value={value.sitio} onChange={editValorInput} name="sitio"
                        className='border-gray-400 border w-60 rounded-sm p-1' type="text" placeholder="Ingresa el Nombre del sitio" required />
                </div>
                <div className='flex justify-center items-center gap-2 font-bold'>
                    <button type="button" className='bg-red-500 p-2 hover:bg-red-700 text-white rounded-md'
                        onClick={() => {setIsOpenUpdate(false);
                        limpiarFormulario();}}
                    >CANCELAR</button>
                    <button type="submit" className="bg-green-500 p-2 font-bold hover:bg-green-700 text-white rounded-md" >ACTUALIZAR</button>
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
                        <th className="p-2 font-medium text-sm">ID</th>
                        <th className="p-2 font-medium text-sm">UNIDAD PRODUCTIVA</th>
                        <th className="p-2 font-medium text-sm">AMBIENTE</th>
                        <th className="p-2 font-medium text-sm">SITIO</th>
                        <th className="p-2 font-medium text-sm">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ubicaciones.map((ubicacion) => (
                            <tr key={ubicacion.id_ubicacion} className='border-b'>
                                <th className="p-1 font-normal">{ubicacion.id_ubicacion}</th>
                                <th className="p-1 font-normal">{ubicacion.nombre_unidad}</th>
                                <th className="p-1 font-normal">{ubicacion.ambiente}</th>
                                <th className="p-1 font-normal">{ubicacion.sitio}</th>
                                <th className="p-1 font-normal">
                                <button className='bg-blue-500 p-1 w-20 text-white rounded-md'
                                onClick={()=>{
                                   getDatosForm(ubicacion);
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

export default UbicacionesTemplate