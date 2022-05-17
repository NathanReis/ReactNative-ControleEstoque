import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import DangerButton from '../../components/button/danger';
import Loading from '../../components/loading';
import SafeZoneScreen from '../../components/safeZoneScreen';
import Title from '../../components/title';
import ICategoryDto from '../../dtos/ICategoryDto';
import IProductWithCategoryDto from '../../dtos/IProductWithCategoryDto';
import ResponseHelper from '../../helpers/Response';
import API from '../../services/api';
import colors from '../../styles/colors';
import global from '../../styles/global';
import styles from './styles';

export default function Home() {
  let [amountCategories, setAmountCategories] = useState<number>(0);
  let [amountDistinctProducts, setAmountDistinctProducts] = useState<number>(0);
  let [amountDistinctProductsRunningOut, setAmountDistinctProductsRunningOut] = useState<number>(0);
  let [isLoading, setIsLoading] = useState<boolean>(true);

  let isFocused = useIsFocused();
  let navigation = useNavigation();

  async function fetchCategories() {
    try {
      let response = await API.get<ICategoryDto[]>('/categories');

      setAmountCategories(response.data.length);
    } catch (error) {
      setAmountCategories(0);

      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  async function fetchProducts() {
    try {
      let response = await API.get<IProductWithCategoryDto[]>('/products');

      setAmountDistinctProducts(response.data.length);
    } catch (error) {
      setAmountDistinctProducts(0);

      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  async function fetchProductsRunningOut() {
    try {
      let response = await API.get<IProductWithCategoryDto[]>('/products/running-out');

      setAmountDistinctProductsRunningOut(response.data.length);
    } catch (error) {
      setAmountDistinctProductsRunningOut(0);

      let { title, message } = ResponseHelper.formatError(error);

      Alert.alert(title, message);
    }
  }

  function handleClickSeeProductsRunningOut() {
    navigation.navigate('ProductsRunningOut' as never);
  }

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      await fetchCategories();
      await fetchProducts();
      await fetchProductsRunningOut();

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
    <SafeZoneScreen>
      <Title content={`Controle de\nestoque`} />

      <View>
        <View style={styles.amountInfoContainer}>
          <Text style={[styles.amountInfoDescription]}>
            {`Quantidade de\nCategorias`}
          </Text>
          <Text style={[global.bold, styles.amountInfoValue]}>
            {amountCategories}
          </Text>
        </View>

        <View style={styles.amountInfoContainer}>
          <Text style={[styles.amountInfoDescription]}>
            {`Quantidade de\nPordutos distintos`}
          </Text>
          <Text style={[global.bold, styles.amountInfoValue]}>
            {amountDistinctProducts}
          </Text>
        </View>

        <View style={styles.amountInfoContainer}>
          <Text style={[styles.amountInfoDescription]}>
            {`Quantidade de\nPordutos distintos\nacabando`}
          </Text>
          <Text style={[global.bold, styles.amountInfoValue]}>
            {amountDistinctProductsRunningOut}
          </Text>
          {
            amountDistinctProductsRunningOut > 0
            && (
              <FontAwesome
                style={styles.alertIcon}
                color={colors.danger.background}
                name='bell'
                size={24}
              />
            )
          }
        </View>

        {
          amountDistinctProductsRunningOut > 0
          && (
            <DangerButton
              title='Visualizar produtos no fim'
              onPress={handleClickSeeProductsRunningOut}
            />
          )
        }
      </View>
    </SafeZoneScreen>
  )
}
