import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import axios from "axios";

function HomePage() {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    const fetchBannerData = () => {
      axios
        .get("https://d1dflmwcyl.execute-api.us-east-1.amazonaws.com/dev/banner")
        .then((response) => setBannerData(response.data))
        .catch((error) => console.error("Error fetching banner data:", error));
    };

    fetchBannerData();

    const interval = setInterval(fetchBannerData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: "20px", // Padding around the main container
        position: "relative", // Allow positioning of child elements like the Dashboard button
      }}
    >
      {/* Dashboard Button */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
      >
        <button
          onClick={() => window.open("/dashboard", "_blank")}
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#0056b3";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#007bff";
          }}
        >
          Dashboard
        </button>
      </div>

      <h1
        style={{
          padding: "20px",
          textAlign: "center", // Center the text
          fontSize: "2em", // Adjust font size
          color: "#333", // Darker text color for better contrast
        }}
      >
        Welcome to TakeUForward!
      </h1>

      {bannerData ? (
        bannerData.visibility ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
              backgroundImage: bannerData.backgroundImage
                ? `url(${bannerData.backgroundImage})`
                : `url("https://t4.ftcdn.net/jpg/04/89/68/23/360_F_489682374_ckc0OVyT6Av0NGcuYbwBSCxy62blF4CQ.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "20px",
              borderRadius: "15px", // Rounded corners
              border: "2px solid #ccc", // Subtle border
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for depth
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
                height: "100%", // Make sure it takes up the full height of its container
                padding: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Light shadow for content box
                textAlign: "center", // Center text inside the content box
              }}
            >
              <Banner
                description={bannerData.description}
                timer={bannerData.timer}
                link={bannerData.link}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              textAlign: "center",
              fontSize: "1.2em",
              color: "#999",
            }}
          >
            <p>No data present at the moment</p>
          </div>
        )
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            textAlign: "center",
            fontSize: "1.2em",
            color: "#999",
          }}
        >
          <p>Loading data...</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
