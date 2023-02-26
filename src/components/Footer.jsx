import React from 'react';
import ReactDOM from 'react-dom/client';

function Footer() {
  return (
    <div className='footer'>
      <h3>Contact - Aaditya Nayak</h3>
      <ul className='footer--contacts'>
            <li>
            <a href="https://www.linkedin.com/in/aaditya-nayak-an73a8208/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            </li>
            <li>
            <a href="https://github.com/AadityaNayak" target="_blank" rel="noreferrer"><i className="fa-brands fa-square-github"></i></a>
            </li>
            {/* <li>
            <a href="" target="_blank"><i className="fa-solid fa-envelope"></i></a>
            </li> */}
        </ul>
    </div>
  );
}

export default Footer;
