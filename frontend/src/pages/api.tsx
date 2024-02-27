import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios

const Api = () => {
  const [data, setData] = useState<any>("data");

  const fetchData = async () => {
    try {
      // Assuming your MAILCHIMP_ENDPOINT includes the full URL (e.g., https://usX.api.mailchimp.com/3.0/lists/)
      // and you've stored your API key in an environment variable named NEXT_PUBLIC_MAILCHIMP_API_KEY
      const apiUrl = `${process.env.NEXT_PUBLIC_MAILCHIMP_ENDPOINT}`;
      const apiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
      const response = await axios.get(apiUrl, {
        // Mailchimp uses basic auth, format the header accordingly
        auth: {
          username: "anystring", // Mailchimp API does not use this value, so 'anystring' is a placeholder
          password: apiKey as string, // Your actual API key
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data) {
    console.log(data);
  } else {
    console.log("no data");
  }

  return <div>Hi</div>;
};

export default Api;
