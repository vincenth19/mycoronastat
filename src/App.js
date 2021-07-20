import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

import Frame from './components/frame/frame';
import Navbar from './components/navbar/navbar';
import CovidData from './components/covid/covid';
import VaccData from './components/vaccination/vaccination';
import HerdImmunity from './components/vaccination/herdImmunity';
import StateTable from './components/vaccination/updateTable';
import Footer from './components/Footer';

import '@fontsource/lexend/400.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Frame>
        <Navbar />
        <CovidData />
        <VaccData />
        <HerdImmunity />
        <StateTable />
        <Footer />
      </Frame>
    </ChakraProvider>
  );
}

export default App;
