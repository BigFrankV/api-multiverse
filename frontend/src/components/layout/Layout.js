import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = styled.main`
  min-height: calc(100vh - 150px); // Ajustar según altura de navbar y footer
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>
        <ContentContainer>{children}</ContentContainer>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
