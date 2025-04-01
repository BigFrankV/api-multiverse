import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #3f51b5;
    --secondary-color: #f50057;
    --text-primary: #333333;
    --text-secondary: #666666;
    --background-color: #f9f9f9;
    --border-radius: 8px;
    --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    --transition-speed: 0.3s;
  }
  
  /* Estilos para los tipos de Pokémon */
  .type-normal { background-color: #A8A878; }
  .type-fire { background-color: #F08030; }
  .type-water { background-color: #6890F0; }
  .type-grass { background-color: #78C850; }
  .type-electric { background-color: #F8D030; }
  .type-ice { background-color: #98D8D8; }
  .type-fighting { background-color: #C03028; }
  .type-poison { background-color: #A040A0; }
  .type-ground { background-color: #E0C068; }
  .type-flying { background-color: #A890F0; }
  .type-psychic { background-color: #F85888; }
  .type-bug { background-color: #A8B820; }
  .type-rock { background-color: #B8A038; }
  .type-ghost { background-color: #705898; }
  .type-dark { background-color: #705848; }
  .type-dragon { background-color: #7038F8; }
  .type-steel { background-color: #B8B8D0; }
  .type-fairy { background-color: #F0B6BC; }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
  }
  
  body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  ul, ol {
    list-style-position: inside;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
  }
  
  button {
    cursor: pointer;
  }
  
  /* Estilo para barras de desplazamiento */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default GlobalStyle;
