import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';

const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

const PlanetsScreen = () => {
  const [planets, setPlanets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    fetchData('https://swapi.dev/api/planets/')
      .then((data) => {
        setPlanets(data);
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
      <TextInput
        style={styles.input}
        placeholder="Search Planets..."
        placeholderTextColor="#fff"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearchSubmit}
      />
      <FlatList
        data={planets}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
      
      {/* Modal for search */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You searched for: {modalText}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlanetsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: '#000000', // Dark space background
  },
  input: {
    height: 45,
    borderColor: '#FFD700', // Gold border (Star Wars theme)
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#1c1c1c', // Dark input background
    fontSize: 16,
    color: '#FFFFFF', // White text
  },
  itemContainer: {
    backgroundColor: '#333', // Dark background for items
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 20,
    color: '#FFD700', // Gold text color for items
    fontFamily: 'StarJedi', // Custom Star Wars font (if you have it)
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)', // Darker overlay for modals
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2f2f2f',
    padding: 24,
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#FFD700', // Gold shadow color for modals
    shadowOpacity: 0.3,
    shadowRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DC143C', // Crimson border (Dark Side theme)
  },
  modalText: {
    fontSize: 18,
    color: '#FFFFFF', // White text for modal content
    fontFamily: 'StarJedi', // Star Wars font for consistency
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFD700', // Gold button
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#000000', // Black text for contrast on gold
    fontWeight: 'bold',
  },
});
