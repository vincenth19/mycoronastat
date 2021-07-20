import { Box, Container, useColorModeValue } from '@chakra-ui/react';

export default function Frame({ children }) {
  const xd = useColorModeValue('#F6F6FE', '#222040');
  return (
    <Box fontSize="xl" bg={xd} minHeight="100vh" fontFamily="Lexend">
      <Container maxW="container.lg">{children}</Container>
    </Box>
  );
}
