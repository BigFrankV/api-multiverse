import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
 
  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
 
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 700px;
  color: var(--text-secondary);
 
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
 
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;
  }
`;

const Button = styled(motion.button)`
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
 
  &:hover {
    background-color: #2c3e97;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
 
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
 
  &:hover {
    transform: translateY(-10px);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
`;

const CardButton = styled(motion.button)`
  margin-top: 1rem;
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  background-color: var(--primary-color);
  color: white;
  border: none;
  
  &:hover {
    background-color: #2c3e97;
  }
`;

const HomePage = () => {
  return (
    <Layout>
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          API Multiverse
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explora los universos de tus franquicias favoritas a través de nuestras APIs interactivas.
        </Subtitle>
        <ButtonGroup>
          <Link to="/pokemon">
            <PrimaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explorar Pokémon
            </PrimaryButton>
          </Link>
          <Link to="/marvel">
            <SecondaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Explorar Marvel
            </SecondaryButton>
          </Link>
          <Link to="/rickandmorty">
            <SecondaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Explorar Rick and Morty
            </SecondaryButton>
          </Link>
        </ButtonGroup>
      </HeroSection>
     
      <CardGrid id="universes">
        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <CardIcon>🐲</CardIcon>
          <CardTitle>Pokémon</CardTitle>
          <CardDescription>
            Explora el mundo Pokémon con información detallada sobre cada criatura, habilidades y más.
          </CardDescription>
          <Link to="/pokemon">
            <CardButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver más
            </CardButton>
          </Link>
        </FeatureCard>
       
        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <CardIcon>🦸‍♂️</CardIcon>
          <CardTitle>Marvel</CardTitle>
          <CardDescription>
            Descubre héroes, villanos, cómics y eventos del universo Marvel con nuestra API interactiva.
          </CardDescription>
          <Link to="/marvel">
            <CardButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver más
            </CardButton>
          </Link>
        </FeatureCard>
        
        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CardIcon>🧪</CardIcon>
          <CardTitle>Rick and Morty</CardTitle>
          <CardDescription>
            Explora el multiverso con información sobre personajes, ubicaciones y episodios de la serie.
          </CardDescription>
          <Link to="/rickandmorty">
            <CardButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver más
            </CardButton>
          </Link>
        </FeatureCard>
       
        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <CardIcon>✨</CardIcon>
          <CardTitle>Star Wars</CardTitle>
          <CardDescription>
            Información sobre personajes, planetas, naves y más de la galaxia muy, muy lejana.
          </CardDescription>
          <CardButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled
            style={{ 
              opacity: 0.6, 
              cursor: 'not-allowed',
              backgroundColor: '#ccc' 
            }}
          >
            Próximamente
          </CardButton>
        </FeatureCard>
      </CardGrid>
    </Layout>
  );
};

export default HomePage;
