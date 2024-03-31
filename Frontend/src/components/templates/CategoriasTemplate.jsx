import axios from "axios"
import { useEffect, useState } from "react";
import SideBar from "../organismos/SideBar";
import NavBar from "../organismos/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


function CategoriasTemplate() {

    const endpoint = 'http://localhost:3000/categorias';
    const [categorias, setCategorias] = useState([]);

  
    //listar categorias
    const getCategorias = async () => {
        try {
            const respuesta = await axios.get(`${endpoint}`);
            setCategorias(respuesta.data);
            
        } catch (error) {
            console.log("error al listar categorias", error);
        }
    };

    useEffect(()=>{
        getCategorias();
    }, []);
    

    //Modal Registro
    const [isOpen, setIsOpen] = useState(false);
    //valores para el registro
    const [value, setValue] = useState({
        nombre_categoria: ""
    });
    const valorInput = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    };
    const limpiarForm = ()  => {
        setValue({
            nombre_categoria: ""
        })
    };
    //función POST
    const postCategoria = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.post(endpoint, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
                limpiarForm();
            }
            setIsOpen(false);
            getCategorias();
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
    const putCategoria = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.put(`${endpoint}/${selectID}`, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
                limpiarForm();
            }
            setIsOpenUpdate(false);
            getCategorias();
        } catch (error) {
            console.log("error al actualizar", error);
        }
    };
    //traer datos por ID
    const editCategoria = (categoria) => {
        setValue({
          nombre_categoria: categoria.nombre_categoria,
        });
        setSelectId(categoria.id_categoria);
        setIsOpenUpdate(true);
      };

      const limpiarFormulario = () => {
        limpiarForm();
        setSelectId(null);
      };

      //buscar categoría por ID
      const [searchId, setSearchId] = useState("");
      const handleChange = (event) => {
        setSearchId(event.target.value);
      };
      const handleSearch = () => {
        getCategoriaById(searchId);
      };
   
      const getCategoriaById = async () => {
        try {
            const respuesta = await axios.get(`${endpoint}/${searchId}`);
           console.log(respuesta);
        } catch (error) {
            console.log("error al buscar categoría", error);
        }
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
    <div className="flex gap-3 w-full  justify-center items-center ">
    <div className="flex flex-col w-full  p-3 pt-24 h-screen">
    <div className="flex gap-2 justify-between w-full p-3 mt-5 mb-5">
                <div className="flex gap-2 justify-between items-center p-2">
                    <h2 className="font-medium">CATEGORÍAS</h2>
                </div>
                <div className="p-1 flex bg-gray-300 justify-between items-center rounded-md w-1/2">
                <input type="search"  value={searchId} onChange={handleChange} 
                 className="border p-1 rounded-lg bg-gray-300 outline-none border-gray-300" placeholder="Buscar categoría por ID" />
               <FontAwesomeIcon icon={faSearch} onClick={handleSearch}   className="text-2xl text-gray-500" />
            
                    </div>
                <button 
                className='bg-greenSena font-semibold text-white rounded-md p-2'
    onClick={()=>setIsOpen(true)}
    >REGISTRAR CATEGORÍA</button>
            </div>
            
        <div>
        

   {
    //si isOpen es igual a true
    isOpen && (
        <form onSubmit={postCategoria}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
           
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
            <div className="flex w-full border-b-2">
                <h2 className="p-1 font-semibold">REGISTRAR NUEVA CATEGORÍA</h2>
            </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-medium'>Nombre Categoría:</label>
                    <input value={value.nombre_categoria} onChange={valorInput} name="nombre_categoria"
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
        <form onSubmit={putCategoria}>
        <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
            <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
            <div className="flex w-full border-b-2">
                <h2 className="p-1 font-semibold">EDITAR DATOS DE CATEGORÍA</h2>
            </div>
                <div className='flex justify-center items-center gap-2'>
                    <label className='font-medium'>Nombre Categoría:</label>
                    <input value={value.nombre_categoria} onChange={editValorInput} name="nombre_categoria"
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
        <div className="w-full flex justify-center pr-3 pl-3 ">
            <table className="w-full bg-white rounded-xl shadow-lg">
                <thead> 
                    <tr className='bg-gray-300'>
                        <th className="p-2 font-medium text-sm">ID</th>
                        <th className="p-2 font-medium text-sm">NOMBRE</th>
                        <th className="p-2 font-medium text-sm">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map((categoria) => (
                            <tr key={categoria.id_categoria} className='border-b'>
                                <th className="p-1 font-normal">{categoria.id_categoria}</th>
                                <th className="p-1 font-normal">{categoria.nombre_categoria}</th>
                                <th className="p-1 font-normal">
                                <button className='bg-blue-500 font-normal w-20 p-1 text-white rounded-md'
                                onClick={()=>{   
                                 editCategoria(categoria);
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

export default CategoriasTemplate