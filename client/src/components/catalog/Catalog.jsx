import { useEffect, useState } from "react";
import gameService from "../../services/gameService.js";
import CatalogItem from "./catalog-item/CatalogItem.jsx";
import { useGames } from "../../api/gameApi.js";

export default function Catalogue() {
  
  const { games } = useGames();

  return (
    <section id="catalog-page">
    <h1>All Games</h1>
    
    {games.length > 0 
      ? games.map(game => <CatalogItem key={game._id} {...game}/>)
      : <h3 className="no-articles">No articles yet</h3>
    }
  </section>
   );
}