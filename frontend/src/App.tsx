import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import LandingPage from "./pages/LandingPage";
import { Auth0Provider } from '@auth0/auth0-react';


function App() {
  return (
    
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        
          <Route path="/home" element={<Layout><HomePage /></Layout>} />
          <Route path="/add" element={<Layout><AddBookPage /></Layout>} />
          <Route path="/book/:id" element={<Layout><BookDetailsPage /></Layout>} />
          <Route path="/book/:id/edit" element={<Layout><EditBookPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
