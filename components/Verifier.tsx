import { useState, FunctionComponent } from 'react';
import { Text, Button, Input, Box, ChakraProvider, Container, VStack, Heading } from '@chakra-ui/react';
import { COLORS } from '../utils/palette';
import Head from 'next/head';
import { jwtDecode, JwtPayload } from "jwt-decode";

const { 
  secondaryText, background, secondary, grey, buttonCol, redPrimary 
} = COLORS;

interface VerifierProps {
  onBack: () => void;
  onBlackList: () => void;
}

interface MyTokenPayload extends JwtPayload {
  class?: string;
}

const Verifier: FunctionComponent<VerifierProps> = ({ onBack, onBlackList }) => {
  const [token, setToken] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('Awaiting token verification...');
  const [statusBoxBg, setStatusBoxBg] = useState(`${grey}80`);

  // Function to simulate token verification
  async function verifyJWT(token: string) {
    return new Promise((resolve, reject) => {
      if (token) {
        try {
          const decoded = jwtDecode<MyTokenPayload>(token);
          const currentUnixTime = Math.floor(Date.now() / 1000);
  
          if (decoded.exp && decoded.exp < currentUnixTime) {
            reject(new Error("Token has expired"));
          } else {
            resolve(`Valid. Class: ${decoded.class}`);
          }          
        } catch (error) {
          reject(new Error("Invalid token"));
        }
      } else {
        reject(new Error("No token provided"));
      }
    });
  }
  
  const verifyToken = async () => {
    try {
      const response = await fetch('/api/jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, action: 'verify' }),
      });
  
      if (response.ok) {
        const decoded = jwtDecode<MyTokenPayload>(token);
        setVerificationStatus(`Token is valid. Class: ${decoded.class}`);
        setStatusBoxBg(`${COLORS.accent}80`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error verifying token");
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    
      if (error instanceof Error) {
        setVerificationStatus(error.message);
      } else {
        setVerificationStatus('An unexpected error occurred.');
      }
    
      setStatusBoxBg(`${redPrimary}80`);
    }
  };

  return (
    <ChakraProvider>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap" rel="stylesheet" />
      </Head>
      <Box bg={background} minH="100vh" display="flex" alignItems="center" justifyContent="center"> 
        <Container py={10}>
          <VStack spacing={4} align="center">
            <Heading fontFamily="'Kdam Thmor Pro', sans-serif">JSON Web Token Verifier</Heading>
            <Box bg={`${secondary}20`} p={4} borderRadius="lg" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)">
              <VStack spacing={4} align="center">
                <Input 
                  placeholder="Enter JWT here" 
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
                <Box position="relative" w="full" display="flex" justifyContent="center" mb={5}>
                  <Box 
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    bg={`${buttonCol}80`}
                    borderRadius="lg"
                    zIndex="-1"
                  />
                  <Button 
                    onClick={verifyToken}
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
                    minW="200px"
                    w="10vw"
                    fontFamily="'Kdam Thmor Pro', sans-serif"
                  >
                    Verify Token
                  </Button>
                </Box>
                <Box bg={statusBoxBg} p={4} borderRadius="lg" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)">
                  <Text textAlign='center' color={secondaryText} fontSize="lg" fontFamily="'Kdam Thmor Pro', sans-serif">
                    {verificationStatus}
                  </Text>
                </Box>
                <Box position="relative" w="full" display="flex" justifyContent="center">
                  <Box 
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    bg={`${buttonCol}80`}
                    borderRadius="lg"
                    zIndex="-1"
                  />
                  <Button 
                    onClick={onBlackList}
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
                    Go to Blacklister
                  </Button>
                </Box>
                <Box position="relative" w="full" display="flex" justifyContent="center" mb={5}>
                  <Box 
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    bg={`${buttonCol}80`}
                    borderRadius="lg"
                    zIndex="-1"
                  />
                  <Button 
                    onClick={onBack}
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
                    Back to Issuer
                  </Button>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default Verifier;
