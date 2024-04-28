import React, { useEffect, useState } from 'react'
import {
    IconButton,
    Flex,
    Heading,
    Text,
    Button,
    Image,
    Input,
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
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";

import mathQuesterLogo from '../mathQuester.png';
import axios from 'axios';

const Nav = () => {
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
    const logoutgoogle = () => {
        window.open("http://localhost:5000/logout", "_self");
      };const [userdata, setUserdata] = useState({});
      const getUser = async () => {
        try {
          //isse sara milega ki kya conatct number ye wo
          const response = await axios.get("http://localhost:5000/login/success", {
            withCredentials: true,
          });
          console.log(response);
          setUserdata(response.data.user);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getUser();
      }, []);
  return (
    <div>
      <Flex
          as="nav"
          className="navbar"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          color="white"
          bg="lightblue"
        >
          <Flex align="center">
          <Link to="/">
  <Image src={mathQuesterLogo} h="80px" w="80px" borderRadius="full" />
</Link>

            <Heading as="h1" size="lg" ml={12} color="white">
              Welcome to MathQuester!
            </Heading>
          </Flex>
          <Flex align="center">
          <Box>
                <Image
                  borderRadius="full"
                  boxSize="40px"
                  src={userdata?.image}
                />
              </Box>
        <Box ml={2}>
                <Button colorScheme="gray.800" >
                  {userdata?.email}
                </Button>
              </Box>
            
        
            <Button colorScheme="red" onClick={logoutgoogle}>Logout</Button>
          </Flex>
        </Flex>
    </div>
  )
}

export default Nav
