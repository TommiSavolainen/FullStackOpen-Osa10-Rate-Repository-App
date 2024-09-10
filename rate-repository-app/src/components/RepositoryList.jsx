import useRepositories from '../hooks/useRepositories';
import { FlatList, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import { Pressable } from 'react-native';

const ItemSeparator = () => <View style={{ height: 10 }} />;
const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    const renderItem = ({ item }) => (
      <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem {...item} />
      </Pressable>
  );
    // console.log(repositories);
  return (
    <View>
    <FlatList
      data={repositoryNodes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  </View>
  );
};

export default RepositoryList;