import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import DangerButton from '../../components/button/danger';
import SuccessButton from '../../components/button/success';
import WarningButton from '../../components/button/warning';
import Loading from '../../components/loading';
import NumericInput from '../../components/numericInput';
import RadioInput from '../../components/radioInput';
import SafeZoneScreen from '../../components/safeZoneScreen';
import SelectInput from '../../components/selectInput';
import TextInput from '../../components/textInput';
import Title from '../../components/title';
import ICategoryDto from '../../dtos/ICategoryDto';
import IIdDto from '../../dtos/IIdDto';
import IProductDto from '../../dtos/IProductDto';
import ResponseHelper from '../../helpers/Response';
import API from '../../services/api';

interface IProductParams {
  id: string;
}

export default function Product() {
  let [_id, setId] = useState<string>('');
  let [_idCategory, setIdCategory] = useState<string>('');
  let [_active, setActive] = useState<boolean>(true);
  let [_amount, setAmount] = useState<number>(0);
  let [_description, setDescription] = useState<string>('');
  let [_minAmount, setMinAmount] = useState<number>(0);
  let [categories, setCategories] = useState<ICategoryDto[]>([]);
  let [isCreate, setIsCreate] = useState<boolean>(true);
  let [isLoading, setIsLoading] = useState<boolean>(true);

  let isFocused = useIsFocused();
  let navigation = useNavigation();
  let route = useRoute();

  function clear() {
    setId('');
    setIdCategory('');
    setActive(true);
    setAmount(0);
    setDescription('');
    setMinAmount(0);
    setIsCreate(true);
  }

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

  async function fetchProduct(id: string) {
    try {
      let response = await API.get<IProductDto>(`/products/${id}`);

      setId(id);
      setIdCategory(response.data._idCategory);
      setActive(response.data.active);
      setAmount(response.data.amount);
      setDescription(response.data.description);
      setMinAmount(response.data.minAmount);
    } catch (error) {
      setId('');
      setIdCategory('');
      setActive(true);
      setAmount(0);
      setDescription('');
      setMinAmount(0);

      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  function handleChangeAmount(text: string) {
    text = text.replace(/-|\+|\.|,/g, '');

    setAmount(Number(text));
  }

  function handleChangeMinAmount(text: string) {
    text = text.replace(/-|\+|\.|,/g, '');

    setMinAmount(Number(text));
  }

  async function handleCreate() {
    let product = {
      _idCategory,
      active: _active,
      amount: _amount,
      description: _description,
      minAmount: _minAmount
    };

    try {
      let response = await API.post<IIdDto>('/products', product);

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
      'Desajea realmente excluir este produto?',
      [
        { text: 'Sim', onPress: async () => await remove() },
        { text: 'Não' }
      ]
    );
  }

  async function handleUpdate() {
    let product = {
      _idCategory,
      active: _active,
      amount: _amount,
      description: _description,
      minAmount: _minAmount
    };

    try {
      await API.put<IIdDto>(`/products/${_id}`, product);

      Alert.alert('Salvo', 'Atualizado com sucesso');

      navigation.navigate('Products' as never);
    } catch (error) {
      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  async function remove() {
    try {
      await API.delete<IIdDto>(`/products/${_id}`);

      Alert.alert('Excluído', 'Excluído com sucesso');

      navigation.navigate('Products' as never);
    } catch (error) {
      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      await fetchCategories();

      let params = route.params as IProductParams;

      if (params && params.id) {
        setIsCreate(false);

        await fetchProduct(params.id);

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
        <Title content={`${isCreate ? 'Novo ' : ''}Produto`} />

        <TextInput
          label='Descrição'
          maxLength={30}
          value={_description}
          onChangeText={setDescription}
        />

        <NumericInput
          label='Quantidade atual'
          value={String(_amount)}
          onChangeText={handleChangeAmount}
        />

        <NumericInput
          label='Quantidade mínima'
          value={String(_minAmount)}
          onChangeText={handleChangeMinAmount}
        />

        <SelectInput
          label='Categoria'
          options={categories.map(category => ({ label: category.description, value: category._id }))}
          selectedValue={_idCategory}
          onValueChange={setIdCategory}
        />

        <RadioInput
          label='Ativo?'
          options={['Sim', 'Não']}
          selectedOption={_active ? 'Sim' : 'Não'}
          onValueChange={(option: string) => setActive(option === 'Sim')}
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
