import React from 'react';
import HeroSection from '../components/HeroSection';
import CommunityImpactMetrics from '../components/CommunityImpactMetrics';
import HowItWorksSection from '../components/HowItWorksSection';
import EnvironmentalExplorerSection from '../components/EnvironmentalExplorerSection';
import CommunityProgramsSection from '../components/CommunityProgramsSection';
import CommunityImpactBanner from '../components/CommunityImpactBanner';
import AIClimateAnalystSection from '../components/AIClimateAnalystSection';
import ClosingBanner from '../components/ClosingBanner';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CommunityImpactMetrics />
      <HowItWorksSection />
      <EnvironmentalExplorerSection />
      <CommunityProgramsSection />
      <CommunityImpactBanner />
      <AIClimateAnalystSection />
      <ClosingBanner />
    </>
  );
};

export default HomePage;
