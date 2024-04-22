import asyncHandler from "express-async-handler";
import Newsletter from "../models/newsletterModel.js";
import axios from "axios";

const postToMailingList = async (email, firstName, lastName) => {
  const url = "https://us7.api.mailchimp.com/3.0/lists/d6e266c429/members";
  const apiKey = process.env.MAILCHIMP_API_KEY;

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  };

  try {
    const response = await axios.post(url, data, {
      auth: {
        username: "anystring",
        password: apiKey,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding subscriber to Mailchimp:", error);
    throw new Error("Error adding subscriber to Mailchimp");
  }
};

const getMailchimpData = async () => {
  const url =
    "https://us7.api.mailchimp.com/3.0/campaigns?folder_id=c64693791f&sort_field=send_time&sort_dir=DESC";
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

    console.log("running");

    const newsletterIds = new Set(
      newsletters.map((newsletter) => newsletter.mailchimp_id)
    );
    const newMailChimpCampaigns = mailchimpData.campaigns.filter(
      (campaign) => !newsletterIds.has(campaign.id)
    );

    console.log(mailchimpData.campaigns);

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

    res.json(await Newsletter.find({}).sort({ create_time: -1 }));
  } catch (error) {
    console.error("Error in getNewsletters:", error);
    res.status(500).send("An error occurred");
  }
});

const updateNewsletter = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const { imageUrl } = req.body;
  const newsletter = await Newsletter.findById(_id);

  if (newsletter) {
    newsletter.imageUrl = imageUrl;
    await newsletter.save();
    res.json(newsletter);
  } else {
    res.status(404).json({ message: "Newsletter not found" });
  }
});

export { getNewsletters, updateNewsletter, postToMailingList };
