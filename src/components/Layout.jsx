import React from "react";
import { ChakraProvider } from "@chakra-ui/provider";
import { extendTheme } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const theme = extendTheme({
  colors: {
    brand: {
      main: "#007bff",
      hover: "#0060c7",
      secondary: "#ffffff"
    },
  },
  components: {
    Button: {
      baseStyle: {
        color: "#ffffff",
        border: '1px solid #007bff'
      },

    },
  },
});

export default function Layout({ children }) {
  return (
    <ChakraProvider theme={theme}>
      <Sidebar/>
      <div style={{maxWidth: '1100px'}} className='container'>
        <header className='d-flex justify-content-center p-4'>
          <img
            style={{ maxWidth: "200px", marginBottom: '3rem' }}
            src='https://4394269.fs1.hubspotusercontent-na1.net/hubfs/4394269/di%20logo%20long.png'
            alt=''
          />
        </header>
        
        {children}
      </div>
    </ChakraProvider>
  );
}
