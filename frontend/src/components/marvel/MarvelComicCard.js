import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const CardImage = styled.div`
  height: 350px;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${Card}:hover & img {
    transform: scale(1.1);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  height: 50%;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ComicTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #e23636;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  z-index: 2;
`;

const ButtonContainer = styled.div`
  text-align: right;
  margin-top: 1rem;
`;

const ViewButton = styled.button`
  background-color: transparent;
  color: #e23636; /* Color rojo de Marvel */
  font-weight: bold;
  padding: 0.5rem 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MarvelComicCard = ({ comic }) => {
  return (
    <Link to={`/marvel/comics/${comic.marvel_id}`} style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CardImage>
          {comic.price > 0 && (
            <PriceTag>${comic.price.toFixed(2)}</PriceTag>
          )}
          <img 
            src={comic.thumbnail} 
            alt={comic.title} 
            onError={(e) => {
              e.target.src = '/assets/images/marvel-placeholder.jpg';
            }}
          />
          <CardOverlay />
        </CardImage>
        <CardContent>
          <ComicTitle>{comic.title}</ComicTitle>
          <ButtonContainer>
            <ViewButton>Ver detalles</ViewButton>
          </ButtonContainer>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MarvelComicCard;
