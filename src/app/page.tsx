import BrutalistHero from "@/components/BrutalistHero";
import ArtistCarousel from "@/components/ArtistCarousel";
import LatestRelease from "@/components/LatestRelease";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Discography from "@/components/Discography";
import NowPlaying from "@/components/NowPlaying";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Navigation />
      
      {/* Content wrapper for brutalist sections */}
      <div className="relative z-10 w-full bg-surface">
        <BrutalistHero />
<ArtistCarousel />
        <LatestRelease />
        <About />
        <Discography />
      </div>

      <NowPlaying />
      <Footer />
    </main>
  );
}
