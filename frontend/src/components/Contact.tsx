import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};

const Contact = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    // Here you can handle the form submission, e.g., sending data to an API
  };

  return (
    <div className="bg-dark p-3">
      <div className="w-100 bg-brown p-3">
        <h1 className="text-center text-light">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label className="fw-bold text-light" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex flex-column">
            <label className="fw-bold text-light" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex flex-column">
            <label className="fw-bold text-light" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formState.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex flex-column">
            <label className="fw-bold text-light" htmlFor="message">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="align-self-center justify-self-center text-center mt-3">
            <button className="btn btn-sm btn-light fw-bold" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
