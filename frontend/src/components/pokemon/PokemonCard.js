import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  
  img {
    width: 150px;
    height: 150px;
    object-fit: contain;
    transition: transform 0.5s ease;
  }
  
  ${Card}:hover & img {
    transform: scale(1.1);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(242,242,242,1) 100%);
    z-index: 1;
  }
`;

const PokemonId = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const PokemonName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  color: var(--text-primary);
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  text-transform: capitalize;
`;

const PokemonCard = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <Card
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <CardImage>
          <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>
          <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
        </CardImage>
        <CardContent>
          <PokemonName>{pokemon.name}</PokemonName>
          <div>
            {pokemon.types.map(type => (
              <TypeBadge key={type} className={`type-${type}`}>
                {type}
              </TypeBadge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PokemonCard;