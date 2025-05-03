import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity, ScrollView, Image} from 'react-native';
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

const FilmsScreen = () => {
  const [films, setFilms] = useState<any[]>([]);
  const [filteredFilms, setFilteredFilms] = useState<any[]>([]); // State for filtered films
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    fetchData('https://swapi.py4e.com/api/films/')
      .then((data) => {
        setFilms(data);
        setFilteredFilms(data); // Initially set filteredFilms to all films
        setLoading(false);
      });
  }, []);

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);

    // Filter films based on search term
    if (text) {
      const filtered = films.filter((film) =>
        film.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFilms(filtered);
    } else {
      setFilteredFilms(films); // Reset the filtered films when search term is cleared
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
          <Text style={styles.itemText}>{item.title}</Text>
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
          uri: 'https://th.bing.com/th/id/OIP.iUYJI7aGujIMxZAasNe46QHaJ4?w=208&h=277&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        }} // Image for the first film (A New Hope)
        style={styles.headerImage}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        placeholder="Search Films..."
        placeholderTextColor="#fff"
        value={searchTerm}
        onChangeText={handleSearchTermChange} // Update search term
        onSubmitEditing={handleSearchSubmit}
      />
      
      {/* Wrap FlatList in ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FlatList
          data={filteredFilms} // Use filtered films data here
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

export default FilmsScreen;

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


