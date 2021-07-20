import {
  Text,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Link,
  Divider,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue('gray.500', 'gray.300');
  const linkColor = useColorModeValue('blue.500', 'blue.300');
  const footerBg = useColorModeValue('#ffffff', '#222040');
  return (
    <>
      <Flex
        mt={8}
        py={5}
        width="full"
        borderTopColor={textColor}
        borderTopWidth="1px"
        justify="space-between"
        fontSize={['sm', 'md']}
      >
        <Flex wrap="wrap" color={textColor}>
          <Text>Designed & created by </Text>
          <Link
            target="_blank"
            rel="noreferrer"
            ml={[0, 1]}
            href="https://vincenth19.com"
          >
            <strong>Vincent Haryadi</strong>
          </Link>
        </Flex>
        <Flex>
          <Button
            onClick={onOpen}
            colorScheme="purple"
            variant="link"
            fontSize={['sm', 'md']}
          >
            Data Source
          </Button>
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent bg={footerBg}>
          <ModalHeader>Data Source</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="left">
              <Text color={textColor}>
                COVID-19 cases, recovery, and death:
              </Text>
              <Link href="https://disease.sh/docs/" color={linkColor}>
                API from disease.sh
              </Link>
              <Divider />
              <Text color={textColor}>Vaccination: </Text>
              <Link
                href="https://github.com/vincenth19/myvaccine-backend"
                color={linkColor}
              >
                My own APIs. Data is taken from CITF-Malaysia
              </Link>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={onClose}
              variant="outline"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
