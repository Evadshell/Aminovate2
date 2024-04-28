import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const ConversationalAPI = () => {
    const [question, setQuestion] = useState("");
    const [conversationID,setconversationID ] = useState("");
  
    const [history, setHistory] = useState([]);
    const handleAsk = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.get(`http://localhost:5000/conversationAPI?question=${question}&conversationID=${conversationID}`);
        setHistory([...history, res.data.result]); 
        setconversationID( res.data.conversationID);
        console.log(history);
        console.log(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    
    };
  
  return (
    <VStack spacing={4} align="center" p={8}>
      <h1>Math Q&A</h1>
      <Input
        type="text"
        placeholder="Enter your math question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        size="lg"
        w="80%"
      />
      <Button colorScheme="teal" size="lg" onClick={handleAsk}>
        Ask
      </Button>
      <Box w="80%">
        {Array.isArray(history) && history.map((entry, index) => (
          <Box key={index} bg="gray.100" mb={2} p={4} borderRadius="md">
            <Text fontSize="lg" fontWeight="bold" mb={2}>Result:</Text>
            <Text >{entry}</Text>
          </Box>
        ))}
      </Box>
    </VStack>
  )
}

export default ConversationalAPI
