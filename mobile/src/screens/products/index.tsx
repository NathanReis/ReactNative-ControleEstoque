import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SuccessButton from '../../components/button/success';
import ListItem from '../../components/listItem';
import Loading from '../../components/loading';
import SafeZoneScreen from '../../components/safeZoneScreen';
import SelectInput from '../../components/selectInput';
import IIdDto from '../../dtos/IIdDto';
import IProductWithCategoryDto from '../../dtos/IProductWithCategoryDto';
import ResponseHelper from '../../helpers/Response';
import API from '../../services/api';
import styles from './styles';

enum FilterOptionsEnum {
  ACTIVE = 'active',
  ALL = 'all',
  INACTIVE = 'inactive'
}

enum SortOptionsEnum {
  AMOUNT = 'amount',
  DESCRIPTION = 'description'
}

export default function Products() {
  let [_filteredProducts, setFilteredProducts] = useState<IProductWithCategoryDto[]>([]);
  let [_products, setProducts] = useState<IProductWithCategoryDto[]>([]);
  let [filterOption, setFilterOption] = useState<FilterOptionsEnum>(FilterOptionsEnum.ALL);
  let [sortOption, setSortOption] = useState<SortOptionsEnum>(SortOptionsEnum.DESCRIPTION);
  let [isLoading, setIsLoading] = useState<boolean>(true);

  let isFocused = useIsFocused();
  let navigation = useNavigation();

  async function fetchProducts() {
    try {
      let response = await API.get<IProductWithCategoryDto[]>('/products');

      let filteredProducts: IProductWithCategoryDto[];

      switch (filterOption as FilterOptionsEnum) {
        case FilterOptionsEnum.ACTIVE:
          filteredProducts = filterByActive(response.data);
          break;

        case FilterOptionsEnum.ALL:
          filteredProducts = filterByAll(response.data);
          break;

        default:
          filteredProducts = filterByInactive(response.data);
      }

      let filteredSortedProducts: IProductWithCategoryDto[];

      switch (sortOption as SortOptionsEnum) {
        case SortOptionsEnum.AMOUNT:
          filteredSortedProducts = sortByAmount(filteredProducts);
          break;

        default:
          filteredSortedProducts = sortByDescription(filteredProducts);
      }

      setProducts(response.data);
      setFilteredProducts(filteredSortedProducts);
    } catch (error) {
      setProducts([]);
      setFilteredProducts([]);

      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  function filterByActive(products: IProductWithCategoryDto[]) {
    return products.filter(product => product.active);
  }

  function filterByAll(products: IProductWithCategoryDto[]) {
    return products;
  }

  function filterByInactive(products: IProductWithCategoryDto[]) {
    return products.filter(product => !product.active);
  }

  function handleChangeFilterOption(option: string) {
    setFilterOption(option as FilterOptionsEnum);

    let filteredProducts: IProductWithCategoryDto[];

    switch (option as FilterOptionsEnum) {
      case FilterOptionsEnum.ACTIVE:
        filteredProducts = filterByActive(_products);
        break;

      case FilterOptionsEnum.ALL:
        filteredProducts = filterByAll(_products);
        break;

      default:
        filteredProducts = filterByInactive(_products);
    }

    let filteredSortedProducts: IProductWithCategoryDto[];

    switch (sortOption as SortOptionsEnum) {
      case SortOptionsEnum.AMOUNT:
        filteredSortedProducts = sortByAmount(filteredProducts);
        break;

      default:
        filteredSortedProducts = sortByDescription(filteredProducts);
    }

    setFilteredProducts(filteredSortedProducts);
  }

  function handleChangeSortOption(option: string) {
    setSortOption(option as SortOptionsEnum);

    let filteredSortedProducts: IProductWithCategoryDto[];

    switch (option as SortOptionsEnum) {
      case SortOptionsEnum.AMOUNT:
        filteredSortedProducts = sortByAmount(_filteredProducts);
        break;

      default:
        filteredSortedProducts = sortByDescription(_filteredProducts);
    }

    setFilteredProducts(filteredSortedProducts);
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

  function sortByAmount(filteredProducts: IProductWithCategoryDto[]) {
    return filteredProducts.sort((a, b) => a.amount - b.amount);
  }

  function sortByDescription(filteredProducts: IProductWithCategoryDto[]) {
    return filteredProducts.sort((a, b) => a.description.localeCompare(b.description));
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

    if (isFocused) {
      load();
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeZoneScreen isWithoutScroll={true}>
      <SuccessButton title='Novo produto' onPress={handleClickNew} />

      <SelectInput
        hasDefaultOption={false}
        label='Ordenar por:'
        options={[
          { label: 'Descrição', value: SortOptionsEnum.DESCRIPTION },
          { label: 'Quantidade', value: SortOptionsEnum.AMOUNT }
        ]}
        selectedValue={sortOption}
        onValueChange={handleChangeSortOption}
      />

      <SelectInput
        hasDefaultOption={false}
        label='Filtrar por:'
        options={[
          { label: 'Ativo', value: FilterOptionsEnum.ACTIVE },
          { label: 'Inativo', value: FilterOptionsEnum.INACTIVE },
          { label: 'Todos', value: FilterOptionsEnum.ALL }
        ]}
        selectedValue={filterOption}
        onValueChange={handleChangeFilterOption}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={_filteredProducts}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <ListItem
              key={item._id}
              mainContent={item.description}
              secondaryContents={[
                item.category.description,
                `Quantidade: ${item.amount}`,
                `Ativo: ${item.active ? 'Sim' : 'Não'}`
              ]}
              handleEdit={() => handleClickToEdit(item._id)}
              handleRemove={() => handleClickToRemove(item._id)}
            />
          )}
        />
      </View>
    </SafeZoneScreen>
  );
}
