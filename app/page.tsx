import Navbar from './components/Navbar';
import NewHero from './components/NewHero';
import InstantCardCreator from './components/InstantCardCreator';
import PricingSection from './components/PricingSection';
import VideoFaqSection from "./components/VideoFaqSection";
import FeedbackCarousel from './components/FeedbackCarousel';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <NewHero />
      <InstantCardCreator />
      <PricingSection />
      <VideoFaqSection />
      <FeedbackCarousel />
      <Footer />
    </main>
  );
}
