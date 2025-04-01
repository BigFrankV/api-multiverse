import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { getPokemonList, getPokemonDetails } from '../../services/pokemonService';

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 800px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PokemonCard = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 70%;
    max-height: 70%;
    object-fit: contain;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const PokemonId = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  display: block;
`;

const PokemonName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
  text-transform: capitalize;
`;

const LoadMoreButton = styled(motion.button)`
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  margin: 3rem auto;
  display: block;
  cursor: pointer;
  
  &:hover {
    background-color: #2c3e97;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #ffebee;
  color: #c62828;
  border-radius: var(--border-radius);
  margin: 2rem 0;
`;

const getTypeColor = (type) => {
  return `var(--type-${type})`;
};

const PokemonListPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchPokemons();
  }, []);
  
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemonList(20, pokemons.length);
      
      // Obtener detalles para cada pokemon
      const pokemonsWithDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await getPokemonDetails(pokemon.name);
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
            types: details.types.map(t => t.type.name)
          };
        })
      );
      
      setPokemons(prev => [...prev, ...pokemonsWithDetails]);
      setNextUrl(data.next);
      setError(null);
    } catch (err) {
      setError('Error al cargar los Pokémon. Inténtalo de nuevo más tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <PageHeader>
        <Title>Pokédex</Title>
        <Description>
          Explora toda la información sobre los Pokémon, sus habilidades, estadísticas, evoluciones y más.
        </Description>
      </PageHeader>
      
      {error && (
        <ErrorMessage>
          <p>{error}</p>
        </ErrorMessage>
      )}
      
      <GridContainer>
        {pokemons.map(pokemon => (
          <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <PokemonCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardImage>
                <img src={pokemon.image} alt={pokemon.name} />
              </CardImage>
              <CardContent>
                <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>
                <PokemonName>{pokemon.name}</PokemonName>
                {pokemon.types.map(type => (
                  <TypeBadge 
                    key={type} 
                    className={`type-${type}`}
                  >
                    {type}
                  </TypeBadge>
                ))}
              </CardContent>
            </PokemonCard>
          </Link>
        ))}
      </GridContainer>
      
      {loading ? (
        <LoadingContainer>
          <p>Cargando Pokémon...</p>
        </LoadingContainer>
      ) : nextUrl && (
        <LoadMoreButton
          onClick={fetchPokemons}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cargar más Pokémon
        </LoadMoreButton>
      )}
    </Layout>
  );
};

export default PokemonListPage;
