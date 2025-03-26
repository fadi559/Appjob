import UpdateProfileImage from "../Screens/UpdateProfileImage"

export const baseUrl ='http://192.168.1.241:8000'
export const Api={
    signup:baseUrl + "/api/signup",
    signIn:baseUrl +"/api/signIn",
    jobposts:baseUrl +  "/api/jobposts",
    jobposts2:baseUrl + "/api/jobposts2",
    filterData:baseUrl+"/api/filterData",
    Addskills:baseUrl+"/api/BothSkills",
    AddExperince:baseUrl+"/api/experiences",
    preferences:baseUrl+"/api/preferences",
    deleteSkill:(skill,id) => baseUrl+`/api/SkillsDelete?id=${id}&skill=${skill}`,
    deleteExperince:(experience,id)=> baseUrl+`/api/ExperiencesDelete?id=${id}&experience=${experience}`,
    updateProfileImage:baseUrl + "/api/updateProfileImage",
    updateProfileImage2:baseUrl+ "/api/updateProfileImage2",
    SavePhotoUrl:baseUrl + "/api/upload-photo",
    GetSkills:baseUrl+"/api/GetSkills",
    GetJobType:baseUrl+"/api/GetJobType",
    getJobsByTitle:baseUrl+"/api/getJobsByTitle",
    getSkillsByTitle:baseUrl+"/api/getSkillsByTitle"
 } 
// localhost
// 192.168.1.241
// 'http://192.168.1.241:8000'
// 'http://localhost:8000'
// 

// 