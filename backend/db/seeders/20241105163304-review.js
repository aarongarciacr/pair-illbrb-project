"use strict";

const { Review } = require("../models");

const options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          userId: 2,
          spotId: 1,
          review:
            "The view from this spot was absolutely breathtaking and relaxing.",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 1,
          review: "It was a decent stay, but the amenities could be improved.",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 1,
          review:
            "The location was okay, but the noise levels were unbearable.",
          stars: 2,
        },
        {
          userId: 4,
          spotId: 2,
          review:
            "The host was extremely accommodating, and the place was clean.",
          stars: 4,
        },
        {
          userId: 5,
          spotId: 2,
          review:
            "A wonderful getaway spot with excellent views and great vibes.",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 2,
          review:
            "The overall experience was ruined by poor service and delays.",
          stars: 2,
        },
        {
          userId: 7,
          spotId: 3,
          review: "A great place to relax and unwind, especially with family.",
          stars: 4,
        },
        {
          userId: 8,
          spotId: 3,
          review:
            "Beautiful interiors and exteriors but lacked basic facilities.",
          stars: 3,
        },
        {
          userId: 9,
          spotId: 3,
          review:
            "The property was stunning, but cleanliness was a huge issue.",
          stars: 2,
        },
        {
          userId: 10,
          spotId: 4,
          review: "Perfect for a weekend getaway with friends or loved ones.",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 4,
          review:
            "A very relaxing environment but could use better maintenance.",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 4,
          review:
            "The property was fine but lacked modern amenities as advertised.",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 5,
          review:
            "The place was spacious and airy, making it feel very homely.",
          stars: 4,
        },
        {
          userId: 4,
          spotId: 5,
          review:
            "The cleanliness and location made this stay a worthwhile choice.",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 5,
          review: "Despite good reviews, we found the service to be subpar.",
          stars: 2,
        },
        {
          userId: 7,
          spotId: 6,
          review: "A good place with a stunning view but overpriced overall.",
          stars: 3,
        },
        {
          userId: 1,
          spotId: 6,
          review: "The host was very kind, and the spot exceeded expectations.",
          stars: 5,
        },
        {
          userId: 8,
          spotId: 6,
          review: "The property had a lot of potential but failed to deliver.",
          stars: 2,
        },
        {
          userId: 9,
          spotId: 7,
          review: "A hidden gem with amazing facilities and great hospitality.",
          stars: 5,
        },
        {
          userId: 10,
          spotId: 7,
          review:
            "A little expensive, but the views made up for the high price.",
          stars: 4,
        },
        {
          userId: 1,
          spotId: 7,
          review: "Good location but very noisy and not suitable for families.",
          stars: 2,
        },
        {
          userId: 2,
          spotId: 8,
          review: "A fantastic spot for solo travelers or couples to unwind.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 8,
          review:
            "A decent stay, but some key facilities were missing altogether.",
          stars: 3,
        },
        {
          userId: 4,
          spotId: 8,
          review:
            "The cleanliness and lack of attention to detail were disappointing.",
          stars: 2,
        },
        {
          userId: 5,
          spotId: 9,
          review:
            "An excellent spot with a scenic view and luxurious amenities.",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 9,
          review:
            "The location was perfect, but the spot needed better upkeep.",
          stars: 4,
        },
        {
          userId: 7,
          spotId: 9,
          review:
            "The service was terrible, and the staff were very unhelpful.",
          stars: 1,
        },
        {
          userId: 8,
          spotId: 10,
          review:
            "The experience was fantastic, and I’d recommend it to everyone.",
          stars: 5,
        },
        {
          userId: 9,
          spotId: 10,
          review:
            "Good for short stays, but a little overpriced for the quality.",
          stars: 3,
        },
        {
          userId: 1,
          spotId: 10,
          review: "I wouldn’t recommend it, as the service was below average.",
          stars: 2,
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: Array.from({ length: 10 }, (_, i) => i + 1) },
    });
  },
};
