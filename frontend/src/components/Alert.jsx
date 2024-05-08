import React, { useState, useEffect } from 'react';

function Popup() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // You can set a timeout to automatically close the popup after a certain time
    const popupTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 5000); // Close the popup after 5 seconds (adjust as needed)

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(popupTimeout);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={handleClose}>&times;</span>
            <b><h1>WELCOME TO DISASTER RESILIENCE!</h1></b>
            <br />
            <h2>Do you want help?</h2>
            <div className="button-container">
              <div className="button button1">
                <h3>HELP</h3>
              </div>
              <br />
              <h2>Are you in a helpless situation?</h2>
              <div className="button button2">
                <h3>EMERGENCY</h3>
              </div>
              <br />
              
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          /* Add your CSS styles here */
          .popup {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999; /* Ensure the popup is on top */
          }

          .popup-content {
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            text-align: center;
          }

          .close-popup {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            cursor: pointer;
          }

          /* Style for the button container */
          .button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          /* Style for each button */
          .button {
            background-color: #3498db; /* Blue color, you can change it */
            color: #fff;
            border: none;
            border-radius: 10px;
            padding: 10px 20px;
            margin: 5px;
            cursor: pointer;
            width:170px;
          }
          .button1{
            background-color:green;
          }
          .button2{
            background-color:red;
          }
          .button3{
            background-color:blue;
          }
          /* Hover effect for buttons */
          .button:hover {
            background-color: #2980b9; /* Darker blue on hover */
          }
        `}
      </style>
    </>
  );
}

export default Popup;
