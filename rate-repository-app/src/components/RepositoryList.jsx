import React, { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { FlatList, View, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';

const ItemSeparator = () => <View style={{ height: 10 }} />;


const RepositoryListHeader = ({ selectedOrder, setSelectedOrder }) => (
  <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => setSelectedOrder(itemValue)}
  >
      <Picker.Item label="Latest repositories" value="LATEST" />
      <Picker.Item label="Highest rated repositories" value="HIGHEST" />
      <Picker.Item label="Lowest rated repositories" value="LOWEST" />
  </Picker>
);

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('LATEST');
  const navigate = useNavigate();

  const orderBy = selectedOrder === 'LATEST' ? 'CREATED_AT' : 'RATING_AVERAGE';
  const orderDirection = selectedOrder === 'LOWEST' ? 'ASC' : 'DESC';

  const { repositories, loading, error } = useRepositories(orderBy, orderDirection);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  const handlePress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
      <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <Pressable onPress={() => handlePress(item.id)}>
              <RepositoryItem repository={item} />
            </Pressable>
          )}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => (
              <RepositoryListHeader
                  selectedOrder={selectedOrder}
                  setSelectedOrder={setSelectedOrder}
              />
          )}
      />
  );
};

export default RepositoryList;