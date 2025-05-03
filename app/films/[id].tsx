import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

const FilmDetail = () => {
  const { title, director, producer, release_date, opening_crawl } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.label}>Director:</Text>
      <Text style={styles.value}>{director}</Text>
      <Text style={styles.label}>Producer:</Text>
      <Text style={styles.value}>{producer}</Text>
      <Text style={styles.label}>Release Date:</Text>
      <Text style={styles.value}>{release_date}</Text>
      <Text style={styles.label}>Opening Crawl:</Text>
      <Text style={styles.crawl}>{opening_crawl}</Text>
    </ScrollView>
  );
};

export default FilmDetail;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    fontFamily: 'StarJedi',
  },
  label: {
    color: '#DC143C',
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    color: '#fff',
    marginBottom: 10,
  },
  crawl: {
    color: '#FFD700',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
