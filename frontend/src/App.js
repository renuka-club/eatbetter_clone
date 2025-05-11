import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './components/About';
import BestSellers from './components/BestSellers';
import CategoryPage from './components/CategoryPage';
import Contact from './components/Contact';
import ContactUs from './components/ContactUs';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Products from './components/Products';
import ProductSection from './components/ProductSection';
import Register from './components/Register';
import SearchPage from './components/SearchPage'; 
import Snakgrid from './components/Snakgrid';
import Story from './components/Story';

function App() {
  return (
    <GoogleOAuthProvider clientId="1084415150873-airlmdfru4v2p1oobhtv17eqgvo8p525.apps.googleusercontent.com">
      <Router>
        <div className="App">
          <Navbar />
          
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Products />
                <ProductSection />
                <Features />
                <Snakgrid />
                <BestSellers />
                <Story />
                <Contact />
                <Footer />
              </>
            } />
            
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<SearchPage />} /> 
            <Route path="/contact" element={<ContactUs/>} /> 
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
