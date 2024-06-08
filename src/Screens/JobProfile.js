import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardItem from '../compoments/CardItem'
import { UserContext } from '../compoments/usercontext'
import { useContext } from 'react'
import { useRoute } from '@react-navigation/native'

const JobProfile = (props) => {
    const route = useRoute()
     const {user,setUser}=useContext(UserContext);

     const selectedJob = route.params?.selectedJob;
    //   const posts = route.params?.jobs|| [];
      const jobs = route.params?.jobs || [];

      const reorderedJobs = selectedJob ? [selectedJob, ...jobs.filter(job => job.id !== selectedJob.id)] : jobs;
    //   console.log("posts",posts)
//       console.log("selectedJob:", selectedJob);
//    console.log("route.params:", route.params);
    // console.log("jobs:",jobs);

    console.log("Jobs from params:", jobs); // Debugging
    console.log("Selected Job from params:", selectedJob); // Debugging
  
  return (
    <ScrollView>
    <View>
    {reorderedJobs.map((job, index) => (
          <CardItem post={job} key={job.id ? job.id.toString() : job._id ? job._id.toString() : index.toString()} />
        ))}
        
    </View>
    </ScrollView>
  )
}

export default JobProfile

const styles = StyleSheet.create({})