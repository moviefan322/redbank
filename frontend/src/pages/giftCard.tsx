import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./giftCard.module.css";

const GiftCard = () => {
  const [giftCards, setGiftCards] = useState<any[]>([]);

  const fetchGiftCards = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/giftCards`
      );
      const data = await res.json();
      setGiftCards(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGiftCards();
  }, []);

  console.log(giftCards);
  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center bg-dark p-5">
        <div className={`${styles.image} col-md-6`}></div>
        <div className="text-light p-4 text-center col-md-6">
          <h2>Gift Card</h2>
          <p>
            A digital gift card that’s perfect for all occasions! It’s easy to
            use, easy to gift, and accepted at many of your favorite downtown
            Red Bank businesses!
          </p>
          <Link
            href="https://app.yiftee.com/gift-card/red-bank?"
            className="nostyle-link"
          >
            <button className="btn btn-sm btn-secondary">Purchase</button>
          </Link>
        </div>
      </div>
      <div className="py-5 mx-4">
        <h2 className="mx-auto text-center">Description</h2>
        <ul>
          <li className="fw-bold">Available in any amount $5-$250</li>
          <li>Works just like a Mastercard.</li>
          <li>
            Accepted at a growing list of your favorite downtown Red Bank
            businesses.
          </li>
          <li>Purchase any time! Great for a last-minute gift!</li>
          <li>
            Can be sent directly to the e-mail address of the gift recipient.
          </li>
          <li>Digital card may be printed out to use in physical form.</li>
          <li>Tap to pay coming soon!</li>
        </ul>
      </div>
      <div className="mx-4 pb-5">
        <h5 className="fw-bold">
          Red Bank Bucks is accepted at these fine downtown Red Bank
          establishments:
        </h5>
        <div className="d-flex flex-wrap">
          {giftCards.map((giftCard, index) => {
            return (
              <div className="col-6 col-md-4 my-2" key={index}>
                {giftCard.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
