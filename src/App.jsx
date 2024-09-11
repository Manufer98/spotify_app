import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AlbumDetail from "./components/AlbumDetail";
import ArtistDiscography from "./components/ArtistDiscography/ArtistDiscography";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NavBar from "./components/Navbar/NavBar";
import OrderSongs from "./components/OrderSongs";
import SignUp from "./components/Login/SignUp";
import Top5 from "./components/Top5/Top5";
import React from "react";
import ArtistDetailDiscography from "./components/ArtistDetaitDiscography";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top5" element={<Top5 />} />
          <Route path="/Login/" element={<Login />} />
          <Route path="/SignUp/" element={<SignUp />} />
          <Route path="/Artist/:id" element={<ArtistDiscography />} />
          <Route path="/Edit/:id" element={<ArtistDiscography />} />
          <Route path="/AlbumDetail/:id" element={<AlbumDetail />} />
          <Route path="/OrderSongs" element={<OrderSongs />} />
          <Route
            path="/ArtistDetail/:id"
            element={<ArtistDetailDiscography />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
