import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AlbumDetail from "./components/AlbumDetail";
import ArtistDetail from "./components/ArtistDetail";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import OrderSongs from "./components/OrderSongs";
import SignUp from "./components/SignUp";
import Top5 from "./components/Top5";

const App = () => {
  

  return (
     
    <div className="App" >
      <BrowserRouter >
        <NavBar/>
           <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/top5" element={<Top5 />} />
            <Route path="/Login/" element={<Login />} />
            <Route path="/SignUp/" element={<SignUp />} />
            <Route path="/Artist/:id" element={<ArtistDetail />} />
            <Route path="/AlbumDetail/:id" element={<AlbumDetail />} />
            <Route path="/OrderSongs" element={<OrderSongs />} />
            </Routes>
       <Footer/>
    
      </BrowserRouter>
    </div>
    
   
  )
}

export default App
