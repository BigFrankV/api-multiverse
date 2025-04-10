import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import { FaUserAlt, FaMapMarkerAlt, FaFilm } from 'react-icons/fa';
import { PageContainer, PageHeader, Title, Subtitle, GridContainer, Card, CardContent, CardTitle } from './RickAndMortyStyles';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  background-image: url('https://images.unsplash.com/photo-1630050775062-92543fcd7b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 10px;
  margin-bottom: 3rem;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #97ce4c; /* Rick green */
  color: white;
  border: none;
  
  &:hover {
    background-color: #86b846;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: white;
  border: 2px solid white;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const IconContainer = styled.div`
  font-size: 3rem;
  color: #97ce4c;
  margin-bottom: 1.5rem;
`;

const RickAndMortyPage = () => {
  return (
    <Layout>
      <PageContainer>
        <HeroSection>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Rick and Morty Universe
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explora el multiverso infinito de Rick and Morty, con todos sus personajes, ubicaciones y episodios.
            </HeroSubtitle>
            <ButtonGroup>
              <Link to="/rickandmorty/characters">
                <PrimaryButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FaUserAlt /> Ver Personajes
                </PrimaryButton>
              </Link>
              <Link to="/rickandmorty/locations">
                <SecondaryButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <FaMapMarkerAlt /> Ver Ubicaciones
                </SecondaryButton>
              </Link>
              <Link to="/rickandmorty/episodes">
                <SecondaryButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <FaFilm /> Ver Episodios
                </SecondaryButton>
              </Link>
            </ButtonGroup>
          </HeroContent>
        </HeroSection>

        <PageHeader>
          <Title>Explora el universo de Rick and Morty</Title>
          <Subtitle>
            Descubre información detallada sobre personajes, ubicaciones y episodios de la popular serie animada.
          </Subtitle>
        </PageHeader>

        <GridContainer>
          <Card 
            as={Link} 
            to="/rickandmorty/characters"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent>
              <IconContainer>
                <FaUserAlt />
              </IconContainer>
              <CardTitle>Personajes</CardTitle>
              <p>
                Explora los diversos personajes del show, desde humanos hasta las criaturas alienígenas más extrañas.
              </p>
            </CardContent>
          </Card>

          <Card 
            as={Link} 
            to="/rickandmorty/locations"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <CardContent>
              <IconContainer>
                <FaMapMarkerAlt />
              </IconContainer>
              <CardTitle>Ubicaciones</CardTitle>
              <p>
                Visita los diferentes planetas, dimensiones y realidades alternativas del multiverso.
              </p>
            </CardContent>
          </Card>

          <Card 
            as={Link} 
            to="/rickandmorty/episodes"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <CardContent>
              <IconContainer>
                <FaFilm />
              </IconContainer>
              <CardTitle>Episodios</CardTitle>
              <p>
                Revisa información sobre todos los episodios de Rick and Morty a través de sus temporadas.
              </p>
            </CardContent>
          </Card>
        </GridContainer>
      </PageContainer>
    </Layout>
  );
};

export default RickAndMortyPage;
