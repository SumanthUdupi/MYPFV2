import React from "react";

export const ProjectCard = ({ title, description, imageUrl }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform duration-200 hover:-translate-y-2">
      <img
        src={imageUrl}
        alt={title}
        className="h-56 w-full object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
      </div>
    </div>
  );
};