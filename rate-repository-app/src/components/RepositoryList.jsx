import useRepositories from '../hooks/useRepositories';
import { FlatList, View } from 'react-native';
import RepositoryItem from './RepositoryItem';

const ItemSeparator = () => <View style={{ height: 10 }} />;
const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <View>
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem {...item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  </View>
  );
};

export default RepositoryList;