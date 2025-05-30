import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Swipeable } from 'react-native-gesture-handler';
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

const PlanetsScreen  = () => {
  const [planets, setPlanets] = useState<any[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    fetchData('https://swapi.py4e.com/api/planets/')
      .then((data) => {
        setPlanets(data);
        setFilteredPlanets(data);
        setLoading(false);
      });
  }, []);

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
    if (text) {
      const filtered = planets.filter((planet) =>
        planet.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlanets(filtered);
    } else {
      setFilteredPlanets(planets);
    }
  };

  const handleSearchSubmit = () => {
    setModalText(searchTerm);
    setModalVisible(true);
    setSearchTerm(''); // Optionally clear search term after submit
  };

  const renderItem = ({ item }: any) => {
    return (
      <Swipeable
        renderRightActions={() => (
          <View style={styles.swipeAction}>
            <TouchableOpacity
              onPress={() => {
                setModalText(item.title);
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
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'data:image/jpeg;base64,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',
        }} 
        style={styles.headerImage}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        placeholder="Search Planet..."
        placeholderTextColor="#fff"
        value={searchTerm}
        onChangeText={handleSearchTermChange} // Update search term
        onSubmitEditing={handleSearchSubmit}
      />
      
      {/* Wrap FlatList in ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FlatList
          data={filteredPlanets} 
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
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

