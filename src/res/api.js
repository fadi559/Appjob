import UpdateProfileImage from "../Screens/UpdateProfileImage"

export const baseUrl ='http://localhost:8000'
export const Api={
    signup:baseUrl + "/api/signup",
    signIn:baseUrl +"/api/signIn",
    jobposts:baseUrl +  "/api/jobposts",
    jobposts2:baseUrl + "/api/jobposts2",
    serach:baseUrl+"/api/search",
    filterData:baseUrl+"/api/filterData",
    Addskils:baseUrl+"/api/skills",
    AddExperince:baseUrl+"/api/experiences",
    preferences:baseUrl+"/api/preferences",
    deleteSkill:(skill,id) => baseUrl+`/api/SkillsDelete?id=${id}&skill=${skill}`,
    deleteExperince:(experience,id)=> baseUrl+`/api/ExperiencesDelete?id=${id}&experience=${experience}`,
    updateProfileImage:baseUrl + "/api/updateProfileImage",
    updateProfileImage2:baseUrl+ "/api/updateProfileImage2",
    SavePhotoUrl:baseUrl + "/api/upload-photo",
 } 
// localhost
// 192.168.1.241
// 'http://192.168.1.241:8000'
// 'http://localhost:8000'
// 

// 