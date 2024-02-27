import axios from "axios";

export const getMailchimpData = async (req, res) => {
  try {
    const url =
      "https://us7.api.mailchimp.com/3.0/campaigns?folder_id=c64693791f";
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const response = await axios.get(url, {
      auth: {
        username: "anystring",
        password: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Mailchimp:", error);
    res.status(500).send("Error fetching data from Mailchimp");
  }
};
