import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import MarvelComicCard from '../../components/marvel/MarvelComicCard';
import { getMarvelComics, searchMarvelComics } from '../../services/marvelService';
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
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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

const MarvelComicsPage = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMoreComics, setHasMoreComics] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadComics();
  }, []);

  const loadComics = async (reset = false) => {
    try {
      setLoading(true);
      const newOffset = reset ? 0 : offset;
      const response = await getMarvelComics(20, newOffset);
      
      if (reset) {
        setComics(response.results);
      } else {
        setComics([...comics, ...response.results]);
      }
      
      setOffset(newOffset + 20);
      setHasMoreComics(response.next);
      setLoading(false);
    } catch (error) {
      console.error('Error loading Marvel comics:', error);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      // Si la búsqueda está vacía, cargamos los cómics normales
      setOffset(0);
      setSearching(false);
      loadComics(true);
      return;
    }
    
    try {
      setLoading(true);
      setSearching(true);
      
      const results = await searchMarvelComics(searchTerm);
      setComics(results);
      setHasMoreComics(false);
      setLoading(false);
    } catch (error) {
      console.error('Error searching Marvel comics:', error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <Title>Cómics de Marvel</Title>
        <Subtitle>
          Explora una amplia colección de cómics del universo Marvel
        </Subtitle>
        
        <SearchContainer>
          <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '500px' }}>
            <SearchInput
              type="text"
              placeholder="Buscar cómics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </SearchContainer>
        
        {loading && comics.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <>
            {comics.length > 0 ? (
              <AnimatePresence>
                <Grid>
                  {comics.map((comic) => (
                    <MarvelComicCard 
                      key={comic.marvel_id} 
                      comic={comic} 
                    />
                  ))}
                </Grid>
              </AnimatePresence>
            ) : (
              <NoResults>
                No se encontraron cómics que coincidan con tu búsqueda.
              </NoResults>
            )}
            
            {!searching && hasMoreComics && (
              <LoadMoreContainer>
                <LoadMoreButton
                  onClick={() => loadComics()}
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

export default MarvelComicsPage;
