import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { getCharacterList } from '../../services/rickAndMortyService';
import {
  PageContainer,
  PageHeader,
  Title,
  Subtitle,
  GridContainer,
  Card,
  CardImage,
  CardContent,
  CardTitle,
  StatusBadge,
  InfoItem,
  InfoLabel,
  InfoValue,
  FilterContainer,
  SearchBar,
  FilterRow,
  FilterLabel,
  FilterSelect,
  LoadMoreButton,
  LoadingContainer,
  ErrorContainer,
  BackButton
} from './RickAndMortyStyles';

const CharactersListPage = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  
  useEffect(() => {
    fetchCharacters();
  }, [currentPage, statusFilter, genderFilter, speciesFilter]);
  
  const fetchCharacters = async () => {
    try {
      setLoading(true);
      
      // Construir parámetros de filtro
      const params = new URLSearchParams();
      params.append('page', currentPage);
      if (statusFilter) params.append('status', statusFilter);
      if (genderFilter) params.append('gender', genderFilter);
      if (speciesFilter) params.append('species', speciesFilter);
      
      const data = await getCharacterList(currentPage);
      
      if (currentPage === 1) {
        setCharacters(data.results);
      } else {
        setCharacters(prev => [...prev, ...data.results]);
      }
      
      setInfo(data.info);
      setError(null);
    } catch (err) {
      console.error('Error fetching characters:', err);
      setError('Failed to load characters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const loadMoreCharacters = () => {
    if (info.next) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar búsqueda
    // Nota: La API de Rick and Morty no soporta búsquedas por nombre directamente en la ruta,
    // así que aquí habría que filtrar la respuesta
    fetchCharacters();
  };
  
  const filteredCharacters = characters.filter(char => 
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <PageContainer>
        <Link to="/rickandmorty">
          <BackButton
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Volver
          </BackButton>
        </Link>
        
        <PageHeader>
          <Title>Personajes de Rick and Morty</Title>
          <Subtitle>
            Explora todos los personajes del multiverso de Rick and Morty.
          </Subtitle>
        </PageHeader>
        
        <FilterContainer>
          <form onSubmit={handleSearch}>
            <SearchBar>
              <FaSearch />
              <input
                type="text"
                placeholder="Buscar personaje por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
          </form>
          
          <FilterRow>
            <div>
              <FilterLabel>Estado</FilterLabel>
              <FilterSelect 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="alive">Vivo</option>
                <option value="dead">Muerto</option>
                <option value="unknown">Desconocido</option>
              </FilterSelect>
            </div>
            
            <div>
              <FilterLabel>Género</FilterLabel>
              <FilterSelect 
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="genderless">Sin género</option>
                <option value="unknown">Desconocido</option>
              </FilterSelect>
            </div>
            
            <div>
              <FilterLabel>Especie</FilterLabel>
              <FilterSelect 
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="human">Humano</option>
                <option value="alien">Alienígena</option>
                <option value="robot">Robot</option>
                <option value="mythological">Mitológico</option>
                <option value="unknown">Desconocido</option>
              </FilterSelect>
            </div>
          </FilterRow>
        </FilterContainer>
        
        {error ? (
          <ErrorContainer>
            <h3>Error</h3>
            <p>{error}</p>
          </ErrorContainer>
        ) : (
          <>
            <GridContainer>
              <AnimatePresence>
                {filteredCharacters.map(character => (
                  <Card
                    key={character.id}
                    as={Link}
                    to={`/rickandmorty/characters/${character.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardImage>
                      <img src={character.image} alt={character.name} />
                    </CardImage>
                    <CardContent>
                      <CardTitle>{character.name}</CardTitle>
                      <StatusBadge status={character.status}>
                        {character.status}
                      </StatusBadge>
                      
                      <InfoItem>
                        <InfoLabel>Especie</InfoLabel>
                        <InfoValue>{character.species}</InfoValue>
                      </InfoItem>
                      
                      <InfoItem>
                        <InfoLabel>Origen</InfoLabel>
                        <InfoValue>{character.origin.name}</InfoValue>
                      </InfoItem>
                    </CardContent>
                  </Card>
                ))}
              </AnimatePresence>
            </GridContainer>
            
            {loading && (
              <LoadingContainer>
                <p>Cargando personajes...</p>
              </LoadingContainer>
            )}
            
            {!loading && info.next && (
              <LoadMoreButton
                onClick={loadMoreCharacters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cargar más personajes
              </LoadMoreButton>
            )}
          </>
        )}
      </PageContainer>
    </Layout>
  );
};

export default CharactersListPage;
