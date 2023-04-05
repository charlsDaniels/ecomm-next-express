import React from 'react'
import Navbar from 'components/Navigation/Navbar/NavBar'
import Container from '@mui/material/Container';

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 6 }}>
        {children}
      </Container>
    </>
  )
}

export default Layout