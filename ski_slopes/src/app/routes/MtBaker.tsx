import React from 'react';

const MtBaker = () => {
  return (
    <div className="max-w-4xl mx-auto pt-16 px-8">
      <h1 className="text-4xl font-bold mb-4">Mt. Baker Ski Area</h1>
      <img
        src="/assets/cardsinfo/mtbaker-map.jpg"
        alt="Mt. Baker"
        className="rounded-lg mb-6"
      />
      <p className="mb-4">
        Known for its record-breaking snowfall and rugged terrain, Mt. Baker Ski Area is a powder paradise tucked away in Washington’s North Cascades. It’s popular with advanced skiers and backcountry adventurers.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Location:</strong> Bellingham, Washington</li>
        <li><strong>Top Elevation:</strong> 5,089 ft</li>
        <li><strong>Base Elevation:</strong> 3,500 ft</li>
        <li><strong>Vertical Drop:</strong> 1,589 ft</li>
        <li><strong>Skiable Terrain:</strong> 1,000+ acres</li>
        <li><strong>Number of Trails:</strong> 38</li>
        <li><strong>Annual Snowfall:</strong> 600+ inches</li>
        <li><strong>Lift System:</strong> 10 lifts (8 chairs, 2 rope tows)</li>
      </ul>
      <div className="mb-6">
        <iframe
          title="Mt. Baker Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2738.431267570204!2d-121.67314138443927!3d48.86006597928803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5484b0c1f30f7e01%3A0x7f670be56127828e!2sMt.%20Baker%20Ski%20Area!5e0!3m2!1sen!2sus!4v1617406106824!5m2!1sen!2sus"
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

export default MtBaker;
