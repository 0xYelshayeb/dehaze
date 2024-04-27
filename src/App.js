import React, { useState } from 'react';
import { Box, VStack, Button, Switch, ChakraProvider, extendTheme, Image as ChakraImage, HStack, FormControl, FormLabel, Heading } from '@chakra-ui/react';

import forest1 from "./images/first_img/image.jpg";
import forest2 from "./images/second_img/image.jpg";
import forest3 from "./images/third_img/image.jpg";
import mask1 from "./images/first_img/multi_mask.png";
import mask2 from "./images/second_img/multi_mask.png";
import mask3 from "./images/third_img/multi_mask.png";
import binaryMask1 from "./images/first_img/binary_mask.png";
import binaryMask2 from "./images/second_img/binary_mask.png";
import binaryMask3 from "./images/third_img/binary_mask.png";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// Use a standard <img> tag or another server-compatible component for SSR
const Image = typeof window !== 'undefined' ? ChakraImage : 'img';

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(135deg, #ffffff, #ffffff)',
        color: 'black',
      }
    }
  }
});

export default function App() {
  const images = [
    { img: forest1, detailedMask: mask1, binaryMask: binaryMask1 },
    { img: forest2, detailedMask: mask2, binaryMask: binaryMask2 },
    { img: forest3, detailedMask: mask3, binaryMask: binaryMask3 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [useBinaryMask, setUseBinaryMask] = useState(false);

  const nextImage = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevImage = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  const toggleMaskType = () => setUseBinaryMask(!useBinaryMask);

  return (
    <ChakraProvider theme={theme}>
      <VStack position="relative" w="100vw" pt="25vh" zIndex="2" align="center" justifyContent="center" spacing={4}>
        <Heading>Hover over me</Heading>
        <HStack justifyContent="center" alignItems="center" width="100%" spacing={8}>
          <Button onClick={prevImage} colorScheme="purple" variant="outline">
            <ChevronLeftIcon w={8} h={8} />
          </Button>
          <Box position="relative" width="400px" height="400px">
            <Image
              src={images[currentIndex].img}
              alt="Forest Image"
              width="100%"
              height="100%"
              style={{ display: "block", position: "relative" }}
            />
            <Box position="absolute" top="0" left="0" width="100%" height="100%"
              sx={{
                opacity: 0,
                transition: 'opacity 0.15s ease',
                '&:hover': {
                  opacity: 0.4
                }
              }}>
              <Image
                src={useBinaryMask ? images[currentIndex].binaryMask : images[currentIndex].detailedMask}
                alt="Mask Image"
                width="100%"
                height="100%"
                style={{ display: "block", position: "absolute", top: 0, left: 0 }}
              />
            </Box>
          </Box>
          <Button onClick={nextImage} colorScheme="purple" variant="outline">
            <ChevronRightIcon w={8} h={8} />
          </Button>
        </HStack>
        <FormControl display="flex" alignItems="center" justifyContent="center">
          <FormLabel htmlFor="mask-toggle" mb="0">
            Use Binary Mask:
          </FormLabel>
          <Switch id="mask-toggle" isChecked={useBinaryMask} onChange={toggleMaskType} />
        </FormControl>
      </VStack>
    </ChakraProvider>
  );
}
