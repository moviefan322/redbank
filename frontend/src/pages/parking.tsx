import React from "react";
import Link from "next/link";
import styles from "./parking.module.css";

// https://res.cloudinary.com/dnaj4dehf/image/upload/v1709758936/Screenshot_2024-03-06_at_4.00.22_PM_unna7s.png

const Parking = () => {
  return (
    <div className="col-10 d-flex mx-auto flex-column align-items-center justify-content-center py-5">
      <h1 className="pb-5">Parking</h1>
      <div className="d-flex flex-column flex-md-row justify-content-around">
        <div className={`${styles.parkingImage} col-6`}></div>
        <div className="bg-dark text-light text-center col-md-4 p-4">
          <h5>Parking Info</h5>
          <ul>
            <li>Free parking throughout downtown every Sunday.</li>
            <li>Free Holiday Parking December 13-25</li>
            <li>Cash and Credit accepted at most meters</li>
            <li>
              Download the{" "}
              <Link href="https://www.mpay2park.com/">mPay2 APP</Link> to create
              an account and save time when purchasing
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-wrap d-flex align-items-center mx-auto col-10">
        <div className="d-flex flex-column mt-5 col-12 col-md-5 mx-5">
          <h5 className="text-center">1</h5>
          <hr />
          <p className="fw-bold text-center">NJ Transit Parking Lot</p>
          <li>Permit parking only until 11am.</li>
          <li>Free public Parking after 11am.</li>
        </div>

        <div className="d-flex flex-column mt-5 col-12 col-md-5 mx-5">
          <h5 className="text-center">2</h5>
          <hr />
          <p className="fw-bold text-center">NJ Transit Parking Lot</p>
          <li>Permit parking only until 11am.</li>
          <li>Free public Parking after 11am.</li>
        </div>

        <div className="d-flex flex-column mt-5 col-12 col-md-5 mx-5">
          <h5 className="text-center">3</h5>
          <hr />
          <p className="fw-bold text-center">Gold Street Lot</p>
          <li>Paid public parking as indicated.</li>
          <li>Permit parking only in designated spaces from 9am-2pm.</li>
        </div>

        <div className="d-flex flex-column mt-5 col-12 col-md-5 mx-5">
          <h5 className="text-center">4</h5>
          <hr />
          <p className="fw-bold text-center">White Street Lot</p>
          <li>Paid public parking as indicated</li>
          <li>Permit parking only in designated spaces from 9am-2pm.</li>
        </div>

        <div className="d-flex flex-column mt-5 col-12 col-md-5 mx-5">
          <h5 className="text-center">5</h5>
          <hr />
          <p className="fw-bold text-center">White Street Lot</p>
          <li>Paid public parking</li>
        </div>

        <div className="d-flex flex-column mt-5 col-12 col-md-5 mx-5">
          <h5 className="text-center">6</h5>
          <hr />
          <p className="fw-bold text-center">Mechanic Street Small Lot</p>
          <li>Paid public parking</li>
        </div>

        <div className="d-flex flex-column mt-5 col-12 col-md-5 mx-5">
          <h5 className="text-center">7</h5>
          <hr />
          <p className="fw-bold text-center">
            {`East Side Lot (Mechanic @ Wallace Street Lots)`}
          </p>
          <li>Paid public parking as indicated</li>
          <li>Permit parking only in designated spaces.</li>
          <li>Certain spaces permit parking from 9am-2pm or 6am-6pm.</li>
        </div>
      </div>
    </div>
  );
};

export default Parking;
