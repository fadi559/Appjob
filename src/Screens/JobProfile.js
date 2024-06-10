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
       const posts = route.params?.jobs|| [];
    const reorderedPosts = selectedJob ? [selectedJob, ...posts.filter(job => job!== selectedJob)] : posts;

    
  return (
    <ScrollView>
    <View>
    {reorderedPosts.map((job,index) => (
        
     <CardItem post={job} key={job.id ? job.id.toString() : job._id ? job._id.toString() : index.toString()} />
        ))}
        
    </View>
    </ScrollView>
  )
}
export default JobProfile

const styles = StyleSheet.create({})