
export const baseUrl = 'http://192.168.68.164:8000'
export const Api={
    signup:baseUrl + "/api/signup",
    signIn:baseUrl +"/api/signIn",
    jobposts:baseUrl +  "/api/jobposts",
    jobposts2:baseUrl + "/api/jobposts2",
    serach:baseUrl+"/api/search",
    Addskils:baseUrl+"/api/skills",
    AddExperince:baseUrl+"/api/experiences",
    deleteSkill:baseUrl+`/api/SkillsDelete?id=${user._id}&skill=${skill}`,
    deleteExperince:baseUrl+ `api/ExperiencesDelete?id=${user._id}&experience=${experience}`,
  
 } 
// localhost
// 192.168.1.241
// 
// 

// 