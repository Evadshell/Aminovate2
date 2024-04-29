import { Box, Button, Center, Input, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const ConversationalAPI = () => {
    const [question, setQuestion] = useState("");
    const [conversationID, setConversationID] = useState("");
    const [history, setHistory] = useState([]);

    const handleAsk = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:5000/conversationAPI?question=${question}&conversationID=${conversationID}`);
            setHistory([...history, res.data.result]); 
            setConversationID(res.data.conversationID);
            console.log(history);
            console.log(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
  
    return (
      <>
      <Center>
        <Box
            bg="white"
            borderRadius="xl"
            boxShadow="md"
            p={4}
            maxW="500px"
            w="100%"
            mt={16}
            overflow="hidden"
        >
            <VStack spacing={4} align="start">
                <Text fontSize="lg" fontWeight="bold">Math Q&A</Text>
                <Input
                    type="text"
                    placeholder="Enter your math question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    size="lg"
                    w="100%"
                    borderRadius="md"
                    bg="gray.100"
                    px={2}
                    py={1}
                />
                <Button colorScheme="teal" size="lg" onClick={handleAsk}>
                    Ask
                </Button>
                <VStack align="start" w="100%">
                    {Array.isArray(history) && history.map((entry, index) => (
                        <Box key={index} bg="gray.200" p={2} borderRadius="md" alignSelf="flex-start">
                            <Text fontSize="md">{entry}</Text>
                        </Box>
                    ))}
                </VStack>
            </VStack>
        </Box></Center></>
    );
}

export default ConversationalAPI;
