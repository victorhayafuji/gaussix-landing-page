import useReveal from './hooks/useReveal';

// Layout
import BrandBar from './components/layout/BrandBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections (in page order)
import Hero from './components/sections/Hero';
import Manifesto from './components/sections/Manifesto';
import Solutions from './components/sections/Solutions';
import Methodology from './components/sections/Methodology';
import FlowIA from './components/sections/FlowIA';
import FinalCTA from './components/sections/FinalCTA';

export default function App() {
  // Initialize reveal-on-scroll system
  useReveal();

  return (
    <>
      <BrandBar />
      <Navbar />

      <main id="top">
        <Hero />
        <Manifesto />
        <Solutions />
        <Methodology />
        <FlowIA />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
