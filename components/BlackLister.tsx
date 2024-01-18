// /components/BlackLister.tsx

import { useState, FunctionComponent } from 'react';
import { Text, Button, Input, Box, ChakraProvider, Container, VStack, Heading } from '@chakra-ui/react';
import { COLORS } from '../utils/palette';

const { secondaryText, background, secondary, buttonCol } = COLORS;

interface BlackListerProps {
    goToIssuer: () => void;
    goToVerifier: () => void;
  }

const BlackLister: FunctionComponent<BlackListerProps> = ({ goToIssuer, goToVerifier }) => {
  const [token, setToken] = useState('');

  const blacklistToken = async () => {
    // Logic to blacklist the token
  };

  return (
    <ChakraProvider>
      <Box bg={background} minH="100vh" display="flex" alignItems="center" justifyContent="center"> 
        <Container py={10}>
          <VStack spacing={4} align="center">
            <Heading fontFamily="'Kdam Thmor Pro', sans-serif">BlackLister</Heading>
            <Box bg={`${secondary}20`} p={4} borderRadius="lg" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)">
              <VStack spacing={4} align="center">
                <Input 
                  placeholder="Enter JWT to blacklist" 
                  size="lg"
                  w="full"
                  onChange={(e) => setToken(e.target.value)}
                  borderColor={COLORS.primary}
                  bg={`${COLORS.background}A0`} 
                  color={COLORS.text}
                  _hover={{ borderColor: COLORS.accent }}
                  _focus={{ borderColor: COLORS.accent2, boxShadow: `0px 0px 10px ${COLORS.accent2}` }}
                  transition="all 0.3s ease-in-out"
                  borderRadius="20px"
                  fontFamily="'Kdam Thmor Pro', sans-serif"
                />
                <Button 
                  onClick={blacklistToken}
                  mt={4}
                  bgColor={`${buttonCol}80`}
                  color={COLORS.text}
                  _hover={{ bg: `${COLORS.accent}80`, transform: 'scale(1.05)' }}
                  _active={{ bg: `${COLORS.neonAccent}80` }}
                  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                  border="2px solid"
                  borderColor={COLORS.grey}
                  transition="all 0.3s ease-in-out"
                  borderRadius="20px"
                  minW="200px"
                  w="10vw"
                  fontFamily="'Kdam Thmor Pro', sans-serif"
                >
                  Blacklist Token
                </Button>
                <Button 
                  onClick={goToIssuer}
                  mt={4}
                  bgColor={`${COLORS.buttonCol}80`}
                  color={COLORS.text}
                  _hover={{ bg: `${COLORS.accent}80`, transform: 'scale(1.05)' }}
                  _active={{ bg: `${COLORS.neonAccent}80` }}
                  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                  border="2px solid"
                  borderColor={COLORS.grey}
                  transition="all 0.3s ease-in-out"
                  borderRadius="20px"
                  fontFamily="'Kdam Thmor Pro', sans-serif"
                  minW="200px"
                  w={'10vw'} 
                >
                  Go To Issuer
                </Button>
                <Button 
                  onClick={goToVerifier}
                  mt={4}
                  bgColor={`${COLORS.buttonCol}80`}
                  color={COLORS.text}
                  _hover={{ bg: `${COLORS.accent}80`, transform: 'scale(1.05)' }}
                  _active={{ bg: `${COLORS.neonAccent}80` }}
                  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                  border="2px solid"
                  borderColor={COLORS.grey}
                  transition="all 0.3s ease-in-out"
                  borderRadius="20px"
                  fontFamily="'Kdam Thmor Pro', sans-serif"
                  minW="200px"
                  w={'10vw'} 
                >
                  Go To Verifier
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default BlackLister;
