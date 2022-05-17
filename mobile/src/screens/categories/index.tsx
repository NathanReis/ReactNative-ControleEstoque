import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SuccessButton from '../../components/button/success';
import ListItem from '../../components/listItem';
import Loading from '../../components/loading';
import SafeZoneScreen from '../../components/safeZoneScreen';
import ICategoryDto from '../../dtos/ICategoryDto';
import IIdDto from '../../dtos/IIdDto';
import ResponseHelper from '../../helpers/Response';
import API from '../../services/api';
import styles from './styles';

export default function Categories() {
  let [categories, setCategories] = useState<ICategoryDto[]>([]);
  let [isLoading, setIsLoading] = useState<boolean>(true);

  let isFocused = useIsFocused();
  let navigation = useNavigation();

  async function fetchCategories() {
    try {
      let response = await API.get<ICategoryDto[]>('/categories');

      setCategories(response.data);
    } catch (error) {
      setCategories([]);

      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  function handleClickNew() {
    navigation.navigate('Category' as never);
  }

  function handleClickToEdit(id: string) {
    navigation.navigate('Category' as never, { id } as never);
  }

  async function handleClickToRemove(id: string) {
    Alert.alert(
      'Confirme',
      'Desajea realmente excluir esta categoria? Caso confirme, todos produtos serão excluídos!',
      [
        { text: 'Sim', onPress: async () => await remove(id) },
        { text: 'Não' }
      ]
    );
  }

  async function remove(id: string) {
    try {
      await API.delete<IIdDto>(`/categories/${id}`);

      Alert.alert('Excluído', 'Excluído com sucesso');

      await fetchCategories();
    } catch (error) {
      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      await fetchCategories();

      setIsLoading(false);
    }

    if (isFocused) {
      load();
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeZoneScreen isWithoutScroll={true}>
      <SuccessButton title='Nova categoria' onPress={handleClickNew} />

      <View style={styles.listContainer}>
        <FlatList
          data={categories}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <ListItem
              mainContent={item.description}
              handleEdit={() => handleClickToEdit(item._id)}
              handleRemove={() => handleClickToRemove(item._id)}
            />
          )}
        />
      </View>
    </SafeZoneScreen>
  );
}
