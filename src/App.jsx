import useReveal from './hooks/useReveal';

// Layout
import BrandBar from './components/layout/BrandBar';
import BackgroundField from './components/layout/BackgroundField';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections (in page order)
import Hero from './components/sections/Hero';
import TelemetryTicker from './components/sections/TelemetryTicker';
import Credibility from './components/sections/Credibility';
import Solutions from './components/sections/Solutions';
import Methodology from './components/sections/Methodology';
import BrandConcept from './components/sections/BrandConcept';
import UseCases from './components/sections/UseCases';
import FinalCTA from './components/sections/FinalCTA';

export default function App() {
  // Initialize reveal-on-scroll system
  useReveal();

  return (
    <>
      <BrandBar />
      <BackgroundField />
      <Navbar />

      <main id="top">
        <Hero />
        <TelemetryTicker />
        <Credibility />
        <Solutions />
        <Methodology />
        <BrandConcept />
        <UseCases />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
