import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/home/HomeScreen';
import CustomHeader from './src/components/Header/CustomHeader';
import { ActiveCurrencyContext } from './src/contexts/ActiveCurrencyContext';
import { SearchContext } from './src/contexts/SearchContext';

const Stack = createNativeStackNavigator();

export default function App() {

  const [activeCurrency, setActiveCurrency] = useState('eur');
  const [searchQuery, setSearchQuery] = useState(null);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <ActiveCurrencyContext.Provider value={{ activeCurrency, setActiveCurrency }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ navigation }) => ({
              header: (props) => <CustomHeader {...props} />,
            })}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ActiveCurrencyContext.Provider>
    </SearchContext.Provider>
  );
}

