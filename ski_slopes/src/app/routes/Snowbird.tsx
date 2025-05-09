import React from 'react';

const Snowbird = () => {
  return (
    <div className="max-w-4xl mx-auto pt-16 px-8">
      <h1 className="text-4xl font-bold mb-4">Snowbird Ski & Summer Resort</h1>
      <img
        src="/assets/cardsinfo/snowbird-map.jpg"
        alt="Snowbird Resort"
        className="rounded-lg mb-6"
      />
      <p className="mb-4">
        Nestled in Utah's Little Cottonwood Canyon, Snowbird is renowned for its deep powder, challenging terrain, and breathtaking alpine scenery. With a vertical drop of 3,240 feet and 2,500 acres of skiable terrain, it's a haven for both skiers and snowboarders seeking adventure.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Location:</strong> Little Cottonwood Canyon, Utah</li>
        <li><strong>Top Elevation:</strong> 11,000 ft</li>
        <li><strong>Base Elevation:</strong> 7,760 ft</li>
        <li><strong>Vertical Drop:</strong> 3,240 ft</li>
        <li><strong>Skiable Terrain:</strong> 2,500 acres</li>
        <li><strong>Number of Trails:</strong> 169</li>
        <li><strong>Annual Snowfall:</strong> 500 inches</li>
        <li><strong>Longest Run:</strong> 2.5 miles (Chip's Run)</li>
        <li><strong>Lift System:</strong> 14 lifts including 1 tram, 6 high-speed quads, 4 double chairs, and 2 surface lifts</li>
        <li><strong>Terrain Difficulty:</strong> 27% Beginner, 38% Intermediate, 35% Advanced</li>
      </ul>
      <p className="mb-4">
        Snowbird offers a variety of amenities including fine dining, a luxurious spa, and year-round activities. The resort is easily accessible, located just 29 miles from Salt Lake City International Airport.
      </p>
      <div className="mb-6">
        <iframe
          title="Snowbird Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3029.123456789!2d-111.693123!3d40.580123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d123456789abc%3A0xabcdef123456789!2sSnowbird%20Ski%20Resort!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
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

export default Snowbird;
