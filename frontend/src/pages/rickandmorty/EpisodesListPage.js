import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { getEpisodeList } from '../../services/rickAndMortyService';
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

const EpisodesListPage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchEpisodes();
  }, [currentPage]);
  
  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      const data = await getEpisodeList(currentPage);
      
      if (currentPage === 1) {
        setEpisodes(data.results);
      } else {
        setEpisodes(prev => [...prev, ...data.results]);
      }
      
      setInfo(data.info);
      setError(null);
    } catch (err) {
      console.error('Error fetching episodes:', err);
      setError('Failed to load episodes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const loadMoreEpisodes = () => {
    if (info.next) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar búsqueda por nombre
    // Filtramos localmente los resultados
  };
  
  const filteredEpisodes = episodes.filter(episode => 
    episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    episode.episode.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Helper para obtener la temporada y número de episodio en formato legible
  const parseEpisodeCode = (code) => {
    if (!code) return { season: '?', episode: '?' };
    const match = code.match(/S(\d+)E(\d+)/i);
    if (match) {
      return {
        season: match[1].padStart(2, '0'),
        episode: match[2].padStart(2, '0')
      };
    }
    return { season: '?', episode: '?' };
  };
  
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
          <Title>Episodios de Rick and Morty</Title>
          <Subtitle>
            Encuentra información sobre todos los episodios de la serie.
          </Subtitle>
        </PageHeader>
        
        <FilterContainer>
          <form onSubmit={handleSearch}>
            <SearchBar>
              <FaSearch />
              <input
                type="text"
                placeholder="Buscar episodio por nombre o código..."
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
              {filteredEpisodes.map(episode => {
                const { season, episode: episodeNum } = parseEpisodeCode(episode.episode);
                return (
                  <Card
                    key={episode.id}
                    as={Link}
                    to={`/rickandmorty/episodes/${episode.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent>
                      <CardTitle>{episode.name}</CardTitle>
                      
                      <InfoItem>
                        <InfoLabel>Código</InfoLabel>
                        <InfoValue>{episode.episode}</InfoValue>
                      </InfoItem>
                      
                      <InfoItem>
                        <InfoLabel>Temporada</InfoLabel>
                        <InfoValue>{season}</InfoValue>
                      </InfoItem>
                      
                      <InfoItem>
                        <InfoLabel>Episodio</InfoLabel>
                        <InfoValue>{episodeNum}</InfoValue>
                      </InfoItem>
                      
                      <InfoItem>
                        <InfoLabel>Fecha de emisión</InfoLabel>
                        <InfoValue>{new Date(episode.air_date).toLocaleDateString()}</InfoValue>
                      </InfoItem>
                      
                      <InfoItem>
                        <InfoLabel>Personajes</InfoLabel>
                        <InfoValue>{episode.characters.length}</InfoValue>
                      </InfoItem>
                    </CardContent>
                  </Card>
                );
              })}
            </GridContainer>
            
            {loading && (
              <LoadingContainer>
                <p>Cargando episodios...</p>
              </LoadingContainer>
            )}
            
            {!loading && info.next && (
              <LoadMoreButton
                onClick={loadMoreEpisodes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cargar más episodios
              </LoadMoreButton>
            )}
          </>
        )}
      </PageContainer>
    </Layout>
  );
};

export default EpisodesListPage;
