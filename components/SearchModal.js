import React, { useEffect, useState } from "react";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

export const SearchModal = ({ visible, text, onClose }) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const [showContent, setShowContent] = useState(visible);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      setShowContent(true);
    } else {
      setShowContent(false);
      setTimeout(() => {
        setModalVisible(false);
        onClose();
      }, 300);
    }
  }, [visible]);

  return (
    <Modal
      visible={modalVisible}
      animationType="none"
      transparent={true}
      onRequestClose={() => {
        setShowContent(false);
        setTimeout(() => {
          setModalVisible(false);
          onClose();
        }, 300);
      }}
    >
      <View style={styles.overlay}>
        {showContent && (
          <Animated.View
            entering={SlideInLeft.duration(300)}
            exiting={SlideOutRight.duration(300)}
            style={styles.modal}
          >
            <Text style={styles.text}>You searched for: {text}</Text>
            <Button
              title="Close"
              onPress={() => {
                setShowContent(false);
                setTimeout(() => {
                  setModalVisible(false);
                  onClose();
                }, 300);
              }}
              color="#D8C021"
            />
          </Animated.View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#1C1C1C",
    padding: 24,
    borderRadius: 12,
    borderColor: "#FFD700",
    borderWidth: 2,
    elevation: 8,
    width: "85%",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 20,
  },
});
