import React, { useEffect, useState } from 'react';
import he from 'he';
import { Box, Heading, Text, Image, Center, Flex, Button } from '@chakra-ui/react';

const FullResults = (props) => {
    const{XML}=props;
    const [resultData, setResultData] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    useEffect(() => {
        // Simulated XML response data
        const xmlResponse = XML;

        // Parsing XML data
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlResponse, 'text/xml');

        // Extracting pods and subpods from XML
        const pods = xmlDoc.querySelectorAll('pod');
        const parsedResults = [];

        pods.forEach(pod => {
            const title = pod.getAttribute('title');
            const subpods = pod.querySelectorAll('subpod');
            const parsedSubpods = [];

            subpods.forEach(subpod => {
                const subpodTitle = subpod.getAttribute('title');
                const content = subpod.querySelector('plaintext').textContent;
                const imgSrc = subpod.querySelector('img')?.getAttribute('src');
                console.log(he.decode(imgSrc))
                parsedSubpods.push({
                    title: subpodTitle,
                    content: content,
                    imgSrc: imgSrc ? he.decode(imgSrc) : null
                });
            });

            parsedResults.push({
                title: title,
                subpods: parsedSubpods
            });
        });

        // Updating state with parsed results
        setResultData(parsedResults);
    }, []);
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
      };
    
      const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
      };
      return (
        <div>
          <Box bg="rgba(255, 255, 255, 0.1)" p={8} borderRadius="md" backdropFilter="blur(5px)">
            {resultData.length > 0 && (
              <Box bg="rgba(255, 255, 255, 0.5)" p={4} borderRadius="md" boxShadow="md" mb={4}>
                <Heading as="h2" size="md" mb={3}>
                  {resultData[currentStep].title}
                </Heading>
                {resultData[currentStep].subpods.map((subpod, subIndex) => (
                  <Box key={subIndex} mb={4}>
                    <Heading as="h3" size="sm" mb={1}>
                      {subpod.title}
                    </Heading>
                    <Text fontSize="md" mb={2}>
                      {subpod.content}
                    </Text>
                    {subpod.imgSrc && (
                      <Image src={subpod.imgSrc} alt="" borderRadius="md" boxShadow="base" />
                    )}
                  </Box>
                ))}
              </Box>
            )}
            <Box>
          {currentStep !== 0 && (
            <Button onClick={handlePreviousStep} colorScheme="teal">
              Previous Step
            </Button>
          )}
          
          {currentStep !== resultData.length - 1 && (
            <Button onClick={handleNextStep} colorScheme="teal" ml={2}>
              Next Step
            </Button>
          )}
        </Box>
          </Box>
        </div>
      );
    };
    


export default FullResults
