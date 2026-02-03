// import React from 'react'

interface Props {
  isLiked: boolean;
}

const DummyInboxItem = ({ isLiked }: Props) => {
  return (
    // PLACEHOLDER CARD, use typescript to actually display the items !!!
    <div
      id="inboxItem"
      className="d-flex flex-row justify-content-between align-items-center w-100 flex-shrink-0 placeholder-glow"
      style={{
        border: "none",
        backgroundColor: "white",
        borderRadius: "7px",
        height: "4.5rem",
      }}
    >
      <div className="col-8 d-flex flex-row justify-content-start align-items-center ps-4">
        <div
          id="profileIconBox"
          className="d-flex justify-content-center align-items-center flex-shrink-0"
          style={{ backgroundColor: "black", width: "35px", height: "35px" }}
        >
          <img src="/src/assets/user_icon.svg" alt="user icon" />
        </div>
        <div
          id="inboxDescription"
          className="d-flextext-black fw-bold ms-3 col-8"
        >
          {isLiked ? (
            <p className="mb-0 text-black">
              'user' has reacted to your <a href="/">post</a>!
            </p>
          ) : (
            <p className="mb-0 text-black">
              'user' copied your email! Go check it out!
            </p>
          )}
        </div>
      </div>
      <div className="col-4 d-flex flex-row justify-content-center align-items-center pe-4">
        <div
          id="inboxDate"
          className="text-muted d-flex flex-row justify-content-end align-items-center"
        >
          7 minutes ago
        </div>
      </div>
    </div>
  );
};

export default DummyInboxItem;
