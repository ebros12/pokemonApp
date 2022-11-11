
import { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';


import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';


const FavoritesPage  = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
      setFavoritePokemons(localFavorites.pokemons());
  }, []);
  
  return (
    <Layout title='Pokemons - Favoritos'>

      {
        favoritePokemons.length === 0
        ? (<NoFavorites />)
        : (<FavoritePokemons pokemons={favoritePokemons} /> )
      }
      
    </Layout>
  )
};

export default FavoritesPage;
