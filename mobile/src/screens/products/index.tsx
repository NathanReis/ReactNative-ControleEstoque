import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SuccessButton from '../../components/button/success';
import ListItem from '../../components/listItem';
import Loading from '../../components/loading';
import SafeZoneScreen from '../../components/safeZoneScreen';
import IIdDto from '../../dtos/IIdDto';
import IProductWithCategoryDto from '../../dtos/IProductWithCategoryDto';
import ResponseHelper from '../../helpers/Response';
import API from '../../services/api';
import styles from './styles';

export default function Products() {
  let [products, setProducts] = useState<IProductWithCategoryDto[]>([]);
  let [isLoading, setIsLoading] = useState<boolean>(true);

  let isFocused = useIsFocused();
  let navigation = useNavigation();

  async function fetchProducts() {
    try {
      let response = await API.get<IProductWithCategoryDto[]>('/products');

      setProducts(response.data);
    } catch (error) {
      setProducts([]);

      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  function handleClickNew() {
    navigation.navigate('Product' as never);
  }

  function handleClickToEdit(id: string) {
    navigation.navigate('Product' as never, { id } as never);
  }

  async function handleClickToRemove(id: string) {
    Alert.alert(
      'Confirme',
      'Desajea realmente excluir este produto?',
      [
        { text: 'Sim', onPress: async () => await remove(id) },
        { text: 'Não' }
      ]
    );
  }

  async function remove(id: string) {
    try {
      await API.delete<IIdDto>(`/products/${id}`);

      Alert.alert('Excluído', 'Excluído com sucesso');

      await fetchProducts();
    } catch (error) {
      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      await fetchProducts();

      setIsLoading(false);
    }

    load();
  }, [isFocused]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeZoneScreen isWithoutScroll={true}>
      <SuccessButton title='Novo produto' onPress={handleClickNew} />

      <View style={styles.listContainer}>
        <FlatList
          data={products}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <ListItem
              mainContent={item.description}
              secondaryContents={[item.category.description]}
              handleEdit={() => handleClickToEdit(item._id)}
              handleRemove={() => handleClickToRemove(item._id)}
            />
          )}
        />
      </View>
    </SafeZoneScreen>
  );
}
