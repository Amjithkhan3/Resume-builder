import React, { useState } from 'react';
import UserInput from '../components/UserInput';
import Preview from '../components/Preview';

function UserForm() {
   const [resumeDetails, setResumeDetails] = useState({
    userName: '',
    jobTitle: '',
    location: '',
    email: '',
    phoneNumber: '',
    githubProfile: '',
    linkedInProfile: '',
    portfolioLink: '',
      courseName: '',
      collegeName: '',
      university: '',
      graduationYear: '',
      jobType: '',
      companyName: '',
      companyLocation: '',
      duration: '',
    skills: [],
    summary: '',
  });
  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-lg-6 col-md-12">
          <UserInput resumeDetails={resumeDetails} setResumeDetails={setResumeDetails} />
        </div>

        <div className="col-lg-6 col-md-12">
          {
            resumeDetails.userName &&
            <Preview  resumeDetails={resumeDetails} />
            }
        </div>
      </div>
    </div>
  );
}

export default UserForm;
