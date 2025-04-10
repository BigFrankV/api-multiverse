import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { FaArrowLeft, FaCalendarAlt, FaUserAlt } from 'react-icons/fa';
import { getEpisodeDetails } from '../../services/rickAndMortyService';
import {
  PageContainer,
  BackButton,
  DetailContainer,
  DetailInfoSection,
  DetailTitle,
  DetailInfoGrid,
  DetailInfoCard,
  InfoLabel,
  InfoValue,
  SectionTitle,
  TabContainer,
  TabButtons,
  TabButton,
  TabContent,
  RelatedItemsGrid,
  RelatedItemCard,
  RelatedItemTitle,
  LoadingContainer,
  ErrorContainer
} from './RickAndMortyStyles';

const EpisodeDetailPage = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  
  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        setLoading(true);
        const data = await getEpisodeDetails(id);
        setEpisode(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching episode ${id}:`, err);
        setError('Failed to load episode details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEpisodeData();
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <LoadingContainer>
          <p>Cargando detalles del episodio...</p>
        </LoadingContainer>
      </Layout>
    );
  }
  
  if (error || !episode) {
    return (
      <Layout>
        <PageContainer>
          <Link to="/rickandmorty/episodes">
            <BackButton>
              <FaArrowLeft /> Volver a episodios
            </BackButton>
          </Link>
          
          <ErrorContainer>
            <h3>Error</h3>
            <p>{error || 'Episode not found'}</p>
          </ErrorContainer>
        </PageContainer>
      </Layout>
    );
  }
  
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
  
  const { season, episode: episodeNum } = parseEpisodeCode(episode.episode);
  
  return (
    <Layout>
      <PageContainer>
        <Link to="/rickandmorty/episodes">
          <BackButton
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Volver a episodios
          </BackButton>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DetailContainer>
            <DetailInfoSection style={{ flex: 1 }}>
              <DetailTitle>{episode.name}</DetailTitle>
              
              <DetailInfoGrid>
                <DetailInfoCard>
                  <InfoLabel>Código</InfoLabel>
                  <InfoValue>{episode.episode}</InfoValue>
                </DetailInfoCard>
                
                <DetailInfoCard>
                  <InfoLabel>Temporada</InfoLabel>
                  <InfoValue>{season}</InfoValue>
                </DetailInfoCard>
                
                <DetailInfoCard>
                  <InfoLabel>Episodio</InfoLabel>
                  <InfoValue>{episodeNum}</InfoValue>
                </DetailInfoCard>
                
                <DetailInfoCard>
                  <InfoLabel>Fecha de emisión</InfoLabel>
                  <InfoValue>{new Date(episode.air_date).toLocaleDateString()}</InfoValue>
                </DetailInfoCard>
                
                <DetailInfoCard>
                  <InfoLabel>Personajes</InfoLabel>
                  <InfoValue>{episode.characters.length}</InfoValue>
                </DetailInfoCard>
              </DetailInfoGrid>
            </DetailInfoSection>
          </DetailContainer>
          
          <TabContainer>
            <TabButtons>
              <TabButton
                active={activeTab === 'info'}
                onClick={() => setActiveTab('info')}
              >
                Información
              </TabButton>
              <TabButton
                active={activeTab === 'characters'}
                onClick={() => setActiveTab('characters')}
              >
                Personajes ({episode.characters.length})
              </TabButton>
            </TabButtons>
            
            <TabContent>
              {activeTab === 'info' && (
                <div>
                  <SectionTitle>Detalles del episodio</SectionTitle>
                  <p>
                    <strong>{episode.name}</strong> es el episodio {episodeNum} de la temporada {season} de Rick and Morty.
                    Fue emitido originalmente el {new Date(episode.air_date).toLocaleDateString()} y cuenta con la 
                    aparición de {episode.characters.length} personajes.
                  </p>
                  
                  <SectionTitle>Información adicional</SectionTitle>
                  <RelatedItemsGrid>
                    <RelatedItemCard>
                      <FaCalendarAlt style={{ marginRight: '8px', color: '#97ce4c' }} />
                      <InfoLabel>Fecha de emisión</InfoLabel>
                      <RelatedItemTitle>{new Date(episode.air_date).toLocaleDateString()}</RelatedItemTitle>
                    </RelatedItemCard>
                  </RelatedItemsGrid>
                </div>
              )}
              
              {activeTab === 'characters' && (
                <div>
                  <SectionTitle>Personajes que aparecen en el episodio</SectionTitle>
                  {episode.characters.length > 0 ? (
                    <RelatedItemsGrid>
                      {episode.characters.slice(0, 12).map((characterUrl, index) => {
                        const characterId = characterUrl.split('/').pop();
                        return (
                          <RelatedItemCard key={characterId} as={Link} to={`/rickandmorty/characters/${characterId}`}>
                            <FaUserAlt style={{ marginRight: '8px', color: '#97ce4c' }} />
                            <InfoLabel>Personaje</InfoLabel>
                            <RelatedItemTitle>Personaje #{characterId}</RelatedItemTitle>
                          </RelatedItemCard>
                        );
                      })}
                    </RelatedItemsGrid>
                  ) : (
                    <p>No hay información sobre los personajes de este episodio.</p>
                  )}
                  
                  {episode.characters.length > 12 && (
                    <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                      Mostrando 12 de {episode.characters.length} personajes
                    </p>
                  )}
                </div>
              )}
            </TabContent>
          </TabContainer>
        </motion.div>
      </PageContainer>
    </Layout>
  );
};

export default EpisodeDetailPage;
