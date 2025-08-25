import Navbar from './components/Navbar';
import NewHero from './components/NewHero';
import PricingSection from './components/PricingSection';
import VideoFaqSection from "./components/VideoFaqSection";
import FeedbackCarousel from './components/FeedbackCarousel';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <NewHero />
      <section id="fiyatlar">
        <PricingSection />
      </section>
      <section id="sss">
        <VideoFaqSection />
      </section>
      <section id="yorumlar">
        <FeedbackCarousel />
      </section>
      <Footer />
    </main>
  );
}
