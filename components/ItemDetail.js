import React from 'react';
import { View, Text, Modal, StyleSheet, Pressable, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ItemDetail = ({ item, visible, onClose }) => {
  if (!item) return null;

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
            <Text style={styles.title}>{item.name}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="white" />
            </Pressable>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="shopping-cart" size={20} color="white" />
            <Text style={styles.detailText}>Quantity: {item.quantity}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="category" size={20} color="white" />
            <Text style={styles.detailText}>Category: {item.category}</Text>
          </View>

          {item.notes && (
            <View style={styles.detailRow}>
              <Icon name="note" size={20} color="white" />
              <Text style={styles.detailText}>Notes: {item.notes}</Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Icon name="event" size={20} color="white" />
            <Text style={styles.detailText}>
              Added: {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="check-circle" size={20} color="white" />
            <Text style={styles.detailText}>
              Status: {item.purchased ? 'Obtained' : 'Not Obtained'}
            </Text>
          </View>
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
});

export default ItemDetail; 