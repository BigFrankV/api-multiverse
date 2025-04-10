import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Función para obtener la lista de personajes
export const getCharacterList = async (page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rickandmorty/characters/`, {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching character list:', error);
    throw error;
  }
};

// Función para obtener detalles de un personaje
export const getCharacterDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rickandmorty/characters/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error);
    throw error;
  }
};

// Función para obtener la lista de ubicaciones
export const getLocationList = async (page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rickandmorty/locations/`, {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching location list:', error);
    throw error;
  }
};

// Función para obtener detalles de una ubicación
export const getLocationDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rickandmorty/locations/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location ${id}:`, error);
    throw error;
  }
};

// Función para obtener la lista de episodios
export const getEpisodeList = async (page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rickandmorty/episodes/`, {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching episode list:', error);
    throw error;
  }
};

// Función para obtener detalles de un episodio
export const getEpisodeDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rickandmorty/episodes/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching episode ${id}:`, error);
    throw error;
  }
};
