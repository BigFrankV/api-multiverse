import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { getMarvelComicDetails } from '../../services/marvelService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

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

const ComicSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 350px 1fr;
  }
`;

const ComicImage = styled.div`
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ComicInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ComicTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const ComicDescription = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.li`
  display: flex;
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  min-width: 100px;
  color: var(--text-primary);
`;

const InfoValue = styled.span`
  color: var(--text-secondary);
`;

const PriceTag = styled.div`
  display: inline-block;
  background-color: #e23636;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 1rem;
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
  border: none;
  cursor: pointer;

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

const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const CharacterCard = styled(Link)`
  text-decoration: none;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CharacterImage = styled.div`
  height: 150px;
  background-color: #f2f2f2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CharacterName = styled.h3`
  font-size: 1rem;
  color: var(--text-primary);
  padding: 0.8rem;
  text-align: center;
`;

const NoCharacters = styled.div`
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

const MarvelComicDetailPage = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        setLoading(true);
        const data = await getMarvelComicDetails(id);
        setComic(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comic details:', error);
        setError('No se pudo cargar la información del cómic. Por favor, intenta nuevamente más tarde.');
        setLoading(false);
      }
    };

    fetchComicDetails();
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
          <BackLink to="/marvel/comics">
            &larr; Volver a cómics
          </BackLink>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </Layout>
    );
  }

  if (!comic) {
    return (
      <Layout>
        <Container>
          <BackLink to="/marvel/comics">
            &larr; Volver a cómics
          </BackLink>
          <ErrorMessage>No se encontró el cómic.</ErrorMessage>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <BackLink to="/marvel/comics">
          &larr; Volver a cómics
        </BackLink>
        
        <ComicSection>
          <ComicImage>
            <img 
              src={comic.thumbnail} 
              alt={comic.title}
              onError={(e) => {
                e.target.src = '/assets/images/marvel-placeholder.jpg';
              }}
            />
          </ComicImage>
          
          <ComicInfo>
            <ComicTitle>{comic.title}</ComicTitle>
            
            <ComicDescription>
              {comic.description 
                ? <div dangerouslySetInnerHTML={{ __html: comic.description }} />
                : "No hay descripción disponible para este cómic."}
            </ComicDescription>
            
            <InfoList>
              {comic.series && (
                <InfoItem>
                  <InfoLabel>Serie:</InfoLabel>
                  <InfoValue>{comic.series}</InfoValue>
                </InfoItem>
              )}
              
              {comic.published && (
                <InfoItem>
                  <InfoLabel>Publicado:</InfoLabel>
                  <InfoValue>{new Date(comic.published).toLocaleDateString()}</InfoValue>
                </InfoItem>
              )}
              
              {comic.pages && (
                <InfoItem>
                  <InfoLabel>Páginas:</InfoLabel>
                  <InfoValue>{comic.pages}</InfoValue>
                </InfoItem>
              )}
              
              {comic.format && (
                <InfoItem>
                  <InfoLabel>Formato:</InfoLabel>
                  <InfoValue>{comic.format}</InfoValue>
                </InfoItem>
              )}
            </InfoList>
            
            {comic.price > 0 && (
              <PriceTag>${comic.price.toFixed(2)}</PriceTag>
            )}
            
            {comic.detail_url && (
              <MarvelButton
                href={comic.detail_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Marvel.com
              </MarvelButton>
            )}
          </ComicInfo>
        </ComicSection>
        
        <SectionTitle>Personajes</SectionTitle>
        
        {comic.characters && comic.characters.length > 0 ? (
          <CharactersGrid>
            {comic.characters.map(character => (
              <CharacterCard key={character.marvel_id} to={`/marvel/characters/${character.marvel_id}`}>
                <CharacterImage>
                  <img
                    src={character.thumbnail}
                    alt={character.name}
                    onError={(e) => {
                      e.target.src = '/assets/images/marvel-placeholder.jpg';
                    }}
                  />
                </CharacterImage>
                <CharacterName>{character.name}</CharacterName>
              </CharacterCard>
            ))}
          </CharactersGrid>
        ) : (
          <NoCharacters>
            No hay personajes disponibles para este cómic.
          </NoCharacters>
        )}
      </Container>
    </Layout>
  );
};

export default MarvelComicDetailPage;
