//resume add api-allAPI.js
import commonAPI from "./commonAPI.js";
import ServerURL from "./ServerURL.js";

export const addResumeAPI = async (resume) => {
  return await commonAPI(`${ServerURL}/resumes`, "POST", resume);
};

//resume get api
export const getResumesAPI = async (id) => {
  return await commonAPI(`${ServerURL}/resumes/${id}`, "GET",{})
}

//resume update api

export const updateResumeAPI = async (id,resume) => {
  return await commonAPI(`${ServerURL}/resumes/${id}`, "PUT", resume);
}


//add history api

export const addHistoryAPI = async(history)=>{
  return await commonAPI(`${ServerURL}/history`,"POST",history)
}

//get history api

export const getHistoryAPI = async()=>{
  return await commonAPI(`${ServerURL}/history`,"GET",{})
}
//remove history api
export const removeHistoryAPI = async(id)=>{
  return await commonAPI(`${ServerURL}/history/${id}`,"DELETE",{})
}