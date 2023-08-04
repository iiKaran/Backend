const mongoose = require("mongoose");

const dbConnect = async () => {
 mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
 }).then(() => {
  console.log("Succesfully connected ")
 }).catch((err) => {
  console.log("failed to connect ")
  console.log(err)
 })
}
module.exports = dbConnect