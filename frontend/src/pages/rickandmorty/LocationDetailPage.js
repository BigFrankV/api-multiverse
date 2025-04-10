import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { FaArrowLeft, FaGlobeAmericas, FaUserAlt } from 'react-icons/fa';
import { getLocationDetails } from '../../services/rickAndMortyService';
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

const LocationDetailPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const data = await getLocationDetails(id);
        setLocation(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching location ${id}:`, err);
        setError('Failed to load location details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLocationData();
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <LoadingContainer>
          <p>Cargando detalles de la ubicación...</p>
        </LoadingContainer>
      </Layout>
    );
  }
  
  if (error || !location) {
    return (
      <Layout>
        <PageContainer>
          <Link to="/rickandmorty/locations">
            <BackButton>
              <FaArrowLeft /> Volver a ubicaciones
            </BackButton>
          </Link>
          
          <ErrorContainer>
            <h3>Error</h3>
            <p>{error || 'Location not found'}</p>
          </ErrorContainer>
        </PageContainer>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <PageContainer>
        <Link to="/rickandmorty/locations">
          <BackButton
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Volver a ubicaciones
          </BackButton>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DetailContainer>
            <DetailInfoSection style={{ flex: 1 }}>
              <DetailTitle>{location.name}</DetailTitle>
              
              <DetailInfoGrid>
                <DetailInfoCard>
                  <InfoLabel>Tipo</InfoLabel>
                  <InfoValue>{location.type}</InfoValue>
                </DetailInfoCard>
                
                <DetailInfoCard>
                  <InfoLabel>Dimensión</InfoLabel>
                  <InfoValue>{location.dimension}</InfoValue>
                </DetailInfoCard>
                
                <DetailInfoCard>
                  <InfoLabel>Número de residentes</InfoLabel>
                  <InfoValue>{location.residents.length}</InfoValue>
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
                active={activeTab === 'residents'}
                onClick={() => setActiveTab('residents')}
              >
                Residentes ({location.residents.length})
              </TabButton>
            </TabButtons>
            
            <TabContent>
              {activeTab === 'info' && (
                <div>
                  <SectionTitle>Detalles de la ubicación</SectionTitle>
                  <p>
                    {location.name} es una ubicación de tipo {location.type} que se encuentra en la 
                    dimensión {location.dimension}. Actualmente cuenta con {location.residents.length} residentes conocidos.
                  </p>
                  
                  <SectionTitle>Características</SectionTitle>
                  <RelatedItemsGrid>
                    <RelatedItemCard>
                      <FaGlobeAmericas style={{ marginRight: '8px', color: '#97ce4c' }} />
                      <InfoLabel>Dimensión</InfoLabel>
                      <RelatedItemTitle>{location.dimension}</RelatedItemTitle>
                    </RelatedItemCard>
                  </RelatedItemsGrid>
                </div>
              )}
              
              {activeTab === 'residents' && (
                <div>
                  <SectionTitle>Residentes de la ubicación</SectionTitle>
                  {location.residents.length > 0 ? (
                    <RelatedItemsGrid>
                      {location.residents.slice(0, 10).map((residentUrl, index) => {
                        const residentId = residentUrl.split('/').pop();
                        return (
                          <RelatedItemCard key={residentId} as={Link} to={`/rickandmorty/characters/${residentId}`}>
                            <FaUserAlt style={{ marginRight: '8px', color: '#97ce4c' }} />
                            <InfoLabel>Residente</InfoLabel>
                            <RelatedItemTitle>Residente #{residentId}</RelatedItemTitle>
                          </RelatedItemCard>
                        );
                      })}
                    </RelatedItemsGrid>
                  ) : (
                    <p>No hay residentes conocidos en esta ubicación.</p>
                  )}
                  
                  {location.residents.length > 10 && (
                    <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                      Mostrando 10 de {location.residents.length} residentes
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

export default LocationDetailPage;
