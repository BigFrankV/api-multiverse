import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import PokemonType from '../../components/pokemon/PokemonType';
import StatBar from '../../components/pokemon/StatBar';
import { getPokemonDetails } from '../../services/pokemonService';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
  font-weight: 500;
  
  &:before {
    content: '←';
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
  
  &:hover {
    color: var(--primary-color);
  }
`;

const PokemonHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImage = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  background-color: #f2f2f2;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

const GalleryItem = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f8f8f8;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const InfoSection = styled.div`
  flex: 1;
`;

const PokemonId = styled.span`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  display: block;
`;

const PokemonName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
  color: var(--text-primary);
`;

const TypesContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
`;

const InfoLabel = styled.h3`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.p`
  font-size: 1.2rem;
  color: var(--text-primary);
  font-weight: 500;
`;

const TabsContainer = styled.div`
  margin-top: 3rem;
`;

const TabButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
`;

const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  background-color: transparent;
  border-bottom: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  margin-bottom: -0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const TabContent = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
`;

const StatsContainer = styled.div`
  max-width: 600px;
`;

const AbilitiesList = styled.ul`
  list-style: none;
  
  li {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  h4 {
    font-size: 1.1rem;
    text-transform: capitalize;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    
    span {
      margin-left: 1rem;
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem;
      background-color: #e0e0e0;
      border-radius: 4px;
      color: var(--text-secondary);
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #ffebee;
  color: #c62828;
  border-radius: var(--border-radius);
`;

const PokemonDetailPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const data = await getPokemonDetails(id);
        setPokemon(data);
        setActiveImage(data.sprites.other['official-artwork'].front_default || data.sprites.front_default);
      } catch (err) {
        setError('Error al cargar los detalles del Pokémon. Inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemonData();
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <LoadingContainer>
          <p>Cargando detalles del Pokémon...</p>
        </LoadingContainer>
      </Layout>
    );
  }
  
  if (error || !pokemon) {
    return (
      <Layout>
        <ErrorContainer>
          <h2>¡Ups! Algo salió mal</h2>
          <p>{error || 'No se pudo cargar el Pokémon'}</p>
          <BackButton to="/pokemon">Volver a la lista</BackButton>
        </ErrorContainer>
      </Layout>
    );
  }

  // Preparar las imágenes para la galería
  const images = {
    default: pokemon.sprites.front_default,
    back: pokemon.sprites.back_default,
    female: pokemon.sprites.front_female,
    shiny: pokemon.sprites.front_shiny,
    shiny_back: pokemon.sprites.back_shiny,
    official_artwork: pokemon.sprites.other['official-artwork'].front_default
  };
  
  return (
    <Layout>
      <Container>
        <BackButton to="/pokemon">Volver a la lista de Pokémon</BackButton>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PokemonHeader>
            <ImageSection>
              <MainImage>
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={pokemon.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </MainImage>
              
              <ImageGallery>
                {Object.entries(images)
                  .filter(([_, url]) => url)
                  .map(([key, url]) => (
                    <GalleryItem 
                      key={key} 
                      onClick={() => setActiveImage(url)}
                    >
                      <img src={url} alt={`${pokemon.name} ${key}`} />
                    </GalleryItem>
                  ))}
              </ImageGallery>
            </ImageSection>
            
            <InfoSection>
              <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>
              <PokemonName>{pokemon.name}</PokemonName>
              
              <TypesContainer>
                {pokemon.types.map(type => (
                  <PokemonType key={type.type.name} type={type.type.name} />
                ))}
              </TypesContainer>
              
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Altura</InfoLabel>
                  <InfoValue>{pokemon.height / 10} m</InfoValue>
                </InfoItem>
                
                <InfoItem>
                  <InfoLabel>Peso</InfoLabel>
                  <InfoValue>{pokemon.weight / 10} kg</InfoValue>
                </InfoItem>
                
                <InfoItem>
                  <InfoLabel>Experiencia Base</InfoLabel>
                  <InfoValue>{pokemon.base_experience}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </InfoSection>
          </PokemonHeader>
          
          <TabsContainer>
            <TabButtons>
              <TabButton 
                active={activeTab === 'stats'} 
                onClick={() => setActiveTab('stats')}
              >
                Estadísticas
              </TabButton>
              
              <TabButton 
                active={activeTab === 'abilities'} 
                onClick={() => setActiveTab('abilities')}
              >
                Habilidades
              </TabButton>
              
              <TabButton 
                active={activeTab === 'moves'} 
                onClick={() => setActiveTab('moves')}
              >
                Movimientos
              </TabButton>
            </TabButtons>
            
            <TabContent>
              {activeTab === 'stats' && (
                <StatsContainer>
                  {pokemon.stats.map(stat => (
                    <StatBar 
                      key={stat.stat.name} 
                      name={stat.stat.name} 
                      value={stat.base_stat} 
                    />
                  ))}
                </StatsContainer>
              )}
              
              {activeTab === 'abilities' && (
                <AbilitiesList>
                  {pokemon.abilities.map(ability => (
                    <li key={ability.ability.name}>
                      <h4>
                        {ability.ability.name.replace('-', ' ')}
                        {ability.is_hidden && <span>Oculta</span>}
                      </h4>
                      <p>Slot: {ability.slot}</p>
                    </li>
                  ))}
                </AbilitiesList>
              )}
              
              {activeTab === 'moves' && (
                <div>
                  <h3>Movimientos principales</h3>
                  <ul>
                    {pokemon.moves.slice(0, 10).map(move => (
                      <li key={move.move.name}>
                        {move.move.name.replace('-', ' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabContent>
          </TabsContainer>
        </motion.div>
      </Container>
    </Layout>
  );
};

export default PokemonDetailPage;
