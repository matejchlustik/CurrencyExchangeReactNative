import { useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';

import useFetch from '../../hooks/useFetch';
import { ActiveCurrencyContext } from '../../contexts/ActiveCurrencyContext';



export default function HomeScreen({ navigation }) {

    const { activeCurrency, activeCurrencyExchange, setActiveCurrencyExchange } = useContext(ActiveCurrencyContext);

    const { data: exchangeRates, isPending: exchangeRatesPending, error: exchangeRatesError } = useFetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${activeCurrency}.json`);
    const { data: currencies, isPending: currenciesPending, error: currenciesError } = useFetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`);


    useEffect(() => {
        if (currencies && exchangeRates[activeCurrency]) {
            const temp = {};
            Object.entries(currencies).forEach(currency => {
                temp[currency[0]] = { "currency": currency[1] };
                temp[currency[0]].short = currency[0];
            });
            Object.entries(exchangeRates[activeCurrency]).forEach(exchangeRate => {
                temp[exchangeRate[0]].exchangeRate = exchangeRate[1];
            });
            setActiveCurrencyExchange(Object.values(temp));
        }
    }, [exchangeRates, activeCurrency, currencies]);

    const renderItem = ({ item }) => (
        <TouchableHighlight underlayColor={"#f5f5f5"} onPress={() => navigation.navigate("ExchangeDetail", { item })} activeOpacity={0.4}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemShort}>{item.short.toUpperCase()} </Text>
                <Text style={styles.item}>{item.currency} </Text>
                <Text style={styles.item}>{item.exchangeRate} </Text>
            </View>
        </TouchableHighlight>
    )

    return (
        <View style={styles.container}>
            {!exchangeRatesPending && !currenciesPending && !exchangeRatesError && !exchangeRatesError ?
                <FlatList
                    data={activeCurrencyExchange}
                    renderItem={renderItem}
                    keyExtractor={item => item.short}
                    showsVerticalScrollIndicator={false}
                />
                :
                currenciesError || exchangeRatesError ?
                    <View>
                        <Text>Something went wrong</Text>
                    </View>
                    :
                    <View>
                        <ActivityIndicator size="large" color="#172b6b" />
                    </View>
            }
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 18,
        alignItems: 'center',
    },
    item: {
        marginLeft: 12,
        flex: 1,
        fontSize: 16
    },
    itemShort: {
        marginRight: 10,
        flex: 0.5,
        fontSize: 16
    }

});
