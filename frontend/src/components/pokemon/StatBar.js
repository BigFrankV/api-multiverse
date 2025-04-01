import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StatContainer = styled.div`
  margin-bottom: 0.8rem;
`;

const StatName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  
  span:first-child {
    text-transform: capitalize;
    font-weight: 500;
  }
  
  span:last-child {
    font-weight: bold;
  }
`;

const BarContainer = styled.div`
  height: 8px;
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

const Bar = styled(motion.div)`
  height: 100%;
  border-radius: 4px;
  background-color: ${props => {
    if (props.value < 50) return '#ff5959';
    if (props.value < 70) return '#ffaa5a';
    if (props.value < 90) return '#ffd857';
    return '#7ed36c';
  }};
`;

const StatBar = ({ name, value }) => {
  // Stats maximos son 255 en pokemon
  const percentage = (value / 255) * 100;
  
  return (
    <StatContainer>
      <StatName>
        <span>{name.replace('-', ' ')}</span>
        <span>{value}</span>
      </StatName>
      <BarContainer>
        <Bar 
          value={value}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </BarContainer>
    </StatContainer>
  );
};

export default StatBar;
