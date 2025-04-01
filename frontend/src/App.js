import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';

// Páginas existentes
import HomePage from './pages/HomePage';
import PokemonListPage from './pages/pokemon/PokemonListPage';
import PokemonDetailPage from './pages/pokemon/PokemonDetailPage';

// Páginas de Marvel
import MarvelPage from './pages/marvel/MarvelPage';
import MarvelCharactersPage from './pages/marvel/MarvelCharactersPage';
import MarvelCharacterDetailPage from './pages/marvel/MarvelCharacterDetailPage';
import MarvelComicsPage from './pages/marvel/MarvelComicsPage';
import MarvelComicDetailPage from './pages/marvel/MarvelComicDetailPage';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        {/* Rutas existentes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon" element={<PokemonListPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
        
        {/* Rutas de Marvel */}
        <Route path="/marvel" element={<MarvelPage />} />
        <Route path="/marvel/characters" element={<MarvelCharactersPage />} />
        <Route path="/marvel/characters/:id" element={<MarvelCharacterDetailPage />} />
        <Route path="/marvel/comics" element={<MarvelComicsPage />} />
        <Route path="/marvel/comics/:id" element={<MarvelComicDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
