import React from 'react';
import BentoGridItem from './BentoGridItem';

const BentoGrid: React.FC = () => {
  return (
    <section id="projects" className="p-10">
      <h2 className="text-3xl font-bold text-center mb-8">My Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
        <BentoGridItem className="md:col-span-2 md:row-span-2">Project 1</BentoGridItem>
        <BentoGridItem>Project 2</BentoGridItem>
        <BentoGridItem>Project 3</BentoGridItem>
        <BentoGridItem>Project 4</BentoGridItem>
        <BentoGridItem>Project 5</BentoGridItem>
        <BentoGridItem className="md:col-span-2">Project 6</BentoGridItem>
      </div>
    </section>
  );
};

export default BentoGrid;