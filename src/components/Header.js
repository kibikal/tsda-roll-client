import React from 'react'
import ndclogo from "../images/coat.png";

function Header() {
  return (
    <header>
      <img src={ndclogo} className="logo ndc-logo" alt="ndc-logo" />
      <h1 className="main-heading">Ministry Of Local Government And Rural Dev't</h1>
      <h3 className='district'>Tatale-Sanguli District Assembly</h3>
    </header>
  );
}

export default Header