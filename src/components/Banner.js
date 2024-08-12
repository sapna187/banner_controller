import React, { useEffect, useState } from "react";

function Banner({ description, timer, link }) {
  const [timeLeft, setTimeLeft] = useState(timer);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowMessage(true);
      return;
    }

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft]);

  if (showMessage) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          width: "60%",
          alignContent: "center",
          alignItems: "center",
          border: "1px solid #ddd",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          fontSize: "1.2em",
          color: "#333",
        }}
      >
        <p>Oops... Time's Up! Check back later.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        border: "1px solid #ddd",
        width: "60%",
        alignContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        fontSize: "1.2em",
        color: "#333",
      }}
    >
      <p>{description}</p>
      <p>Disappears in: {timeLeft} seconds</p>
      {link && (
        <a href={link} style={{ color: "#007bff", textDecoration: "none" }}>
          Click here
        </a>
      )}
    </div>
  );
}

export default Banner;
