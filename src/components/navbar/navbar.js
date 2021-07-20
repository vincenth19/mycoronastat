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
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import virusLogo from '../../virus.png';
import { RiMenu3Fill } from 'react-icons/ri';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const { colorMode, toggleColorMode } = useColorMode();
  const bgg = useColorModeValue('gray.600', '#ffffff');
  const linkColor = useColorModeValue('#726FDA', '#fff');

  return (
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
        <Heading fontWeight="bold" fontSize="2xl" color={bgg} ml={4}>
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
        spacing={5}
      >
        <Link href="https://www.vaksincovid.gov.my/en/register/" isExternal>
          <Text fontWeight="semibold" color={linkColor}>
            Vaccination Registration
          </Text>
        </Link>
        <Link href="https://kitajaga.co" isExternal>
          <Text fontWeight="semibold" color={linkColor}>
            KitaJaga.co
          </Text>
        </Link>
        <Link href="https://kitajagakita.com" isExternal>
          <Text fontWeight="semibold" color={linkColor}>
            KitaJagaKita
          </Text>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleColorMode}
          color={linkColor}
        >
          {colorMode === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
        <Button
          as={Link}
          size="sm"
          borderColor={linkColor}
          color={linkColor}
          variant="outline"
          href="https://vincenth19.com"
          target="_blank"
          rel="noreferrer"
        >
          About Me
        </Button>
      </Stack>
    </Flex>
  );
}
