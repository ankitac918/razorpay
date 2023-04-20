const express = require("express");
const app = express();
const port = 3000;
app.use(express.json())
// const Razorpay = require("razorpay");
const request = require("request");

app.get("/", (req, res) => {
  res.send("Hello");
}); 

var username = "rzp_test_G6n8I0oDzmfPmz";
var password = "J1gsiayK5rcSKgvBoADLA2gH";
var auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");

app.post("/payment", function (req, res) {
  let { amount, currency, receipt } = req.body;
  console.log(req.body);
  var options = {
    url: "https://api.razorpay.com/v1/orders",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify({
      amount: amount,
      currency: currency,
      receipt: receipt,
    }),
  };

  request(options, function (error, response, body) {
    if (!error) {
      // Print out the response body
      console.log(body);
      console.log(response.statusCode);
      res.sendStatus(200);
    } else {
      console.log(error);
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
