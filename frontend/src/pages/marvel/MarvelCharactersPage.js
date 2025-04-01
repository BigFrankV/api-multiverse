import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import MarvelCharacterCard from '../../components/marvel/MarvelCharacterCard';
import { getMarvelCharacters, searchMarvelCharacters } from '../../services/marvelService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
  text-align: center;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  padding: 1rem 1.5rem;
  border-radius: 50px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
  max-width: 500px;
  box-shadow: var(--box-shadow);
  
  &:focus {
    outline: none;
    border-color: #e23636;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const LoadMoreButton = styled(motion.button)`
  background-color: #e23636;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  
  &:hover {
    background-color: #d32f2f;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
  font-size: 1.2rem;
`;

const MarvelCharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMoreCharacters, setHasMoreCharacters] = useState(true);
  const [searching, setSearching] = useState(false);
  const [totalCharacters, setTotalCharacters] = useState(0);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async (reset = false) => {
    try {
      setLoading(true);
      const newOffset = reset ? 0 : offset;
      const response = await getMarvelCharacters(20, newOffset);
      
      if (reset) {
        setCharacters(response.results);
      } else {
        setCharacters([...characters, ...response.results]);
      }
      
      setOffset(newOffset + 20);
      setHasMoreCharacters(response.next);
      setTotalCharacters(response.count);
      setLoading(false);
    } catch (error) {
      console.error('Error loading Marvel characters:', error);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      // Si la búsqueda está vacía, cargamos los personajes normales
      setOffset(0);
      setSearching(false);
      loadCharacters(true);
      return;
    }
    
    try {
      setLoading(true);
      setSearching(true);
      
      const results = await searchMarvelCharacters(searchTerm);
      setCharacters(results);
      setHasMoreCharacters(false);
      setLoading(false);
    } catch (error) {
      console.error('Error searching Marvel characters:', error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <Title>Personajes de Marvel</Title>
        <Subtitle>
          Explora el vasto universo de personajes de Marvel Comics
        </Subtitle>
        
        <SearchContainer>
          <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '500px' }}>
            <SearchInput
              type="text"
              placeholder="Buscar personajes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </SearchContainer>
        
        {loading && characters.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <>
            {characters.length > 0 ? (
              <AnimatePresence>
                <Grid>
                  {characters.map((character) => (
                    <MarvelCharacterCard 
                      key={character.marvel_id} 
                      character={character} 
                    />
                  ))}
                </Grid>
              </AnimatePresence>
            ) : (
              <NoResults>
                No se encontraron personajes que coincidan con tu búsqueda.
              </NoResults>
            )}
            
            {!searching && hasMoreCharacters && (
              <LoadMoreContainer>
                <LoadMoreButton
                  onClick={() => loadCharacters()}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? 'Cargando...' : 'Cargar Más'}
                </LoadMoreButton>
              </LoadMoreContainer>
            )}
          </>
        )}
      </Container>
    </Layout>
  );
};

export default MarvelCharactersPage;
