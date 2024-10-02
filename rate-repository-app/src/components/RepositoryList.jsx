import React, { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { FlatList, View, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import { Pressable } from 'react-native';
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

  const orderBy = selectedOrder === 'LATEST' ? 'CREATED_AT' : 'RATING_AVERAGE';
  const orderDirection = selectedOrder === 'LOWEST' ? 'ASC' : 'DESC';

  const { repositories, loading, error } = useRepositories(orderBy, orderDirection);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
console.log(repositoryNodes);
  return (
      <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <RepositoryItem repository={item} />}
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