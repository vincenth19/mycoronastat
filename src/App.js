import {
  ChakraProvider,
  Box,
  Text,
  Stack,
  Flex,
  Container,
  Image,
  Link,
  useDisclosure,
  Button,
  Heading,
} from '@chakra-ui/react';
import theme from './theme';
import virusLogo from './virus.png';
import { RiMenu3Fill } from 'react-icons/ri';
import CovidData from './components/covid/covid';
import VaccData from './components/vaccination/vaccination';
import HerdImmunity from './components/vaccination/herdImmunity';
import StateTable from './components/vaccination/updateTable';
import Footer from './components/Footer';

import '@fontsource/lexend/400.css';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl" bg="#F6F6FE" minHeight="100vh" fontFamily="Lexend">
        <Container maxW="container.lg">
          {/* nav bar */}
          <Flex
            justify="space-between"
            alignItems="center"
            py={5}
            borderBottom="2px"
            borderColor="#726FDA"
            align="center"
            wrap="wrap"
          >
            <Flex alignItems="center">
              <Image boxSize="50px" src={virusLogo} />
              <Heading fontWeight="bold" fontSize="2xl" color="gray.700" ml={4}>
                MyCoronaStat
              </Heading>
            </Flex>
            <Button
              display={['block', 'block', 'block', 'none']}
              color="white"
              onClick={handleToggle}
              bg="#726FDA"
            >
              <RiMenu3Fill />
            </Button>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              display={{
                base: isOpen ? 'flex' : 'none',
                md: isOpen ? 'flex' : 'none',
                lg: 'flex',
              }}
              width={['full', 'full', 'full', 'auto']}
              textAlign={'right'}
              alignItems={['flex-end', 'flex-end', 'flex-end', 'center']}
              justifyContent="flex-end"
              flexGrow={1}
              fontSize="1rem"
              spacing={3}
            >
              <Link
                href="https://www.vaksincovid.gov.my/en/register/"
                isExternal
              >
                <Text fontWeight="semibold" color="#726FDA">
                  Vaccination Registration
                </Text>
              </Link>
              <Link href="https://kitajaga.co" isExternal>
                <Text fontWeight="semibold" color="#726FDA">
                  KitaJaga.co
                </Text>
              </Link>
              <Link href="https://kitajagakita.com" isExternal>
                <Text fontWeight="semibold" color="#726FDA">
                  KitaJagaKita
                </Text>
              </Link>
              <Button
                as={Link}
                size="sm"
                borderColor="#726FDA"
                color="#726FDA"
                variant="outline"
                href="https://vincenth19.com"
                target="_blank"
                rel="noreferrer"
              >
                About Me
              </Button>
            </Stack>
            {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
          </Flex>

          <CovidData />
          <VaccData />
          <HerdImmunity />
          <StateTable />
          <Footer />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
