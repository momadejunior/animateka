import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="b-footer">
      <div className="footer-item">
        <div>
          <img src="http://animateka.co.mz/wp-content/uploads/2024/06/qr.png" alt="QR Code" />
        </div>
        <Link to="/about">
          <img src="http://animateka.co.mz/wp-content/uploads/2024/06/info.png" alt="Info" />
        </Link>
      </div>
    </footer>
  );
}
