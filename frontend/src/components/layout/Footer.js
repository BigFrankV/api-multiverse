import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background-color: #1a1a2e;
  color: white;
  padding: 3rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 50px;
    height: 2px;
    background-color: var(--secondary-color);
    
    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterLink = styled.a`
  color: #ccc;
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #aaa;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FooterSection>
            <FooterTitle>API Multiverse</FooterTitle>
            <p>Explora los universos de tus franquicias favoritas a través de nuestras APIs interactivas.</p>
            <SocialLinks>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </SocialIcon>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </SocialIcon>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </SocialIcon>
            </SocialLinks>
          </FooterSection>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <FooterSection>
            <FooterTitle>Universos</FooterTitle>
            <FooterLink href="/pokemon">Pokémon</FooterLink>
            <FooterLink href="#">Star Wars</FooterLink>
            <FooterLink href="#">Marvel</FooterLink>
            <FooterLink href="#">Rick and Morty</FooterLink>
            <FooterLink href="#">Harry Potter</FooterLink>
          </FooterSection>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FooterSection>
            <FooterTitle>Enlaces</FooterTitle>
            <FooterLink href="/">Inicio</FooterLink>
            <FooterLink href="#">Acerca de</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Contacto</FooterLink>
            <FooterLink href="#">Términos</FooterLink>
          </FooterSection>
        </motion.div>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} API Multiverse. Todos los derechos reservados.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
