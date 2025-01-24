import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Api } from '../res/api';
import CustomLoadingSpinner from '../compoments/Loading';

const JobTypePage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { jobTypeName } = route.params; 
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobsByTitle();
  }, []);

  // Fetch all jobs with the same title
  const fetchJobsByTitle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${Api.getJobsByTitle}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobType: jobTypeName }), 
      });
      const responseData = await response.json();
      if (responseData && responseData.data) {
        setJobs(responseData.data); // Set the fetched jobs
        console.log('Response data:', responseData);
      } else {
        setJobs([]); 
      }
    } catch (error) {
      console.error('Failed to fetch jobs by jobtype:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render each job item
  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.jobCard}>
      <View style={styles.jobContent}>
        <Image
          source={require('../Images/Work2.png')} 
          style={styles.jobImage}
        />
        <View style={styles.jobDetails}>
          <Text style={styles.jobTitle}>{item.jobType || 'Job Title'}</Text>
          <Text style={styles.jobCompany}>{item.User?.name || 'Company Name'}</Text>
          <Text style={styles.jobCompany}>{item.loaction || 'Company Name'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../Images/backIcon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>{jobTypeName || 'Job Type'}</Text>
      </View>
      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item._id}
          renderItem={renderJobItem}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No jobs found for this job title.</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default JobTypePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  jobCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    resizeMode: 'contain',
  },
  jobDetails: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  jobCompany: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
