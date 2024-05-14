
export const baseUrl ='https://fadinodejss.onrender.com'
export const Api={
    signup:baseUrl + "/api/signup",
    signIn:baseUrl +"/api/signIn",
    jobposts:baseUrl +  "/api/jobposts",
    jobposts2:baseUrl + "/api/jobposts2",
    serach:baseUrl+"/api/search",
    Addskils:baseUrl+"/api/skills",
    AddExperince:baseUrl+"/api/experiences",
    deleteSkill:(skill,id) => baseUrl+`/api/SkillsDelete?id=${id}&skill=${skill}`,
    deleteExperince:(experience,id)=> baseUrl+`/api/ExperiencesDelete?id=${id}&experience=${experience}`,
  
 } 
// localhost
// 192.168.1.241
// 'http://192.168.1.241:8000'
// 'http://localhost:8000'
// 

// 