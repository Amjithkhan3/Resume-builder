import React, { useEffect } from "react";
import Preview from "../components/Preview";
import { useState } from "react"; 
import { useParams,Link } from "react-router-dom";
import { addHistoryAPI, getResumesAPI } from "../services/allAPI";
import { FaDownload } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import Edit from "../components/Edit";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";







function ViewResume() {
  const{id} = useParams()
  console.log(id);
  
  const [resume,setResume] = useState({});
  useEffect(() => { 
    getResumeDetails();
  }, []);
  
  const getResumeDetails = async () => {
    const result = await getResumesAPI(id)
    console.log(result);
    if(result.status==200){
      setResume(result.data)
    }

  }

  const handleDownloadResume = async() => {
    //create pdf document
    const doc = new jsPDF();    
    const preview = document.getElementById('preview');

    //screenshot of preview component
    const canvas = await  html2canvas(preview,{scale:2});
    //console.log(canvas);
    //convert canvas to image
    const resumeImg = canvas.toDataURL('image/png')
     //console.log(resumeImg);
    
    
    //add screenshot to pdf
    const pageWidth = doc.internal.pageSize.getWidth();
    //const pageHeight = doc.internal.pageSize.getHeight();

    const imgWidth = pageWidth-20
    const imgHeight = canvas.height*imgWidth/canvas.width
    doc.addImage(resumeImg,'PNG',0,0,imgWidth,imgHeight);
        //download pdf
    doc.save(`${resume.userName}-resume.pdf`);
    //addtime
    const localTimeData = new Date();
    const timeStamp = `${localTimeData.toLocaleDateString()}, ${localTimeData.toLocaleTimeString()}`;
    try {
    await addHistoryAPI({ timeStamp, resumeImg });
    } catch (err) {
    console.log(err);
    }
  }

  return (
   <>
  <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-md-8 col-12 d-flex flex-column align-items-center">

        {/* Buttons Row */}
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <button onClick={handleDownloadResume} className="btn fs-4 text-primary"><FaDownload /></button>
          <Edit resumeDetails={resume} setResumeDetails={setResume}/>
          <Link to="/history" className="btn fs-4 text-primary"><FaHistory /></Link>
          <Link to="/resume" className="btn fs-4 text-success"><IoMdArrowBack /></Link>
        </div>

        {/* Preview Card */}
        <div className="card border-0 rounded-4 mt-4 p-3 w-100 d-flex justify-content-center align-items-center">
        <div id="preview"> <Preview resumeDetails={resume} /></div> 
        </div>

      </div>
    </div>
  </div>
</>

  );
}

export default ViewResume;
