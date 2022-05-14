import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SuccessButton from '../../components/button/success';
import Loading from '../../components/loading';
import SafeZoneScreen from '../../components/safeZoneScreen';
import ICategoryDto from '../../dtos/ICategoryDto';
import ResponseHelper from '../../helpers/Response';
import API from '../../services/api';
import global from '../../styles/global';
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

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      await fetchCategories();

      setIsLoading(false);
    }

    load();
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
            <View style={styles.card}>
              <Text style={global.bold}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </SafeZoneScreen>
  );
}
