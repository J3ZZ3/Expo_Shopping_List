import React from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tutorial = ({ visible, onClose }) => {
  const tutorialSteps = [
    {
      icon: 'add-circle',
      title: 'Create Lists',
      description: 'Tap the "Add Item" button to add new items to your shopping list.'
    },
    {
      icon: 'check-box',
      title: 'Track Progress',
      description: 'Check off items as you shop by tapping the checkbox next to each item.'
    },
    {
      icon: 'touch-app',
      title: 'View Details',
      description: 'Tap any item to view additional details like notes and date added.'
    },
    {
      icon: 'edit',
      title: 'Edit Items',
      description: 'Use the edit button to modify item details or update quantities.'
    },
    {
      icon: 'list',
      title: 'Saved Lists',
      description: 'Access your saved shopping lists by tapping the list icon in the header.'
    },
    {
      icon: 'delete',
      title: 'Remove Items',
      description: 'Delete items using the trash icon when they\'re no longer needed.'
    }
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>How to Use Listify</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="white" />
            </Pressable>
          </View>

          <ScrollView style={styles.scrollView}>
            {tutorialSteps.map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <Icon name={step.icon} size={32} color="white" />
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: Platform.select({
      ios: "grey",
      android: "#333"
    }),
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    padding: 5,
  },
  scrollView: {
    marginBottom: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  stepContent: {
    marginLeft: 15,
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
});

export default Tutorial; 