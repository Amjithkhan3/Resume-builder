import React from 'react'
import { FaEdit } from "react-icons/fa";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState,useRef } from 'react';
import TextField from '@mui/material/TextField';
import { FaXmark } from "react-icons/fa6";
import { updateResumeAPI } from '../services/allAPI';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function Edit({resumeDetails, setResumeDetails}) {
    const [open,setOpen] = useState(false)
    const skillRef = useRef();
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

     const addSkill = (skill) => {
    if (!skill.trim()) return;
    if (resumeDetails.skills.includes(skill)) {
      alert('Skill already added');
    } else {
      setResumeDetails({
        ...resumeDetails,
        skills: [...resumeDetails.skills, skill]
      });
      skillRef.current.value = '';
    }
  };

  const removeSkill = (skill) => {
    setResumeDetails({
      ...resumeDetails,
      skills: resumeDetails.skills.filter((item) => item !== skill)
    });
  };

  const handleUpdateResume = async () => {
    const {id, userName, jobTitle, location } = resumeDetails;
        if (!userName && !jobTitle && !location) {
          alert("Please fill the required fields");
        }else{
          console.log("API call")
        try {
          const result = await updateResumeAPI(id,resumeDetails);
          console.log(result);
          if (result.status === 200) {
            alert("Resume updated successfully");
            handleClose();
            }
          
          
        } catch (err) {
          console.log(err);
        }
      }
      };


  return (
    <>
   <button onClick={handleOpen} className="btn fs-3 text-warning"><FaEdit /></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Resume Details
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Form fields for editing resume details would go here */}
                        {/* basic info */}
                      <div>
                        <h1>Basic Information</h1>
                        <div className="row p-3">
                          <TextField
                            value={resumeDetails.userName}
                            onChange={e => setResumeDetails({ ...resumeDetails, userName: e.target.value })}
                            label="Full Name"
                            variant="standard"
                          />
                          <TextField
                            value={resumeDetails.jobTitle}
                            onChange={e => setResumeDetails({ ...resumeDetails, jobTitle: e.target.value })}
                            label="Job Title"
                            variant="standard"
                          />
                          <TextField
                            value={resumeDetails.location}
                            onChange={e => setResumeDetails({ ...resumeDetails, location: e.target.value })}
                            label="Location"
                            variant="standard"
                          />
                        </div>
                      </div>

                        {/* contact details */}
                      <div>
                                  <h1>Contact Details</h1>
                                  <div className="row p-3">
                                    <TextField value={resumeDetails.email} onChange={e => setResumeDetails({ ...resumeDetails, email: e.target.value })} label="Email Address" variant="standard" />
                                    <TextField value={resumeDetails.phoneNumber} onChange={e => setResumeDetails({ ...resumeDetails, phoneNumber: e.target.value })} label="Phone Number" variant="standard" />
                                    <TextField value={resumeDetails.githubProfile} onChange={e => setResumeDetails({ ...resumeDetails, githubProfile: e.target.value })} label="Github Profile" variant="standard" />
                                    <TextField value={resumeDetails.linkedInProfile} onChange={e => setResumeDetails({ ...resumeDetails, linkedInProfile: e.target.value })} label="LinkedIn Profile" variant="standard" />
                                    <TextField value={resumeDetails.portfolioLink} onChange={e => setResumeDetails({ ...resumeDetails, portfolioLink: e.target.value })} label="Portfolio Link" variant="standard" />
                                  </div>
                                </div>

                        {/* education details */}
                    <div>
                                <h1>Education Details</h1>
                                <div className="row p-3">
                                  <TextField value={resumeDetails.courseName} onChange={e => setResumeDetails({ ...resumeDetails, courseName: e.target.value })} label="Course Name" variant="standard" />
                                  <TextField value={resumeDetails.collegeName} onChange={e => setResumeDetails({ ...resumeDetails, collegeName: e.target.value })} label="College Name" variant="standard" />
                                  <TextField value={resumeDetails.university} onChange={e => setResumeDetails({ ...resumeDetails, university: e.target.value })} label="University" variant="standard" />
                                  <TextField value={resumeDetails.graduationYear} onChange={e => setResumeDetails({ ...resumeDetails, graduationYear: e.target.value })} label="Year of Graduation" variant="standard" />
                                </div>
                              </div>
                      {/* work experience */}
                     <div>
                                <h1>Work Experience</h1>
                                <div className="row p-3">
                                  <TextField value={resumeDetails.jobType} onChange={e => setResumeDetails({ ...resumeDetails, jobType: e.target.value })} label="Job or Internship" variant="standard" />
                                  <TextField value={resumeDetails.companyName} onChange={e => setResumeDetails({ ...resumeDetails, companyName: e.target.value })} label="Company Name" variant="standard" />
                                  <TextField value={resumeDetails.companyLocation} onChange={e => setResumeDetails({ ...resumeDetails, companyLocation: e.target.value })} label="Company Location" variant="standard" />
                                  <TextField value={resumeDetails.duration} onChange={e => setResumeDetails({ ...resumeDetails, duration: e.target.value })} label="Duration" variant="standard" />
                                </div>
                              </div>

                              {/* skill */}
     <div>
            <h1>Skills</h1>
            <div className="d-flex align-items-center justify-content-between p-3">
              <input ref={skillRef} placeholder='Add skill' type="text" className='form-control' />
              <button onClick={() => addSkill(skillRef.current.value)} className='m-2 px-3 py-1 text-bg-dark border border-1'>ADD</button>
            </div>
           
            <h5>Added Skills:</h5>
            <div className="d-flex flex-wrap justify-content-between my-3">
              {resumeDetails.skills?.length > 0 ? (
                resumeDetails.skills.map((skill, index) => (
                  <Button key={index} variant="contained" className="m-1">
                    {skill}
                    <FaXmark className='ms-2' onClick={() => removeSkill(skill)} />
                  </Button>
                ))
              ) : (
                <p className='fw-bolder'>No skills added yet.</p>
              )}
            </div>
          </div>

                              {/* summary */}


                    <div>
                                <h1>Summary</h1>
                                <div className="p-3 row">
                                  <TextField
                                    onChange={e => setResumeDetails({ ...resumeDetails, summary: e.target.value })}
                                    label="Write a short summary of yourself"
                                    variant="standard"
                                    multiline
                                    rows={6}
                                    defaultValue={"Experienced Software Developer with a demonstrated history of working in the tech industry. Skilled in Full Stack Development, Problem Solving, and Agile Methodologies. Strong engineering professional with a Bachelor's degree in Computer Science. Passionate about building efficient and scalable web applications. "}
                                  />
                                </div>
                              </div>

                {/* update button */}
            <div className="d-flex justify-content-end">
                <button onClick={handleUpdateResume} className="btn btn-primary px-4 py-2">Update</button>
            </div>

          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default Edit
