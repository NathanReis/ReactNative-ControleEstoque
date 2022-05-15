import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import DangerButton from '../../components/button/danger';
import SuccessButton from '../../components/button/success';
import WarningButton from '../../components/button/warning';
import Loading from '../../components/loading';
import SafeZoneScreen from '../../components/safeZoneScreen';
import TextInput from '../../components/textInput';
import Title from '../../components/title';
import ICategoryDto from '../../dtos/ICategoryDto';
import IIdDto from '../../dtos/IIdDto';
import ResponseHelper from '../../helpers/Response';
import API from '../../services/api';

interface ICategoryParams {
  id: string;
}

export default function Category() {
  let [_id, setId] = useState<string>('');
  let [_description, setDescription] = useState<string>('');
  let [isCreate, setIsCreate] = useState<boolean>(true);
  let [isLoading, setIsLoading] = useState<boolean>(true);

  let isFocused = useIsFocused();
  let navigation = useNavigation();
  let route = useRoute();

  function clear() {
    setId('');
    setDescription('');
    setIsCreate(true);
  }

  async function fetchCategory(id: string) {
    try {
      let response = await API.get<ICategoryDto>(`/categories/${id}`);

      setId(id);
      setDescription(response.data.description);
    } catch (error) {
      setId('');
      setDescription('');

      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  async function handleCreate() {
    let category = { description: _description };

    try {
      let response = await API.post<IIdDto>('/categories', category);

      setId(response.data._id);
      setIsCreate(false);

      Alert.alert('Salvo', 'Cadastrado com sucesso');
    } catch (error) {
      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  async function handleRemove() {
    Alert.alert(
      'Confirme',
      'Desajea realmente excluir esta categoria? Caso confirme, todos produtos serão excluídos!',
      [
        { text: 'Sim', onPress: async () => await remove() },
        { text: 'Não' }
      ]
    );
  }

  async function handleUpdate() {
    let category = { description: _description };

    try {
      await API.put<IIdDto>(`/categories/${_id}`, category);

      Alert.alert('Salvo', 'Atualizado com sucesso');

      navigation.navigate('Categories' as never);
    } catch (error) {
      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  async function remove() {
    try {
      await API.delete<IIdDto>(`/categories/${_id}`);

      Alert.alert('Excluído', 'Excluído com sucesso');

      navigation.navigate('Categories' as never);
    } catch (error) {
      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      let params = route.params as ICategoryParams;

      if (params && params.id) {
        setIsCreate(false);

        await fetchCategory(params.id);

        navigation.setParams({ id: '' } as never);
      } else {
        setIsCreate(true);
      }

      setIsLoading(false);
    }

    if (isFocused) {
      clear();
      load();
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeZoneScreen>
      <View>
        <Title content={`${isCreate ? 'Nova ' : ''}Categoria`} />

        <TextInput
          label='Descrição'
          value={_description}
          onChangeText={setDescription}
        />

        {
          isCreate
            ? <SuccessButton title='Cadastrar' onPress={handleCreate} />
            : <>
              <WarningButton title='Atualizar' onPress={handleUpdate} />
              <DangerButton title='Excluir' onPress={handleRemove} />
            </>
        }

      </View>
    </SafeZoneScreen>
  );
}
