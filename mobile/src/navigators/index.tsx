import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './drawer';

export default function Navigator() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
