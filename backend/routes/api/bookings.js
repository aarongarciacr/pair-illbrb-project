const { Booking, Spot } = require("../../db/models");
const express = require("express");
const { requireAuth } = require("../../utils/auth");
const router = express.Router("/bookings");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Sequelize } = require("sequelize");

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const bookings = await Booking.findAll({
    where: { userId: user.id },
    include: [{ model: Spot }],
  });

  return res.json(bookings);
});

const validateBooking = [
  check("startDate")
    .isDate()
    .withMessage("Start date must be a valid date")
    .isAfter(new Date().toLocaleDateString("en-CA"))
    .withMessage("Start date cannot be in the past"),
  check("endDate")
    .isDate()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      const { startDate } = req.body;
      if (new Date(value) <= new Date(startDate)) {
        throw new Error("End date must be after the start date");
      }
      return true;
    }),

  handleValidationErrors,
];

// Edit a Booking
router.put("/:bookingId", requireAuth, validateBooking, async (req, res) => {
  const bookingId = parseInt(req.params.bookingId);
  const userId = parseInt(req.user.id);

  const booking = await Booking.findOne({
    where: { id: bookingId, userId },
  });

  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  const bookingEndDate = new Date(booking.endDate);
  const currentDate = new Date();

  if (bookingEndDate < currentDate) {
    return res.status(403).json({
      message: "Past bookings can't be modified",
    });
  }

  const { startDate, endDate } = req.body;

  //this will return an array of objects
  // example:
  /*
  [
  {startDate: '2024-11-01'}
  {startDate: '2024-11-06'}
  {endDate: '2024-11-17'}
  ]
  */
  const allBookedDates = await Booking.findAll({
    where: {
      spotId: booking.spotId,
      id: { [Sequelize.Op.ne]: bookingId }, // Exclude current booking
    },
    attributes: ["startDate", "endDate"],
  });

  /*this will return an array with the Date values
  [
  '2024-11-01',
  '2024-11-01',
  '2024-11-02'
  ]
  */

  const bookedDates = allBookedDates.flatMap((booking) => [
    new Date(booking.startDate).toLocaleDateString("en-CA"),
    new Date(booking.endDate).toLocaleDateString("en-CA"),
  ]);

  if (bookedDates.includes(startDate) || bookedDates.includes(endDate)) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  await booking.update({
    startDate,
    endDate,
  });

  return res.status(200).json(booking);
});

router.delete("/:bookingId", requireAuth, async (req, res) => {
  const bookingId = parseInt(req.params.bookingId);
  const userId = parseInt(req.user.id);

  const booking = await Booking.findOne({
    where: { id: bookingId, userId },
  });

  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  const bookingEndDate = new Date(booking.endDate);
  const currentDate = new Date();

  if (bookingEndDate < currentDate) {
    return res.status(403).json({
      message: "Past bookings can't be deleted",
    });
  }

  await booking.destroy();

  return res.status(200).json(booking);
});

module.exports = router;
