import { FlatList, Image, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Api } from '../res/api';
import _ from 'lodash';

const Search = () => {
  const navigation = useNavigation();
  const [skill, setSkill] = useState('');
  const [experience, setExperience] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const renderData = (data) => {
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.profileImage} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>Email: {item.email}</Text>
            <Text style={styles.phoneNumber}>Phone: {item.phoneNumber}</Text>
            <Text style={styles.currentJob}>Current Job: {item.currentJob}</Text>
            <Text style={styles.role}>Role: {item.role}</Text>
            <Text style={styles.interests}>Interests: {item.interests}</Text>
            <Text style={styles.jobType}>Preferred Job Type: {item.jobType}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        )}
      />
    );
  };

  const searchApi = async () => {
    setLoading(true);
    setError(null);
    const body = {};

    if (skill) {
      body.skills = {
        $regex: skill,
        $options: 'i',
      };
    }

    if (experience) {
      body.experiences = {
        $regex: experience,
        $options: 'i',
      };
    }

    try {
      const response = await fetch(Api.filterData, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();

      if (responseData && responseData.data) {
        setData(responseData.data);
      } else {
        setData([]);
      }
    } catch (error) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Debounce search to limit API calls
  useEffect(() => {
    const debounceSearch = _.debounce(() => {
      searchApi();
    }, 500); // Adjust delay as needed (500ms in this case)

    debounceSearch();
    return debounceSearch.cancel;
  }, [skill, experience]);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        title={'Back'}
      />
      <Text style={styles.label}>Skills</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSkill}
        value={skill}
        placeholder="Search skills"
      />
      <Text style={styles.label}>Experiences</Text>
      <TextInput
        style={styles.input}
        onChangeText={setExperience}
        value={experience}
        placeholder="Search experiences"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        renderData(data)
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  input: {
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 4,
  },
  currentJob: {
    fontSize: 16,
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    marginBottom: 4,
  },
  interests: {
    fontSize: 16,
    marginBottom: 4,
  },
  jobType: {
    fontSize: 16,
    marginBottom: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
