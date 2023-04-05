import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AlbumDetail from "./components/AlbumDetail";
import Home from './components/Home';
import NavBar from "./components/NavBar";

const App = () => {
  

  return (
    <>
      <BrowserRouter>
          <NavBar/>
     <Routes>

     <Route path="/" element={<Home />} />
     <Route path="/Artist/:id" element={<Home />} />
     <Route path="/AlbumDetail/:id" element={<AlbumDetail />} />
     </Routes>
    
     </BrowserRouter>
    </>
  )
}

export default App
