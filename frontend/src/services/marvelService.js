import axios from 'axios';
// Cambiar esta línea
const API_BASE_URL = 'http://localhost:8000/api/marvel';



// Configuración base para las peticiones a la API
// Ajusta esto a tu endpoint real

// Función para obtener personajes de Marvel
export const getMarvelCharacters = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/characters`, {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Marvel characters:', error);
    throw error;
  }
};

// Función para buscar personajes de Marvel
export const searchMarvelCharacters = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/characters/search`, {
      params: { query: searchTerm }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching Marvel characters:', error);
    throw error;
  }
};

// Función para obtener detalles de un personaje específico
export const getMarvelCharacterDetails = async (characterId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/characters/${characterId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for character ${characterId}:`, error);
    throw error;
  }
};

// Función para obtener cómics de Marvel
export const getMarvelComics = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comics`, {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Marvel comics:', error);
    throw error;
  }
};

// Función para buscar cómics de Marvel
export const searchMarvelComics = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comics/search`, {
      params: { query: searchTerm }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching Marvel comics:', error);
    throw error;
  }
};

// Función para obtener detalles de un cómic específico
export const getMarvelComicDetails = async (comicId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comics/${comicId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for comic ${comicId}:`, error);
    throw error;
  }
};

// Función para obtener eventos de Marvel
export const getMarvelEvents = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`, {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Marvel events:', error);
    throw error;
  }
};