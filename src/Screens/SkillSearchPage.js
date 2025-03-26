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
import UserProfile from './UserProfile';

const SkillPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { skillName } = route.params;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsersBySkill();
  }, []);

  const fetchUsersBySkill = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${Api.getSkillsByTitle}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: skillName }),
      });
      const responseData = await response.json();
      if (responseData && responseData.data) {
        setUsers(responseData.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Failed to fetch users by skill:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => navigation.navigate('drawer', { 
        screen: 'UserProfile', 
        params: { 
          userId: item._id,        // Pass user ID
          userName: item.name,     // Pass user name
          skillName: skillName     // Pass skill name
        } 
      })}
    >
      <View style={styles.userContent}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.userImage} />
        ) : (
          <View style={styles.userIconPlaceholder}>
            <Text style={styles.userIconText}>{item.name?.charAt(0) || 'U'}</Text>
          </View>
        )}
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.name || 'User Name'}</Text>
          <Text style={styles.userSkill}>{skillName || 'Skill'}</Text>
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
        <Text style={styles.header}>{skillName || 'Skill'}</Text>
      </View>
      {loading ? (
        <CustomLoadingSpinner />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={renderUserItem}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No users found for this skill.</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

export default SkillPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 16,
  },
  userCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userIconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userSkill: {
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