import React from 'react';
import ExploreHeader from '../components/explore/ExploreHeader';
import ExploreMap from '../components/explore/ExploreMap';
import EnvironmentalSnapshot from '../components/explore/EnvironmentalSnapshot';
import HistoricalTrends from '../components/explore/HistoricalTrends';
import AIClimateAnalyst from '../components/explore/AIClimateAnalyst';
import DataProvenance from '../components/explore/DataProvenance';
import TakeAction from '../components/explore/TakeAction';

const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F0]">
      <ExploreHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ExploreMap />
        <EnvironmentalSnapshot />
        <HistoricalTrends />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <AIClimateAnalyst />
          <DataProvenance />
        </div>
        <TakeAction />
      </div>
    </div>
  );
};

export default ExplorePage;
