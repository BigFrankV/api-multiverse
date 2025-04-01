import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';

const Container = styled.div`
  padding: 2rem;
`;

const HeroSection = styled.section`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  overflow: hidden;
  border-radius: var(--border-radius);
`;

const HeroImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('/assets/images/marvel-banner.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
`;

const HeroContent = styled.div`
  position: relative;
  text-align: center;
  color: white;
  padding: 0 2rem;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  
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
  background-color: #e23636; /* Color rojo de Marvel */
  color: white;
  border: none;
  
  &:hover {
    background-color: #d32f2f;
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

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: #e23636;
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #e23636;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
`;

const MarvelPage = () => {
  return (
    <Layout>
      <Container>
        <HeroSection>
          <HeroImage />
          <HeroContent>
            <Title
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Universo Marvel
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explora el vasto universo de personajes, cómics y eventos de Marvel a través de nuestra API interactiva.
            </Subtitle>
            <ButtonGroup>
              <Link to="/marvel/characters">
                <PrimaryButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Explorar Personajes
                </PrimaryButton>
              </Link>
              <Link to="/marvel/comics">
                <SecondaryButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Ver Cómics
                </SecondaryButton>
              </Link>
            </ButtonGroup>
          </HeroContent>
        </HeroSection>
        
        <SectionTitle>Descubre el Universo Marvel</SectionTitle>
        
        <FeaturesContainer>
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <FeatureIcon>🦸‍♂️</FeatureIcon>
            <FeatureTitle>Personajes</FeatureTitle>
            <FeatureDescription>
              Explora cientos de personajes del universo Marvel, desde los Vengadores hasta los X-Men y muchos más.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FeatureIcon>📚</FeatureIcon>
            <FeatureTitle>Cómics</FeatureTitle>
            <FeatureDescription>
              Descubre los cómics más icónicos de Marvel, con información sobre sus historias, personajes y más.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>Búsqueda</FeatureTitle>
            <FeatureDescription>
              Encuentra rápidamente tus personajes y cómics favoritos con nuestro sistema de búsqueda avanzado.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesContainer>
      </Container>
    </Layout>
  );
};

export default MarvelPage;
