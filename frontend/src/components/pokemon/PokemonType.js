import React from 'react';
import styled from 'styled-components';

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

const PokemonType = ({ type }) => {
  return (
    <TypeBadge className={`type-${type}`}>
      {type}
    </TypeBadge>
  );
};

export default PokemonType;
