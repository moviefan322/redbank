import asyncHandler from "express-async-handler";
import Newsletter from "../models/newsletterModel.js";
import axios from "axios";

const getMailchimpData = async () => {
  const url =
    "https://us7.api.mailchimp.com/3.0/campaigns?folder_id=c64693791f";
  const apiKey = process.env.MAILCHIMP_API_KEY;
  try {
    const response = await axios.get(url, {
      auth: { username: "anystring", password: apiKey },
    });
    return response.data; // Assuming this returns an object with the data you need
  } catch (error) {
    console.error("Error fetching data from Mailchimp:", error);
    throw new Error("Error fetching data from Mailchimp");
  }
};

const getNewsletters = asyncHandler(async (req, res) => {
  try {
    const mailchimpData = await getMailchimpData();
    const newsletters = await Newsletter.find({});

    const newMailChimpCampaigns = mailchimpData.campaigns.filter(
      (campaign) =>
        !newsletters.some(
          (newsletter) => newsletter.mailchimp_id === campaign.id
        )
    );

    for (const campaign of newMailChimpCampaigns) {
      const newNewsletter = new Newsletter({
        mailchimp_id: campaign.id,
        url: campaign.archive_url,
        create_time: campaign.create_time,
        subject_line: campaign.settings.subject_line,
        imageUrl: "",
      });
      await newNewsletter.save();
    }

    res.json(await Newsletter.find({})); // Fetch updated list
  } catch (error) {
    console.error("Error in getNewsletters:", error);
    res.status(500).send("An error occurred");
  }
});

const updateNewsletter = asyncHandler(async (req, res) => {
  const { imageUrl, _id } = req.body;
  const newsletter = await Newsletter.findById(_id);

  if (newsletter) {
    newsletter.imageUrl = imageUrl;
    await newsletter.save();
    res.json(newsletter);
  } else {
    res.status(404).json({ message: "Newsletter not found" });
  }
});

export { getNewsletters, updateNewsletter };
