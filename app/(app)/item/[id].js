import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editItem } from '../../../redux/useReducer';

export default function ItemDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const item = useSelector(state => 
    state.shoppingList.find(item => item.id === id)
  );

  const [notes, setNotes] = useState(item?.notes || '');

  const handleSave = () => {
    dispatch(editItem({ ...item, notes }));
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item?.name}</Text>
      <Text style={styles.category}>Category: {item?.category}</Text>
      <Text style={styles.quantity}>Quantity: {item?.quantity}</Text>
      
      <TextInput
        style={styles.notesInput}
        value={notes}
        onChangeText={setNotes}
        placeholder="Add notes..."
        multiline
      />
      
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
} 