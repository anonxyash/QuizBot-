import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import EmailSignup from '../components/EmailSignup';
import LiveGradient from '../components/LiveGradient';

export default function Home() {
  return (
    <main className="relative">
      <LiveGradient />
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      <EmailSignup />
    </main>
  );
}