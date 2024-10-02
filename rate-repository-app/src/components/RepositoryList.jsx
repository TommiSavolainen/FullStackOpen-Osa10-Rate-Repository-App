import React, { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { FlatList, View, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const ItemSeparator = () => <View style={{ height: 10 }} />;

const RepositoryListHeader = ({ selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword }) => (
  <View>
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchKeyword}
      value={searchKeyword}
    />
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => setSelectedOrder(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="LATEST" />
      <Picker.Item label="Highest rated repositories" value="HIGHEST" />
      <Picker.Item label="Lowest rated repositories" value="LOWEST" />
    </Picker>
  </View>
);

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword } = this.props;
    return (
      <RepositoryListHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositoryNodes, handlePress } = this.props;
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
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('LATEST');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const orderBy = selectedOrder === 'LATEST' ? 'CREATED_AT' : 'RATING_AVERAGE';
  const orderDirection = selectedOrder === 'LOWEST' ? 'ASC' : 'DESC';

  const { repositories, loading, error } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  const handlePress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      repositoryNodes={repositoryNodes}
      handlePress={handlePress}
    />
  );
};

export default RepositoryList;