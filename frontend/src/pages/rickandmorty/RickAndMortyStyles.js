import styled from 'styled-components';
import { motion } from 'framer-motion';

// Contenedores principales
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    color: var(--primary-color);
  }
`;

// Encabezado de página
export const PageHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
`;

// Filtros y búsqueda
export const FilterContainer = styled.div`
  margin-bottom: 2.5rem;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  box-shadow: var(--box-shadow);
  
  svg {
    color: var(--text-secondary);
    margin-right: 0.8rem;
  }
  
  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    background: transparent;
  }
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  
  > div {
    flex: 1;
    min-width: 200px;
  }
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: white;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: var(--primary-color);
  }
`;

// Grid de tarjetas
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

export const Card = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const CardImage = styled.div`
  height: 220px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  margin-bottom: 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status?.toLowerCase()) {
      case 'alive': return '#97ce4c';
      case 'dead': return '#e76f51';
      default: return '#aaaaaa';
    }
  }};
  color: white;
`;

export const InfoItem = styled.div`
  margin-bottom: 1rem;
`;

export const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  display: block;
  margin-bottom: 0.3rem;
`;

export const InfoValue = styled.span`
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 500;
`;

// Botones y acciones
export const LoadMoreButton = styled(motion.button)`
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  margin: 3rem auto;
  display: block;
  cursor: pointer;
  border: none;
  
  &:hover {
    background-color: #2c3e97;
  }
`;

// Estados de carga y error
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  min-height: 200px;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #ffebee;
  color: #c62828;
  border-radius: var(--border-radius);
  margin: 2rem 0;
`;

// Páginas de detalle
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const DetailImageSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailImage = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  background-color: #f2f2f2;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const DetailInfoSection = styled.div`
  flex: 1;
`;

export const DetailTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

export const DetailInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const DetailInfoCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
`;

// Tabs
export const TabContainer = styled.div`
  margin-top: 3rem;
`;

export const TabButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
`;

export const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  margin-bottom: -0.5rem;
  cursor: pointer;
  
  &:hover {
    color: var(--primary-color);
  }
`;

export const TabContent = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
`;

export const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
  color: var(--text-primary);
  
  &:first-child {
    margin-top: 0;
  }
`;

export const RelatedItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const RelatedItemCard = styled(motion.div)`
  background-color: #f8f8f8;
  border-radius: var(--border-radius);
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-5px);
  }
`;

export const RelatedItemTitle = styled.h4`
  font-size: 1.1rem;
  margin-top: 0.5rem;
  color: var(--text-primary);
`;
