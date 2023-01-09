import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import useFetch from '../../hooks/useFetch';
import { ActiveCurrencyContext } from '../../contexts/ActiveCurrencyContext';
import { SearchContext } from '../../contexts/SearchContext';

export default function HomeScreen() {

    const [data, setData] = useState(null);

    const { searchQuery } = useContext(SearchContext);
    const { activeCurrency } = useContext(ActiveCurrencyContext);

    const { data: allExchangeRates, isPending: allExchangeRatesPending, error: allExchangeRatesError, setData: setAllExchangeRates } = useFetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${activeCurrency}.json`);
    const { data: allCurrencies, isPending: allCurrenciesPending, error: allCurrenciesError } = useFetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`);

    useEffect(() => {
        if (allCurrencies && allExchangeRates && allExchangeRates[activeCurrency]) {
            const temp = {};
            Object.entries(allCurrencies).forEach(currency => {
                temp[currency[0]] = { "currency": currency[1] };
                temp[currency[0]].short = currency[0];
            });
            Object.entries(allExchangeRates[activeCurrency]).forEach(exchangeRate => {
                temp[exchangeRate[0]].exchangeRate = exchangeRate[1];
            });
            setAllExchangeRates(Object.values(temp));
            setData(Object.values(temp));
        }
    }, [allExchangeRates, activeCurrency, allCurrencies]);

    useEffect(() => {
        if (!searchQuery) {
            setData(allExchangeRates);
        } else if (allExchangeRates && searchQuery) {
            const results = allExchangeRates.filter(element => {
                return (element.currency.toLowerCase().includes(searchQuery.toLowerCase()) || element.short.toLowerCase().includes(searchQuery.toLowerCase()));
            })
            if (results.length === 0) {
                setData(null)
            } else {
                setData(results);
            }
        }
    }, [searchQuery]);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemShort}>{item.short.toUpperCase()} </Text>
            <Text style={styles.item}>{item.currency} </Text>
            <Text style={styles.item}>{item.exchangeRate} </Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {!allExchangeRatesPending && !allCurrenciesPending && !allExchangeRatesError && !allExchangeRatesError ?
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.short}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={5}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                />
                :
                allCurrenciesError || allExchangeRatesError ?
                    <View style={styles.infoContainer}>
                        <Text>Something went wrong</Text>
                    </View>
                    :
                    <View style={styles.infoContainer}>
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
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
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
