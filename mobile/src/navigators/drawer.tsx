import { createDrawerNavigator } from '@react-navigation/drawer';
import Categories from '../screens/categories';
import Category from '../screens/category';

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
    </drawer.Navigator>
  );
}
