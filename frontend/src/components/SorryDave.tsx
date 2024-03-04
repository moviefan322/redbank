import React from "react";
import Link from "next/link";

const SorryDave = () => {
  return (
    <div className="admin d-flex flex-column justify-content-center">
      <h1 className="mx-3 text-center">
        {`I'm sorry Dave, I'm afraid I can't do that.`}
      </h1>
      <br />
      <br />
      <h5 className="text-center">
        You must <Link href="/admin">log in</Link> to access this page.
      </h5>
    </div>
  );
};

export default SorryDave;
