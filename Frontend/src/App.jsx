import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UsuariosTemplate from './components/templatesSantiago/UsuariosTemplate';
import EquiposTemplate from './components/templates/EquiposTemplate';
import CategoriasTemplate from './components/templates/CategoriasTemplate';
import UbicacionesTemplate from './components/templates/UbicacionesTemplate';
import PruebasTemplate from './components/templates/PruebasTemplate';
import UnidadesTemplate from './components/templates/UnidadesTemplate';

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<Dashboard/>}/>
       <Route path='/usuarios' element={<UsuariosTemplate/>}/> 
      <Route path='/equipos' element={<EquiposTemplate/>}/>
      <Route path='/categorias' element={<CategoriasTemplate/>}/>
      <Route path='/ubicaciones' element={<UbicacionesTemplate/>}/>
      <Route path='/pruebas' element={<PruebasTemplate/>}/>
      <Route path='/unidades' element={<UnidadesTemplate/>}/>
       </Routes>
       </BrowserRouter>
    </>
  )
}
export default App
