import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { FaArrowLeft, FaHome, FaMapMarkerAlt, FaVideo } from 'react-icons/fa';
import { getCharacterDetails } from '../../services/rickAndMortyService';
import {
  PageContainer,
  BackButton,
  DetailContainer,
  DetailImageSection,
  DetailImage,
  DetailInfoSection,
  DetailTitle,
  StatusBadge,
  DetailInfoGrid,
  DetailInfoCard,
  InfoLabel,
  InfoValue,
  SectionTitle,
  RelatedItemsGrid,
  RelatedItemCard,
  RelatedItemTitle,
  TabContainer,
  TabButtons,
  TabButton,
  TabContent,
  LoadingContainer,
  ErrorContainer
} from './RickAndMortyStyles';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  
  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        setLoading(true);
        const data = await getCharacterDetails(id);
        setCharacter(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching character ${id}:`, err);
        setError('Failed to load character details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCharacterData();
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <LoadingContainer>
          <p>Cargando detalles del personaje...</p>
        </LoadingContainer>
      </Layout>
    );
  }
  
  if (error || !character) {
    return (
      <Layout>
        <PageContainer>
          <Link to="/rickandmorty/characters">
            <BackButton>
              <FaArrowLeft /> Volver a personajes
            </BackButton>
          </Link>
          
          <ErrorContainer>
            <h3>Error</h3>
            <p>{error || 'Character not found'}</p>
          </ErrorContainer>
        </PageContainer>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <PageContainer>
        <Link to="/rickandmorty/characters">
          <BackButton
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Volver a personajes
          </BackButton>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DetailContainer>
            <DetailImageSection>
              <DetailImage>
                <img src={character.image} alt={character.name} />
              </DetailImage>
            </DetailImageSection>
            
            <DetailInfoSection>
              <DetailTitle>{character.name}</DetailTitle>
              <StatusBadge status={character.status}>
                {character.status}
              </StatusBadge>
              
              <DetailInfoGrid>
                <DetailInfoCard>
                  <InfoLabel>Especie</InfoLabel>
                  <InfoValue>{character.species}</InfoValue>
                </DetailInfoCard>
                
                <DetailInfoCard>
                  <InfoLabel>Género</InfoLabel>
                  <InfoValue>{character.gender}</InfoValue>
                </DetailInfoCard>
                
                <DetailInfoCard>
                  <InfoLabel>Origen</InfoLabel>
                  <InfoValue>{character.origin.name}</InfoValue>
                </DetailInfoCard>
                
                <DetailInfoCard>
                  <InfoLabel>Ubicación actual</InfoLabel>
                  <InfoValue>{character.location.name}</InfoValue>
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
                active={activeTab === 'episodes'}
                onClick={() => setActiveTab('episodes')}
              >
                Episodios ({character.episode.length})
              </TabButton>
            </TabButtons>
            
            <TabContent>
              {activeTab === 'info' && (
                <div>
                  <SectionTitle>Detalles del personaje</SectionTitle>
                  <p>
                    {character.name} es un personaje de tipo {character.species} con género {character.gender}.
                    Actualmente se encuentra en {character.location.name} y tiene un estado "{character.status}".
                  </p>
                  
                  <SectionTitle>Ubicaciones</SectionTitle>
                  <RelatedItemsGrid>
                    <RelatedItemCard>
                      <FaHome style={{ marginRight: '8px', color: '#97ce4c' }} />
                      <InfoLabel>Origen</InfoLabel>
                      <RelatedItemTitle>{character.origin.name}</RelatedItemTitle>
                    </RelatedItemCard>
                    
                    <RelatedItemCard>
                      <FaMapMarkerAlt style={{ marginRight: '8px', color: '#97ce4c' }} />
                      <InfoLabel>Ubicación actual</InfoLabel>
                      <RelatedItemTitle>{character.location.name}</RelatedItemTitle>
                    </RelatedItemCard>
                  </RelatedItemsGrid>
                </div>
              )}
              
              {activeTab === 'episodes' && (
                <div>
                  <SectionTitle>Apariciones en episodios</SectionTitle>
                  <RelatedItemsGrid>
                    {character.episode.slice(0, 10).map((episodeUrl, index) => {
                      const episodeId = episodeUrl.split('/').pop();
                      return (
                        <RelatedItemCard key={episodeId}>
                          <FaVideo style={{ marginRight: '8px', color: '#97ce4c' }} />
                          <InfoLabel>Episodio</InfoLabel>
                          <RelatedItemTitle>Episodio {episodeId}</RelatedItemTitle>
                        </RelatedItemCard>
                      );
                    })}
                  </RelatedItemsGrid>
                  
                  {character.episode.length > 10 && (
                    <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                      Mostrando 10 de {character.episode.length} episodios
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

export default CharacterDetailPage;

