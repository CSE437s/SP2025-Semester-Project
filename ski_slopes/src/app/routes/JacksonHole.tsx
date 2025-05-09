import React from 'react';

const JacksonHole = () => {
  return (
    <div className="max-w-4xl mx-auto pt-16 px-8">
      <h1 className="text-4xl font-bold mb-4">Jackson Hole Mountain Resort</h1>
      <img
        src="/assets/cardsinfo/jacksonhole-map.jpg"
        alt="Jackson Hole"
        className="rounded-lg mb-6"
      />
      <p className="mb-4">
        Located in Teton Village, Wyoming, Jackson Hole Mountain Resort is renowned for its steep terrain, deep powder, and breathtaking alpine scenery. It features one of the biggest vertical drops in the U.S. and is a magnet for expert skiers.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Location:</strong> Teton Village, Wyoming</li>
        <li><strong>Top Elevation:</strong> 10,450 ft</li>
        <li><strong>Base Elevation:</strong> 6,311 ft</li>
        <li><strong>Vertical Drop:</strong> 4,139 ft</li>
        <li><strong>Skiable Terrain:</strong> 2,500 acres</li>
        <li><strong>Number of Trails:</strong> 133</li>
        <li><strong>Annual Snowfall:</strong> 459 inches</li>
        <li><strong>Lift System:</strong> 13 lifts including 1 tram, 2 gondolas, and 10 chairlifts</li>
      </ul>
      <div className="mb-6">
        <iframe
          title="Jackson Hole Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.2641422552636!2d-110.82726422406104!3d43.58741877111354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53531a505bd0ee81%3A0x43c36498ab21dd8b!2sJackson%20Hole%20Mountain%20Resort!5e0!3m2!1sen!2sus!4v1684875234806!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default JacksonHole;