const expressAsyncHandler = require("express-async-handler");

const Report = require("../models/market");

const reportController = {
  // POST /api/reports

  addReport: expressAsyncHandler(async (req, res) => {
    // destructuring the data from body
    const {
      userId,
      marketId,
      marketName,
      cmdtyId,
      cmdtyName,
      marketType,
      minPrice,
      maxPrice,
      convFctr,
    } = req.body;

    const foundReports = await Report.findOne({ userId });

    // checking the database for duplicate userId as userId is unique
    if (foundReports) {
      res.status(404);
      throw new Error("This id already exists.");
    }

    // converting the min and max price from the given unit to Kg
    const convertedMinPrice = Math.floor(minPrice / convFctr);
    const convertedMaxPrice = Math.floor(maxPrice / convFctr);

    // creating new Report to save it into the database;
    const newReport = new Report({
      userId,
      marketId,
      marketName,
      cmdtyId,
      cmdtyName,
      marketType,
      priceUnit: "Kg",
      minPrice: Number(convertedMinPrice),
      maxPrice: Number(convertedMaxPrice),
      convFctr,
    });

    const savedReport = await newReport.save();

    res.status(200).json({
      status: "success",
      reportId: savedReport._id,
    });
  }),

  // POST /api/reports?cmdtyId

  getReport: expressAsyncHandler(async (req, res) => {
    const cmdtyId = req.query.cmdtyId || 0;

    if (!cmdtyId) {
      res.status(400);
      throw new Error("Specify commodity id.");
    }

    const reports = await Report.find({ cmdtyId });

    // if query has some unkown parameter ---> SEND Error
    if (!reports.length) {
      res.status(400);
      throw new Error("Invalid commodity id Or report not found.");
    }

    const users = [];
    reports.forEach((re) => users.push(re.userId));

    const totalCommodityLength = reports.length;

    // calculating the avg min and max prices for each cmdty Id
    let avgMaxPrice =
      reports.reduce((acc, re) => acc + re.maxPrice, 0) / totalCommodityLength;

    let avgMinPrice =
      (await reports.reduce((acc, re) => acc + re.minPrice, 0)) /
      totalCommodityLength;

    // final response with users array and the avg prices
    const finalResp = reports.map((re) => {
      return {
        ...re._doc,
        minPrice: avgMinPrice,
        maxPrice: avgMaxPrice,
        users,
      };
    });

    res.status(200).json(finalResp);
  }),
};

module.exports = reportController;
