import React from "react";

export default function Layout({ children }) {
  return (
    <div className='container'>
      <header className='d-flex justify-content-center p-4'>
        <img
          style={{ maxWidth: "200px" }}
          src='https://4394269.fs1.hubspotusercontent-na1.net/hubfs/4394269/di%20logo%20long.png'
          alt=''
        />
      </header>
      {children}
    </div>
  );
}
