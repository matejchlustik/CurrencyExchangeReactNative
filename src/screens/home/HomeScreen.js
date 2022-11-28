import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';

import useFetch from '../../hooks/useFetch';


export default function HomeScreen({ navigation }) {

    const { data: exchangeRates, isPending: exchangeRatesPending, error: exchangeRatesError, refetch } = useFetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`);
    const { data: currencies, isPending: currenciesPending, error: currenciesError, refetch: currenciesRefetch } = useFetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`);

    const temp = {};
    let data = null; // array dát pre flatList
    if (exchangeRates && currencies) {
        Object.entries(currencies).forEach(currency => {
            temp[currency[0]] = { "currency": currency[1] };
            temp[currency[0]].short = currency[0].toUpperCase();
        });
        Object.entries(exchangeRates.eur).forEach(exchangeRate => {
            temp[exchangeRate[0]].exchangeRate = exchangeRate[1];
        });
        data = Object.values(temp);
    }

    const renderItem = ({ item }) => (
        <TouchableHighlight underlayColor={"#f5f5f5"} onPress={() => navigation.navigate("ExchangeDetail", { item })} activeOpacity={0.4}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemShort}>{item.short} </Text>
                <Text style={styles.item}>{item.currency} </Text>
                <Text style={styles.item}>{item.exchangeRate} </Text>
            </View>
        </TouchableHighlight>
    )


    return (
        <View style={styles.container}>
            {!exchangeRatesPending && !currenciesPending && !exchangeRatesError && !exchangeRatesError ?
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.short}
                />
                :
                currenciesError || exchangeRatesError ?
                    <TouchableWithoutFeedback>
                        <View>
                            <Text>Something went wrong</Text>
                        </View>
                    </TouchableWithoutFeedback>
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
        alignItems: 'center'
    },
    item: {
        marginRight: 10,
        flex: 1,

    },
    itemShort: {
        marginRight: 10,
        width: '20%'
    }

});
