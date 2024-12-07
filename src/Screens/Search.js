import { FlatList, Image, StyleSheet, Text, TextInput, View, ActivityIndicator,TouchableOpacity } from 'react-native';
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
  const [Name, setName] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [SkillsData,setSkillsdata] = useState([]);
  const [selectedType,setSelectedType] = useState("skill");






  const [Type,setType]= useState({
    skill:{
      pressed:true,
      Text:"",
      
    },
    name:{
      pressed:false,
      Text:"",
    },
    jobType:{
      pressed:false,
      Text:"",
    },
  });

const GetSkillsAPi=async(body)=>{

  try {
    const response = await fetch(Api.GetSkills, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseData = await response.json();

    if (responseData && responseData.data) {
      setSkillsdata(responseData.data);
      console.log(responseData,"ppppp")
    } else {
      setSkillsdata([])
    }
  } catch (error) {
    setError('Failed to fetch data. Please try again later.');
  } finally {
    setLoading(false);
  }
}
const GetJobTypeApi =async(body)=>{

  try {
    const response = await fetch(Api.GetJobType, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseData = await response.json();

    if (responseData && responseData.data) {
      setSkillsdata(responseData.data);
      console.log(responseData,"ppppp")
    } else {
      setSkillsdata([])
    }
  } catch (error) {
    setError('Failed to fetch data. Please try again later.');
  } finally {
    setLoading(false);
  }

}


  const renderData = (data) => {
    console.log(data,"DatanoW44")
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

    if (Type.skill.Text) {
      body.skills = {
        $regex: Type.skill.Text,
        $options: 'i',
      };
    }

    if (Type.jobType.Text) {
      body.experiences = {
        $regex: Type.jobType.Text,
        $options: 'i',
      };
    }
    if (Type.name.Text) {
      body.name = {
        $regex: Type.name.Text,
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

  
  useEffect(() => {
    console.log("CONSLNoww66",Type.skill.Text)
    const debounceSearch = _.debounce(() => {
      searchApi();
      GetSkillsAPi();
      GetJobTypeApi();
    }, 500);

    debounceSearch();
    return debounceSearch.cancel;
  }, [Type]);


  const RenderSkills=()=>{
    return(
      SkillsData.map((skill,i)=>
      
      <TouchableOpacity key={i} onPress={()=>{
      Type.skill.Text=skill.name
      setType({...Type})
      }} >
        <Text> {skill.name}</Text>
      </TouchableOpacity>
      )
    )

  }

  const HandelSerach=(Text)=>{
    
    Type[selectedType].Text=Text
    setType({...Type})

  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        title={'Back'}
      />
     

      <TextInput
        style={styles.input}
        onChangeText={(v)=>HandelSerach(v)}
        value={Type[selectedType].Text}
        placeholder={"Search " + selectedType}
      />
      <View>

    {RenderSkills()}

      </View>
      {/* <Text style={styles.label}>Experiences</Text> */}
      {/* <TextInput
        style={styles.input}
        onChangeText={setExperience}
        value={experience}
        placeholder="Search experiences"
      /> */}

      <TouchableOpacity onPress={()=>{setSelectedType("skill")}}>
      <Text style={styles.label}>Skills</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{setSelectedType("name")}}>
      <Text style={styles.label}>Name</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={()=>{setSelectedType("jobType")}}>
      <Text style={styles.label}>jobType</Text>
      </TouchableOpacity>
      
      {/* <TextInput
        style={styles.input}
        onChangeText={setName}
        value={Name}
        placeholder="Search  name"
      /> */}

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
