import api from './api';

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await api.get(`/pokemon/`, {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pokemon list:', error);
    throw error;
  }
};

export const getPokemonDetails = async (idOrName) => {
  try {
    const response = await api.get(`/pokemon/${idOrName}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pokemon ${idOrName}:`, error);
    throw error;
  }
};