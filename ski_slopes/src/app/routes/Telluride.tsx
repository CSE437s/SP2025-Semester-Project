import React from 'react';

const Telluride = () => {
  return (
    <div className="max-w-4xl mx-auto pt-16 px-8">
      <h1 className="text-4xl font-bold mb-4">Telluride Ski Resort</h1>
      <img
        src="/assets/cardsinfo/telluride-map.jpg"
        alt="Telluride"
        className="rounded-lg mb-6"
      />
      <p className="mb-4">
        Nestled in Colorado's San Juan Mountains, Telluride Ski Resort offers diverse terrain, historic charm, and panoramic alpine views. It’s an ideal mix of challenging slopes and scenic leisure skiing.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Location:</strong> Telluride, Colorado</li>
        <li><strong>Top Elevation:</strong> 13,150 ft</li>
        <li><strong>Base Elevation:</strong> 8,725 ft</li>
        <li><strong>Vertical Drop:</strong> 4,425 ft</li>
        <li><strong>Skiable Terrain:</strong> 2,000+ acres</li>
        <li><strong>Number of Trails:</strong> 148</li>
        <li><strong>Annual Snowfall:</strong> 330 inches</li>
        <li><strong>Lift System:</strong> 17 lifts including 2 gondolas and 12 chairlifts</li>
      </ul>
      <div className="mb-6">
        <iframe
          title="Telluride Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.5485595701476!2d-107.81228508469256!3d37.93749087972902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8737bd4378a95b8b%3A0x2f82e9b1c0edcaa6!2sTelluride%20Ski%20Resort!5e0!3m2!1sen!2sus!4v1649795706870!5m2!1sen!2sus"
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

export default Telluride;