import React from 'react'
import { IoIosDownload } from "react-icons/io";
import { Link } from "react-router-dom";

function ResumeGenerator() {
  return (
    <div className="container-fluid">
      <h2 className="text-center mt-5">Create a Job-Winning Resume in Minutes</h2>

      <div style={{ height: '60vh' }} className="row justify-content-center align-items-center">
        {/* Step 1 */}
        <div className="col-md-1"></div>
        <div className="col-md-4 border rounded shadow p-5 text-center">
          <IoIosDownload className="text-primary fs-1 mb-3" />
          <h4>Add your Information</h4>
          <p>Add pre-written examples to each section</p>
          <h5>Step 1</h5>
        </div>

        {/* Step 2 */}
        <div className="col-md-1"></div>
        <div className="col-md-4 border rounded shadow p-5 text-center">
          <IoIosDownload className="text-danger fs-1 mb-3" />
          <h4>Download your Resume</h4>
          <p>Download and start applying</p>
          <h5>Step 2</h5>
        </div>
        <div className="col-md-1"></div>
      </div>

      {/* Button */}
      <div className="text-center mt-5">
        <Link to={"/form"} className="btn text-white m-5" style={{ backgroundColor: 'black' }}>
          LET'S START
        </Link>
      </div>
    </div>
  );
}

export default ResumeGenerator;
