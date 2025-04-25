import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

interface Item {
  id: string;
  name: string;
  price: number;
}

export default function HomeScreen() {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);

  const addItem = () => {
    if (product && price) {
      const newItem: Item = {
        id: Date.now().toString(),
        name: product,
        price: parseFloat(price),
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setTotal(updatedItems.reduce((sum, item) => sum + item.price, 0));
      setProduct('');
      setPrice('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Billing Book</Text>

      <TextInput
        style={styles.input}
        placeholder="Product name"
        value={product}
        onChangeText={setProduct}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={addItem} />

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>₹{item.price.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  list: { marginTop: 20 },
  item: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 10, borderBottomWidth: 1, borderColor: '#ddd'
  },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
});