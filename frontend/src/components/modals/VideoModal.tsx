import React from "react";

interface videoModalProps {
  // isOpen: boolean;
  // onClose: () => void;
  videoUrl: string;
}

const VideoModal = ({ videoUrl }: videoModalProps) => {
  return (
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center">
        <div className="position-relative">
          <img src="/redbankLogo1.png" className="img-fluid" />
          <a
            className="video-btn"
            data-bs-toggle="modal"
            data-bs-target="#videoModal"
            data-bs-src={videoUrl}
          >
            <span className="video-play-button">
              {" "}
              <span></span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
