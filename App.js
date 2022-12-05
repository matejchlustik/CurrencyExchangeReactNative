import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/home/HomeScreen';
import ExchangeDetail from './src/screens/ExchangeDetail';
import CustomHeader from './src/components/Header/CustomHeader';
import { ActiveCurrencyContext } from './src/contexts/ActiveCurrencyContext';

const Stack = createNativeStackNavigator();

export default function App() {

  const [activeCurrency, setActiveCurrency] = useState('eur');
  const [activeCurrencyExchange, setActiveCurrencyExchange] = useState(null);

  return (
    <ActiveCurrencyContext.Provider value={{ activeCurrency, setActiveCurrency, activeCurrencyExchange, setActiveCurrencyExchange }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            header: (props) => <CustomHeader {...props} />,
          })}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ExchangeDetail" component={ExchangeDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActiveCurrencyContext.Provider>
  );
}

