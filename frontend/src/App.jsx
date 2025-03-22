import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";

const Navbar = lazy(() => import("./components/Navbar"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.200", "gray.900")}>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;