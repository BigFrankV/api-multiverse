import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { getLocationList } from '../../services/rickAndMortyService';
import {
  PageContainer,
  PageHeader,
  Title,
  Subtitle,
  GridContainer,
  Card,
  CardContent,
  CardTitle,
  InfoItem,
  InfoLabel,
  InfoValue,
  FilterContainer,
  SearchBar,
  LoadMoreButton,
  LoadingContainer,
  ErrorContainer,
  BackButton
} from './RickAndMortyStyles';

const LocationsListPage = () => {
  const [locations, setLocations] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchLocations();
  }, [currentPage]);
  
  const fetchLocations = async () => {
    try {
      setLoading(true);
      const data = await getLocationList(currentPage);
      
      if (currentPage === 1) {
        setLocations(data.results);
      } else {
        setLocations(prev => [...prev, ...data.results]);
      }
      
      setInfo(data.info);
      setError(null);
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError('Failed to load locations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const loadMoreLocations = () => {
    if (info.next) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar búsqueda local por nombre
  };
  
  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <Title>Ubicaciones de Rick and Morty</Title>
          <Subtitle>
            Explora los diferentes planetas, dimensiones y realidades alternativas del multiverso.
          </Subtitle>
        </PageHeader>
        
        <FilterContainer>
          <form onSubmit={handleSearch}>
            <SearchBar>
              <FaSearch />
              <input
                type="text"
                placeholder="Buscar ubicación por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
          </form>
        </FilterContainer>
        
        {error ? (
          <ErrorContainer>
            <h3>Error</h3>
            <p>{error}</p>
          </ErrorContainer>
        ) : (
          <>
            <GridContainer>
              {filteredLocations.map(location => (
                <Card
                  key={location.id}
                  as={Link}
                  to={`/rickandmorty/locations/${location.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent>
                    <CardTitle>{location.name}</CardTitle>
                    
                    <InfoItem>
                      <InfoLabel>Tipo</InfoLabel>
                      <InfoValue>{location.type}</InfoValue>
                    </InfoItem>
                    
                    <InfoItem>
                      <InfoLabel>Dimensión</InfoLabel>
                      <InfoValue>{location.dimension}</InfoValue>
                    </InfoItem>
                    
                    <InfoItem>
                      <InfoLabel>Residentes</InfoLabel>
                      <InfoValue>{location.residents.length}</InfoValue>
                    </InfoItem>
                  </CardContent>
                </Card>
              ))}
            </GridContainer>
            
            {loading && (
              <LoadingContainer>
                <p>Cargando ubicaciones...</p>
              </LoadingContainer>
            )}
            
            {!loading && info.next && (
              <LoadMoreButton
                onClick={loadMoreLocations}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cargar más ubicaciones
              </LoadMoreButton>
            )}
          </>
        )}
      </PageContainer>
    </Layout>
  );
};

export default LocationsListPage;
