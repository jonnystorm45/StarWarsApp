import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { SearchModal } from '../../components/SearchModal';




const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

const SpaceshipsScreen = () => {
  const [spaceships, setSpaceships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    fetchData('https://swapi.dev/api/starships/')
      .then((data) => {
        setSpaceships(data);
        setLoading(false);
      });
  }, []);

  const handleSearchSubmit = () => {
    setModalText(searchTerm);
    setModalVisible(true);
    setSearchTerm('');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  return (
  
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://lumiere-a.akamaihd.net/v1/images/databank_millenniumfalcon_01_169_aaae2954.jpeg' }}
        style={styles.headerImage}
         resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        placeholder="Search Spaceships..."
        placeholderTextColor="#fff"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearchSubmit}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FlatList
          data={spaceships}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          )}
        />
      </ScrollView>

      {/* Modal for search */}
      <SearchModal
  visible={modalVisible}
  text={modalText}
  onClose={() => setModalVisible(false)}
/>


    </View>
  );
};

export default SpaceshipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: '#000000',
  },
  headerImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  input: {
    height: 45,
    borderColor: '#FFD700',
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#1c1c1c',
    fontSize: 16,
    color: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#333',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 20,
    color: '#FFD700',
    fontFamily: 'StarJedi',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2f2f2f',
    padding: 24,
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#FFD700',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DC143C',
  },
  modalText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'StarJedi',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
});