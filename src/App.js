import {
  ChakraProvider,
  Box,
  Text,
  HStack,
  theme,
  Flex,
  Container,
  Image,
  Link,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import virusLogo from './virus.png';
import CovidData from './components/covid/covid';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl" bg="#F6F6FE" minHeight="100vh">
        <Container maxW="container.lg">
          {/* nav bar */}
          <Flex justify="space-between" alignItems="center" p={5}>
            <Flex alignItems="center">
              <Image boxSize="60px" src={virusLogo} />
              <Text fontWeight="bold" color="gray.700" ml={4}>
                MyCoronaStat
              </Text>
            </Flex>
            <HStack alignItems="center" fontSize="1rem" spacing={3}>
              <Link
                href="https://www.vaksincovid.gov.my/en/register/"
                isExternal
              >
                <Text fontWeight="semibold" color="#736DD9">
                  Vaccination Registration
                </Text>
              </Link>
              <Link href="https://kitajagakita.com" isExternal>
                <Text fontWeight="semibold" color="#736DD9">
                  KitaJagaKita
                </Text>
              </Link>
              {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
            </HStack>
          </Flex>

          <CovidData />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
