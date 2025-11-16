import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import React from 'react'

function Preview({ resumeDetails = {} }) {
  // Use default empty arrays for safer access
  const {
    userName,
    jobTitle,
    location,
    email,
    phoneNumber,
    githubProfile,
    linkedInProfile,
    portfolioLink,
    summary,
    courseName,
    collegeName,
    university,
    graduationYear,
    jobType,
    companyName,
    companyLocation,
    duration,
    skills = [],
  } = resumeDetails || {};

  return (
    <div style={{ margin: '70px' }} className='shadow p-5 w-100 rounded text-center'>
      <h3>{userName || 'Your Name'}</h3>
      <h4 className='m-2'>{jobTitle || 'Job Title'}</h4>

      <p>
        <span className='mx-2'>{location}</span> |
        <span className='mx-2'>{email}</span> |
        <span className='mx-2'>{phoneNumber}</span>
      </p>

      <p className='my-2'>
        {githubProfile && <a href={githubProfile} target='_blank' className='mx-1'>GITHUB</a>} |
        {linkedInProfile && <a href={linkedInProfile} target='_blank' className='mx-1'>LINKEDIN</a>} |
        {portfolioLink && <a href={portfolioLink} target='_blank' className='mx-1'>PORTFOLIO</a>}
      </p>

      <Divider sx={{ fontSize: '25px' }}>Summary</Divider>
      <p style={{ textAlign: 'justify' }} className='my-3'>{summary}</p>

      <Divider sx={{ fontSize: '25px' }}>Education</Divider>
      <h5 className='m-2'>{courseName}</h5>
      <p>
        <span className='mx-2'>{collegeName}</span> |
        <span className='mx-2'>{university}</span> |
        <span className='mx-2'>{graduationYear}</span>
      </p>

      <Divider sx={{ fontSize: '25px' }}>Work Experience</Divider>
      <h5 className='m-2'>{jobType}</h5>
      <p>
        <span className='mx-2'>{companyName}</span> |
        <span className='mx-2'>{companyLocation}</span> |
        <span className='mx-2'>{duration}</span>
      </p>

      <Divider sx={{ fontSize: '25px' }}>Skills</Divider>
      <div className='d-flex flex-wrap justify-content-between my-3'>
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <Button key={index} variant='contained' className='m-1'>
              {skill}
            </Button>
          ))
        ) : (
          <p>No skills added yet</p>
        )}
      </div>
    </div>
  )
}

export default Preview
