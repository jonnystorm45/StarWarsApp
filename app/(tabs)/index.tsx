import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
  TextInput,
  Button,
  Modal,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import 'react-native-reanimated';




const StarWarsHeaderImage = () => (
  <View style={styles.container}>
    <Image
      source={{
        uri: 'https://th.bing.com/th/id/OIP.2IMv8eCBnqykVZ_y6iVzdAHaEK?w=306&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      }}
      style={styles.image}
    />
  </View>
);

// Reusable fetch function
const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

// Reusable Screen Component Factory
const createScreen = (endpoint: string, itemKey: 'name' | 'title') => {
  return () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
      fetchData(endpoint).then((results) => {
        setData(results);
        setLoading(false);
      });
    }, []);

    const handleSearch = () => {
      if (searchText.trim() !== '') {
        setModalVisible(true);
      }
    };

    if (loading) {
      return <ActivityIndicator size="large" color="#FFD700" />;
    }

    return (
      <View style={styles.screenContainer}>
        <TextInput
          placeholder="Enter a search term..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
        <Button title="Search" onPress={handleSearch} color="#FFD700" />

        <FlatList
          data={data}
          keyExtractor={(item) => item[itemKey]}
          renderItem={({ item }) => <Text style={styles.screenText}>{item[itemKey]}</Text>}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>You searched for: "{searchText}"</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} color="#DC143C" />
            </View>
          </View>
        </Modal>
      </View>
    );
  };
};

// Screens
const PlanetsScreen = createScreen('https://swapi.dev/api/planets/', 'name');
const SpaceshipsScreen = createScreen('https://swapi.dev/api/starships/', 'name');
const FilmsScreen = createScreen('https://swapi.dev/api/films/', 'title');

// Navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerTitle: () => <StarWarsHeaderImage />,
      headerStyle: { backgroundColor: '#000' },
    }}
  >
    <Tab.Screen name="Planets" component={PlanetsScreen} />
    <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
    <Tab.Screen name="Films" component={FilmsScreen} />
  </Tab.Navigator>
);


const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerTitle: () => <StarWarsHeaderImage />,
      headerStyle: { backgroundColor: '#000' },
    }}
  >
    <Drawer.Screen name="Planets" component={PlanetsScreen} />
    <Drawer.Screen name="Spaceships" component={SpaceshipsScreen} />
    <Drawer.Screen name="Films" component={FilmsScreen} />
  </Drawer.Navigator>
);


// App Entry
export default function App() {
  return Platform.OS === 'ios' ? <TabNavigator /> : <DrawerNavigator />;
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25, // Adjust to your preference
  },
  image: {
    width: 450,
    height: 150,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: '#000000', // Deep space black background
  },
  input: {
    height: 45,
    borderColor: '#FFD700', // Star Wars Gold (for a touch of R2-D2’s color)
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#1c1c1c', // Dark background for input field
    fontSize: 16,
    color: '#ffffff', // Light text for contrast
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Darker, more intense overlay
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2f2f2f', // Dark greyish background for the modal
    padding: 24,
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#FFD700', // Star Wars Gold for the shadow effect
    shadowOpacity: 0.3,
    shadowRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DC143C', // Crimson (to reflect the Red Lightsaber)
  },
  modalText: {
    fontSize: 18,
    color: '#FFD700', // Star Wars Gold
    fontFamily: 'StarJedi', // Custom Star Wars font (if you have one)
    marginBottom: 20,
  },
  screenText: {
    fontSize: 20,
    color: '#FFD700', // Star Wars Gold
    fontWeight: 'bold',
    fontFamily: 'StarJedi', // Custom Star Wars font
    textShadowColor: '#000', 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  tabBarStyle: {
    backgroundColor: '#111', // Dark background for the tab bar
    borderTopColor: '#FFD700', // Gold accents on the tab bar
  },
});
