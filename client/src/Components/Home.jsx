/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Input,
  Center,
} from "@chakra-ui/react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from "@chakra-ui/react";
  
  import wordproblem from "../wordproblem.jpg";
  import graphing from "../graphing.jpg";
  import geometry from "../geometry.jpg";
  import math from "../math.jpg"
import { FaUser, FaSearch } from "react-icons/fa";
import axios from "axios";
import FullResults from "./FullResults";
const Home = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
  
    const handleSearchToggle = () => {
      setIsSearchOpen(!isSearchOpen);
    };
  
    const handleUserIconClick = () => {
      setIsLoginOpen(!isLoginOpen);
    };
  
    const handleLogin = () => {
      setIsLoggedIn(true);
      setIsLoginOpen(false);
    };
    const [questions, setQuestions] = useState('');

    // Function to handle changes in input
    const handleInputChange = (event) => {
      setQuestions(event.target.value);
    };
    const[Data,Setdata] = useState();
    const handleAsk = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.get(`http://localhost:5000/fullresult?question=${questions}`);
          console.log(res.data);
          Setdata(res.data);
          console.log(Data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      
            };
            const navigate = useNavigate(); // Initialize the navigate function
  
            const handleTryMathBot = () => {
              navigate('/mathbot'); // Navigate to "/mathbot" route
            };
            return (
            <>
                <Flex
        direction="column"
        align="center"
        justify="center"
        bgImage={`url(${math})`}
        backgroundSize="cover"
        backgroundPosition="center"
        minHeight="100vh" // Ensure the background covers the entire viewport
      ><Button
      colorScheme="blue"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      mr={4}
      w="150px"
      h="80px"
      position="absolute"
      top="8rem"
      right="0.3rem"
      onClick={handleTryMathBot} // Call handleTryMathBot when the button is clicked
    >
      Try MathBot
    </Button>
        <Box
          bg="rgba(255, 255, 255, 0.8)"
          p={8}
          borderRadius="lg"
          boxShadow="xl"
          w="80vw"
          maxW="700px" // Limit the width of the container
        >
          <Center>
            <Heading mb={4}>Welcome to Math Portal</Heading>
          </Center>
         
          <Flex justifyContent="flex-end"> {/* Align items to the top right */}
            <Input
              placeholder="Search for a math query..."
              variant="filled"
              size="md"
              borderRadius="md"
              mb={4}
              color="black"
              value={questions}
              onChange={handleInputChange}
              _placeholder={{ color: 'gray.500' }}
              border="2px solid #CBD5E0" // Add border style
            />
            <Button colorScheme="teal" onClick={handleAsk} size="md" mb={8}>
              Search
            </Button>
          </Flex>
          {Data && <FullResults XML={Data} />} {/* Render FullResults component if Data exists */}
        </Box>
      </Flex>
            </>
            );
        };

        export default Home
