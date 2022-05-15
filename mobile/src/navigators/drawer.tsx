import { createDrawerNavigator } from '@react-navigation/drawer';
import Categories from '../screens/categories';
import Category from '../screens/category';
import Product from '../screens/product';
import Products from '../screens/products';

let drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <drawer.Navigator>
      <drawer.Screen
        name='Category'
        component={Category}
        options={{ title: 'Categoria' }}
      />
      <drawer.Screen
        name='Categories'
        component={Categories}
        options={{ title: 'Categorias' }}
      />
      <drawer.Screen
        name='Product'
        component={Product}
        options={{ title: 'Produto' }}
      />
      <drawer.Screen
        name='Products'
        component={Products}
        options={{ title: 'Produtos' }}
      />
    </drawer.Navigator>
  );
}
