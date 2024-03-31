import axios from 'axios'
import { useEffect, useState } from 'react';
import NavBar from '../organismos/NavBar';
import SideBar from '../organismos/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function EquiposTemplate() {
    //API
    const endpoint = 'http://localhost:3000/equipos';
    const [equipos, setEquipos] = useState([]);
    //listar equipos
    const showEquipos = async () => {
        try {
            const respuesta = await axios.get(`${endpoint}`);
            setEquipos(respuesta.data);
        } catch (error) {
            console.log("error al mostrar equipos", error);
        }
    };

    useEffect(() => {
        showEquipos();
        getCategoria();
        getUbicacion();
    }, []);

    // categorias
    const apiCategory = 'http://localhost:3000/categorias';
    const [categorias, setCategorias] = useState([]);
    const getCategoria = async () => {
        try {
            const respuesta = await axios.get(`${apiCategory}`);
            setCategorias(respuesta.data);
        } catch (error) {
            console.log("error al obtener categorías", error);
        }
    };

    const apiUbicacion = 'http://localhost:3000/ubicaciones';
    const [ubicaciones, setUbicaciones] = useState([]);
    const getUbicacion = async () => {
        try {
            const respuesta = await axios.get(`${apiUbicacion}`);
            setUbicaciones(respuesta.data);
        } catch (error) {
            console.log("error al obtener categorías", error);
        }
    };


    //modales
    const [isOpen, setIsOpen] = useState(false);
    //valores para el registro
    const [value, setValue] = useState({
        serial: "",
        nombre_equipo: "",
        marca_equipo: "",
        modelo_equipo: "",
        fecha_ingreso: "",
        descripcion: "",
        tipo_equipo: "",
        fk_categoria: "",
        fk_ubicacion: ""
    });
    const valorInput = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    };
    const limpiarForm = () => {
        setValue({
            serial: "",
            nombre_equipo: "",
            marca_equipo: "",
            modelo_equipo: "",
            fecha_ingreso: "",
            descripcion: "",
            tipo_equipo: "",
            estado: "",
            fk_categoria: "",
            fk_ubicacion: ""
        })
    };
    //post Equipo
    const postEquipo = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.post(endpoint, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
                limpiarForm();
            }
            setIsOpen(false);
            showEquipos();
        } catch (error) {
            console.log("error al registrar equipo", error);
        }
    };
    //modal update
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [selectID, setSelectId] = useState(null);
    //valores para la actualización
    const editValorInput = (event) => {
        setValue(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    };
    const putEquipo = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await axios.put(`${endpoint}/${selectID}`, value);
            if (respuesta.status === 200) {
                alert(respuesta.data.message);
                limpiarForm();
            }
            setIsOpenUpdate(false);
            showEquipos();
        } catch (error) {
            console.log("error al actualizar", error);
        }
    };

    //traer datos al formulario
    const getDatosForm = (equipo) => {
        const fechaFormateada = moment(equipo.fecha_ingreso).format('YYYY-MM-DD');
        setValue({
            serial: equipo.serial,
            nombre_equipo: equipo.nombre_equipo,
            marca_equipo: equipo.marca_equipo,
            modelo_equipo: equipo.modelo_equipo,
            fecha_ingreso: fechaFormateada,
            descripcion: equipo.descripcion,
            tipo_equipo: equipo.tipo_equipo,
            estado: equipo.estado,
            fk_categoria: equipo.fk_categoria,
            fk_ubicacion: equipo.fk_ubicacion
        });
        console.log(equipo.estado);
        setSelectId(equipo.id_equipo);
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
                    <div className="flex gap-3 w-full  justify-center items-center ">
                        <div className="flex flex-col w-full  p-3 pt-24 h-screen">
                            <div className="flex gap-2 justify-between w-full p-3 mt-5 mb-5">
                                <div className="flex gap-2 justify-between items-center p-2">
                                    <h2 className="font-medium">EQUIPOS</h2>
                                </div>
                                <div className="p-1 flex bg-gray-300 justify-between items-center rounded-md w-1/2">
                                    <input type="search" className="border p-1 rounded-lg bg-gray-300 outline-none border-gray-300" placeholder="Buscar equipo por ID" />
                                    <FontAwesomeIcon icon={faSearch} className="text-2xl text-gray-500" />
                                </div>
                                <button className='bg-greenSena font-semibold text-white rounded-md p-2'
                                    onClick={() => setIsOpen(true)}
                                >REGISTRAR EQUIPO</button>
                            </div>
                            <div>
                                {
                                    // si isOpen es igual a true
                                    isOpen && (
                                        <form onSubmit={postEquipo}>
                                            <div className='fixed inset-0 flex bg-black bg-opacity-50 backdrop-blur-sm justify-center items-center'>
                                                <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
                                                    <div className="flex w-full border-b-2">
                                                        <h2 className="p-1 font-semibold">REGISTRAR NUEVO EQUIPO</h2>
                                                    </div>
                                                    <div className='flex gap-5'>
                                                        <div className='flex flex-col justify-center gap-3'>
                                                            <div className='flex justify-between items-center gap-2'>
                                                                <label className='font-medium'>Serial:</label>
                                                                <input value={value.serial} onChange={valorInput} name="serial"
                                                                    className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el serial" required />
                                                            </div>
                                                            <div className='flex justify-between items-center gap-2'>
                                                                <label className='font-medium'>Nombre:</label>
                                                                <input value={value.nombre_equipo} onChange={valorInput} name="nombre_equipo"
                                                                    className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el nombre" required />
                                                            </div>
                                                            <div className='flex justify-between items-center gap-2'>
                                                                <label className='font-medium'>Marca:</label>
                                                                <input value={value.marca_equipo} onChange={valorInput} name="marca_equipo"
                                                                    className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa la marca" required />
                                                            </div>
                                                            <div className='flex justify-between items-center gap-2'>
                                                                <label className='font-medium'>Modelo:</label>
                                                                <input value={value.modelo_equipo} onChange={valorInput} name="modelo_equipo"
                                                                    className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el modelo" required />
                                                            </div>
                                                            <div className='flex justify-between items-center gap-2'>
                                                                <label className='font-medium'>Tipo:</label>
                                                                <input value={value.tipo_equipo} onChange={valorInput} name="tipo_equipo"
                                                                    className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el tipo" required />
                                                            </div>

                                                        </div>
                                                        <div className='flex flex-col gap-3 w-[400px]'>
                                                            <div className='flex justify-between items-center gap-2 '>
                                                                <label className='font-medium'>Descripción:</label>
                                                                <textarea value={value.descripcion} onChange={valorInput} name="descripcion" maxLength={250}
                                                                    className='border-gray-400 border rounded-sm p-1 w-[250px] resize-none ' type="text" placeholder="Ingresa una descripción" required />
                                                            </div>
                                                            <div className='flex justify-between items-center gap-2'>
                                                                <label className='font-medium'>Fecha de Ingreso:</label>
                                                                <input value={value.fecha_ingreso} onChange={valorInput} name="fecha_ingreso"
                                                                    className='border-gray-400 border rounded-sm p-1 w-[250px]' type="date" required />
                                                            </div>
                                                            <div className='flex justify-between items-center gap-2'>
                                                                <label className='font-medium'>Estado:</label>
                                                                <select value={value.estado} onChange={valorInput} name="estado" className='border-gray-400 border w-[250px] rounded-sm p-1' required>
                                                                    <option value="">Seleccione un estado</option>
                                                                    <option value="activo">Activo</option>
                                                                    <option value="inactivo">Inactivo</option>
                                                                    <option value="mantenimiento">Mantenimiento</option>
                                                                    <option value="excluido">Excluido</option>

                                                                </select>
                                                            </div>
                                                            <div className='flex justify-between items-center gap-2'>
                                                                <label className='font-medium'>Categoría:</label>

                                                                <select value={value.fk_categoria} onChange={valorInput} name="fk_categoria" className='border-gray-400 border rounded-sm p-1 w-[250px]' required>
                                                                    <option value="">Seleccione categoría</option>
                                                                    {categorias.map(categoria => (
                                                                        <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre_categoria}</option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className='flex justify-between items-center gap-2'>
                                                                <label className='font-medium'>Ubicación:</label>
                                                                <select value={value.fk_ubicacion} onChange={valorInput} name="fk_ubicacion" className='w-[250px] border-gray-400 border rounded-sm p-1' required>
                                                                    <option value="">Seleccione Ubicación</option>
                                                                    {ubicaciones.map(ubicacion => (
                                                                        <option key={ubicacion.id_ubicacion} value={ubicacion.id_ubicacion}>
                                                                            {ubicacion.nombre_unidad} - {ubicacion.ambiente} - {ubicacion.sitio}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-center items-center gap-2 font-bold'>
                                                        <button type="button" className='bg-red-500 p-2 hover:bg-red-700 text-white rounded-md'
                                                            onClick={() => {
                                                                setIsOpen(false);
                                                                limpiarFormulario();
                                                            }}
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
                                        <form onSubmit={putEquipo}>
                                            <div className='fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center'>
                                                <div className='bg-white p-5  rounded-md flex flex-col justify-center items-center gap-5'>
                                                    <div className="flex w-full  border-b-2">
                                                        <h2 className="p-1 font-semibold">EDITAR DATOS DEL EQUIPO</h2>
                                                    </div>
                                                    <div className='flex gap-5'>
                                                        <div className='flex flex-col justify-center gap-3'>
                                                            <div className='flex justify-between w-full items-center gap-2'>
                                                                <label className='font-medium'>Serial:</label>
                                                                <input value={value.serial} onChange={editValorInput} name="serial"
                                                                    className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el serial" required />
                                                            </div>
                                                            <div className='flex justify-between w-full items-center gap-2'>
                                                                <label className='font-medium'>Nombre:</label>
                                                                <input value={value.nombre_equipo} onChange={editValorInput} name="nombre_equipo"
                                                                    className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el nombre" required />
                                                            </div>
                                                            <div className='flex justify-between w-full items-center gap-2'>
                                                                <label className='font-medium'>Marca:</label>
                                                                <input value={value.marca_equipo} onChange={editValorInput} name="marca_equipo"
                                                                    className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa la marca" required />
                                                            </div>
                                                            <div className='flex justify-between w-full items-center gap-2'>
                                                                <label className='font-medium'>Modelo:</label>
                                                                <input value={value.modelo_equipo} onChange={editValorInput} name="modelo_equipo"
                                                                    className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el modelo" required />
                                                            </div>
                                                            <div className='flex justify-between w-full items-center gap-2'>
                                                                <label className='font-medium'>Tipo:</label>
                                                                <input value={value.tipo_equipo} onChange={editValorInput} name="tipo_equipo"
                                                                    className='border-gray-400 border rounded-sm p-1' type="text" placeholder="Ingresa el tipo" required />
                                                            </div>

                                                        </div>
                                                        <div className='flex flex-col gap-3'>
                                                            <div className='flex justify-between items-center gap-2 w-[400px]'>
                                                                <label className='font-medium'>Descripción:</label>
                                                                <textarea value={value.descripcion} onChange={editValorInput} name="descripcion"
                                                                    className='border-gray-400 border rounded-sm p-1 w-[250px]' type="text" placeholder="Ingresa una descripción" required />
                                                            </div>
                                                            <div className='flex justify-between w-full items-center gap-2'>
                                                                <label className='font-medium'>Fecha de Ingreso:</label>
                                                                <input value={value.fecha_ingreso} onChange={editValorInput} name="fecha_ingreso"
                                                                    className='border-gray-400 border rounded-sm p-1 w-[250px]' type="date" required />
                                                            </div>
                                                            <div className='flex justify-between items-center gap-2 '>
                                                                <label className='font-medium'>Estado:</label>
                                                                <select value={value.estado} onChange={editValorInput} name="estado" className='border-gray-400 border w-[250px] rounded-sm p-1' required>
                                                                    <option value="">Seleccione un estado</option>
                                                                    <option value="activo">Activo</option>
                                                                    <option value="inactivo">Inactivo</option>
                                                                    <option value="mantenimiento">Mantenimiento</option>
                                                                    <option value="excluido">Excluido</option>

                                                                </select>
                                                            </div>
                                                            <div className='flex justify-between w-full items-center gap-2'>
                                                                <label className='font-medium'>Categoría:</label>

                                                                <select value={value.fk_categoria} onChange={editValorInput} name="fk_categoria" className='border-gray-400 border w-[250px] rounded-sm p-1' required>
                                                                    <option value="">Seleccione una categoría</option>
                                                                    {categorias.map(categoria => (
                                                                        <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre_categoria}</option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className='flex justify-between w-full items-center gap-2'>
                                                                <label className='font-medium'>Ubicación:</label>
                                                                <select value={value.fk_ubicacion} onChange={editValorInput} name="fk_ubicacion" className='w-[250px] border-gray-400 border rounded-sm p-1' required >
                                                                    <option value="">Seleccione una Ubicación</option>
                                                                    {ubicaciones.map(ubicacion => (
                                                                        <option key={ubicacion.id_ubicacion} value={ubicacion.id_ubicacion}>
                                                                            {ubicacion.nombre_unidad} - {ubicacion.ambiente} - {ubicacion.sitio}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-center items-center gap-2 font-bold'>
                                                        <button type="button" className='bg-blue-500 p-2 hover:bg-blue-700 text-white rounded-md'
                                                            onClick={() => { setIsOpenUpdate(false); limpiarFormulario(); }}
                                                        >CANCELAR</button>
                                                        <button type="submit" className="bg-yellow-500 p-2 font-bold hover:bg-yellow-700 text-white rounded-md">ACTUALIZAR</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </form>

                                    )
                                }
                            </div>

                            <div className='w-full flex justify-center pl-3 pr-3'>
                                <table className='w-full bg-white rounded-xl shadow-lg '>
                                    <thead>
                                        <tr className='bg-gray-300'>
                                            <th className='p-2 font-medium text-sm'>ID</th>
                                            <th className='p-2 font-medium text-sm'>SERIAL</th>
                                            <th className='p-2 font-medium text-sm'>NOMBRE</th>
                                            <th className='p-2 font-medium text-sm'>TIPO</th>
                                            <th className='p-2 font-medium text-sm'>ESTADO</th>
                                            <th className='p-2 font-medium text-sm'>CATEGORÍA</th>
                                            <th className='p-2 font-medium text-sm'>UNIDAD PRODUCTIVA</th>
                                            <th className='p-2 font-medium text-sm'>AMBIENTE</th>
                                            <th className='p-2 font-medium text-sm'>SITIO</th>
                                            <th className='p-2 font-medium text-sm'>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            equipos.map((equipo) => (
                                                <tr key={equipo.id_equipo} className='border-b'>
                                                    <th className='p-1 font-normal'>{equipo.id_equipo}</th>
                                                    <th className='p-1 font-normal'>{equipo.serial}</th>
                                                    <th className='p-1 font-normal'>{equipo.nombre_equipo}</th>
                                                    <th className='p-1 font-normal'>{equipo.tipo_equipo}</th>
                                                    <th className='p-1 font-normal'>{equipo.estado}</th>
                                                    <th className='p-1 font-normal'>{equipo.nombre_categoria}</th>
                                                    <th className='p-1 font-normal'>{equipo.nombre_unidad}</th>
                                                    <th className='p-1 font-normal'>{equipo.ambiente}</th>
                                                    <th className='p-1 font-normal'>{equipo.sitio}</th>
                                                    <th className="p-1 font-normal">
                                                        <button className='bg-blue-500 w-20 p-1 text-white rounded-md'
                                                            onClick={() => {
                                                                getDatosForm(equipo);
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

export default EquiposTemplate