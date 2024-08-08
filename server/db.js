const mongoose = require("mongoose");
const mongoUri =
  "mongodb+srv://fzdsharmarajat:foodapp@cluster0.whwjrhf.mongodb.net/foodapp?";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully");

    const fetched_data = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();
    const food_category = await mongoose.connection.db
      .collection("food_category")
      .find({})
      .toArray();

    global.food_items = fetched_data;
    global.food_category = food_category;
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = connectToMongoDB;
