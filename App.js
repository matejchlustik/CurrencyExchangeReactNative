
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/home/HomeScreen';
import ExchangeDetail from './src/screens/ExchangeDetail';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ExchangeDetail" component={ExchangeDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

