import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { SearchModal } from '../../components/SearchModal';
import { Swipeable } from 'react-native-gesture-handler';


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
  const [starships, setStarships] = useState<any[]>([]);
  const [filteredStarships, setFilteredStarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    fetch('https://swapi.py4e.com/api/starships/')
      .then((res) => res.json())
      .then((json) => {
        setStarships(json.results);
        setFilteredStarships(json.results);
      })
      .catch((err) => console.error('Error fetching starships:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
    const filtered = starships.filter((ship) =>
      ship.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStarships(filtered);
  };

  const handleSearchSubmit = () => {
    setModalText(searchTerm || 'No search term entered');
    setModalVisible(true);
    setSearchTerm('');
  };

  const renderItem = ({ item }: { item: any }) => (
    <Swipeable
      renderRightActions={() => (
        <View style={styles.swipeAction}>
          <TouchableOpacity
            onPress={() => {
              setModalText(item.name);
              setModalVisible(true);
            }}
            style={styles.swipeButton}
          >
            <Text style={styles.swipeButtonText}>Show Modal</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </Swipeable>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://th.bing.com/th/id/OIP.E2gnipkd-esZcg3WG8hzcQHaE8',
        }}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <TextInput
        style={styles.input}
        placeholder="Search Starships..."
        placeholderTextColor="#fff"
        value={searchTerm}
        onChangeText={handleSearchTermChange}
        onSubmitEditing={handleSearchSubmit}
      />

      <FlatList
        data={filteredStarships}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollView}
      />

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
  swipeAction: {
    backgroundColor: '#FF4500', // Swipe button background color (Orange-red for action)
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 100,
    borderRadius: 8,
  },
  swipeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  swipeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    paddingBottom: 20, // Add some space at the bottom
  },
  headerImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
});


