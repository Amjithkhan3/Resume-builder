import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FaXmark } from "react-icons/fa6";
import { addResumeAPI } from "../services/allAPI";
import { useNavigate } from 'react-router-dom';

const steps = [
  'Basic Information',
  'Contact Details',
  'Education Details',
  'Work Experience',
  'Skills & Certifications',
  'Review & Submit'
];

export default function UserInputs({ resumeDetails, setResumeDetails }) {
  const skillSuggestions = [
    'JavaScript', 'React', 'Node js', 'Python', 'Django',
    'Machine Learning', 'Data Analysis', 'SQL', 'NoSQL',
    'AWS', 'Docker', 'Kubernetes', 'Java', 'C++', 'HTML',
    'CSS', 'TypeScript'
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const skillRef = React.useRef();

  const navigate = useNavigate();

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevStep) => prevStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSkipped(new Set());
  };

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

  const renderSteps = (stepCount) => {
    switch (stepCount) {
      case 0:
        return (
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
        );

      case 1:
        return (
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
        );

      case 2:
        return (
          <div>
            <h1>Education Details</h1>
            <div className="row p-3">
              <TextField value={resumeDetails.courseName} onChange={e => setResumeDetails({ ...resumeDetails, courseName: e.target.value })} label="Course Name" variant="standard" />
              <TextField value={resumeDetails.collegeName} onChange={e => setResumeDetails({ ...resumeDetails, collegeName: e.target.value })} label="College Name" variant="standard" />
              <TextField value={resumeDetails.university} onChange={e => setResumeDetails({ ...resumeDetails, university: e.target.value })} label="University" variant="standard" />
              <TextField value={resumeDetails.graduationYear} onChange={e => setResumeDetails({ ...resumeDetails, graduationYear: e.target.value })} label="Year of Graduation" variant="standard" />
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h1>Work Experience</h1>
            <div className="row p-3">
              <TextField value={resumeDetails.jobType} onChange={e => setResumeDetails({ ...resumeDetails, jobType: e.target.value })} label="Job or Internship" variant="standard" />
              <TextField value={resumeDetails.companyName} onChange={e => setResumeDetails({ ...resumeDetails, companyName: e.target.value })} label="Company Name" variant="standard" />
              <TextField value={resumeDetails.companyLocation} onChange={e => setResumeDetails({ ...resumeDetails, companyLocation: e.target.value })} label="Company Location" variant="standard" />
              <TextField value={resumeDetails.duration} onChange={e => setResumeDetails({ ...resumeDetails, duration: e.target.value })} label="Duration" variant="standard" />
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h1>Skills</h1>
            <div className="d-flex align-items-center justify-content-between p-3">
              <input ref={skillRef} placeholder='Add skill' type="text" className='form-control' />
              <button onClick={() => addSkill(skillRef.current.value)} className='m-2 px-3 py-1 text-bg-dark border border-1'>ADD</button>
            </div>
            <h5>Suggestions</h5>
            <div className="d-flex flex-wrap justify-content-between my-3">
              {skillSuggestions.map((item, index) => (
                <button key={index} onClick={() => addSkill(item)} className="m-2 px-3 py-1 rounded-pill border border-1 border-secondary">
                  {item}
                </button>
              ))}
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
        );

      case 5:
        return (
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
        );

      default:
        return null;
    }
  };

  const handleAddResume = async () => {
    const { userName, jobTitle, location } = resumeDetails;
    if (!userName && !jobTitle && !location) {
      alert("Please fill all the required fields");
    }else{
      console.log("API call")
    try {
      const result = await addResumeAPI(resumeDetails);
      console.log(result);
      if(result.status==201){
        alert("Resume added successfully");
        const {id} = result.data;
      
        navigate(`/resume/${id}/view`);
        
      }
    } catch (err) {
      console.log(err);
    }
  }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <div>
          <Typography sx={{ mt: 2, mb: 1 }}>🎉 All steps completed - you're finished!</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Step {activeStep + 1}: {steps[activeStep]}
          </Typography>

          <Box>{renderSteps(activeStep)}</Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>

            <Box sx={{ flex: '1 1 auto' }} />

            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            {activeStep === steps.length - 1 ? 
              <Button onClick={handleAddResume}>Finish</Button>
             : 
              <Button onClick={handleNext}>Next</Button>
            }
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
