import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';


import { ActiveCurrencyContext } from '../contexts/ActiveCurrencyContext';
import useFetch from '../hooks/useFetch';

export default function ExchangeDetail({ route }) {

    const { activeCurrency } = useContext(ActiveCurrencyContext);
    const { item } = route.params;
    const { data: currency, isPending: currencyPending, error: currencyError, refetch: currencyRefetch } = useFetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${activeCurrency}/${item.short}.json`);
    return (
        <View>
            <Text>{item.currency}</Text>
            {currency && !currencyPending ?
                <Text>{currency[item.short]}</Text>
                :
                currencyError ?
                    <Text>Something went wrong</Text>
                    :
                    <Text>...</Text>}
        </View>
    )
}

