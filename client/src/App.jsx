import { Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Home from "./components/home/Home.jsx";
import Login from "./components/login/login.jsx";
import Register from "./components/register/Register.jsx";
import GameCreate from "./components/game-create/GameCreate.jsx";
import GameEdit from "./components/game-edit/GameEdit.jsx";
import GameDetails from "./components/game-details/GameDetails.jsx";
import Catalogue from "./components/catalog/Catalog.jsx";

function App() {
  return (
    <div id="box">
      
      <Header />

      {/* Main Content */}
      <main id="main-content">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/games/create" element={<GameCreate />}/>
        <Route path="/games/edit" element={<GameEdit />}/>
        <Route path="/games/details" element={<GameDetails />}/>
        <Route path="/games" element={<Catalogue />}/>
      </Routes>
      </main>      
    </div>
  );
}

export default App;
