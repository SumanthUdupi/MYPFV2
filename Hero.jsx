import React from "react";

export const Hero = () => {
  return (
    <section
      className="flex h-screen flex-col items-center justify-center text-center"
    >
      <h1 className="text-5xl font-bold md:text-7xl">
        Suman Sourabh
      </h1>
      <p className="mt-4 text-lg text-gray-300 md:text-2xl">
        Creative Developer & UI/UX Enthusiast
      </p>
      <div className="mt-8">
        <button className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-500">
          View My Work
        </button>
      </div>
    </section>
  );
};