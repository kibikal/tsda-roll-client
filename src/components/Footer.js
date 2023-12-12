import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer>
        <p>
          &copy; Tatale-Sanguli District Assembly || Kibikal Technologies{" "}
          {currentYear}
        </p>
      </footer>
    </div>
  );
}

export default Footer;
