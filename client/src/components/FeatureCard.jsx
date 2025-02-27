import React from "react";

const FeatureCard = ({ title, description, image, onClick }) => {
  return (
    <div
      className="relative w-full max-w-4xl bg-white/20 backdrop-blur-md rounded-3xl shadow-xl hover:scale-105 transition-transform cursor-pointer"
      onClick={onClick}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center p-8">
        <img src={image} alt={title} className="rounded-2xl w-full object-cover" />
        <div className="text-center p-4">
          <h2 className="text-3xl font-[Comic Sans MS] text-white mb-4">{title}</h2>
          <p className="text-lg text-gray-200">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
