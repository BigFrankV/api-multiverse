import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { getMarvelCharacterDetails } from '../../services/marvelService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import MarvelComicCard from '../../components/marvel/MarvelComicCard';

const Container = styled.div`
  padding: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CharacterSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 350px 1fr;
  }
`;

const CharacterImage = styled.div`
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CharacterName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const CharacterDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1rem;
  text-align: center;
  box-shadow: var(--box-shadow);
`;

const StatValue = styled.h3`
  font-size: 1.5rem;
  color: #e23636;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const MarvelButton = styled.a`
  display: inline-block;
  background-color: #e23636;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  margin-top: auto;
  align-self: flex-start;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background-color: #e23636;
  }
`;

const ComicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
`;

const NoComics = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
  font-size: 1.2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #e23636;
  font-size: 1.2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const MarvelCharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        setLoading(true);
        const data = await getMarvelCharacterDetails(id);
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching character details:', error);
        setError('No se pudo cargar la información del personaje. Por favor, intenta nuevamente más tarde.');
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Container>
          <LoadingSpinner />
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container>
          <BackLink to="/marvel/characters">
            &larr; Volver a personajes
          </BackLink>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </Layout>
    );
  }

  if (!character) {
    return (
      <Layout>
        <Container>
          <BackLink to="/marvel/characters">
            &larr; Volver a personajes
          </BackLink>
          <ErrorMessage>No se encontró el personaje.</ErrorMessage>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <BackLink to="/marvel/characters">
          &larr; Volver a personajes
        </BackLink>
        
        <CharacterSection>
          <CharacterImage>
            <img 
              src={character.thumbnail} 
              alt={character.name}
              onError={(e) => {
                e.target.src = '/assets/images/marvel-placeholder.jpg';
              }}
            />
          </CharacterImage>
          
          <CharacterInfo>
            <CharacterName>{character.name}</CharacterName>
            
            <CharacterDescription>
              {character.description 
                ? character.description 
                : "No hay descripción disponible para este personaje."}
            </CharacterDescription>
            
            <StatsContainer>
              <StatCard>
                <StatValue>{character.comics_available}</StatValue>
                <StatLabel>Cómics</StatLabel>
              </StatCard>
              
              <StatCard>
                <StatValue>{character.series_available}</StatValue>
                <StatLabel>Series</StatLabel>
              </StatCard>
              
              <StatCard>
                <StatValue>{character.stories_available}</StatValue>
                <StatLabel>Historias</StatLabel>
              </StatCard>
              
              <StatCard>
                <StatValue>{character.events_available}</StatValue>
                <StatLabel>Eventos</StatLabel>
              </StatCard>
            </StatsContainer>
            
            {character.detail_url && (
              <MarvelButton 
              href={character.detail_url} 
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en Marvel.com
            </MarvelButton>
          )}
        </CharacterInfo>
      </CharacterSection>
      
      <SectionTitle>Cómics</SectionTitle>
      
      {character.comics && character.comics.length > 0 ? (
        <ComicsGrid>
          {character.comics.map(comic => (
            <MarvelComicCard key={comic.marvel_id} comic={comic} />
          ))}
        </ComicsGrid>
      ) : (
        <NoComics>
          No hay cómics disponibles para este personaje.
        </NoComics>
      )}
    </Container>
  </Layout>
);
};

export default MarvelCharacterDetailPage;
