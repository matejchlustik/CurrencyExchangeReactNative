import { View, Text, StyleSheet, TextInput, FlatList, TouchableHighlight, Keyboard } from 'react-native'
import { useContext, useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { ActiveCurrencyContext } from '../../contexts/ActiveCurrencyContext';

export default function SearchBar({ navigation }) {
    const { activeCurrencyExchange } = useContext(ActiveCurrencyContext);

    const [searchQuery, setSearchQuery] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    const [isFocused, setIsFocused] = useState(null);
    const textInputRef = useRef(null);


    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                textInputRef.current.blur();
                setSearchResults(null);
                setIsFocused(false);
            }
        );
        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        if (activeCurrencyExchange && searchQuery && isFocused) {
            const results = activeCurrencyExchange.filter(element => {
                return (element.currency.toLowerCase().includes(searchQuery.toLowerCase()) || element.short.toLowerCase().includes(searchQuery.toLowerCase()));
            })
            if (results.length === 0) {
                setSearchResults(null)
            } else {
                setSearchResults(results);
            }

        }

    }, [searchQuery, isFocused]);

    const onChangeText = value => {
        if (value == "") {
            setSearchResults(null);
            setSearchQuery(null);
        } else {
            setSearchQuery(value);
        }
    }

    const renderItem = ({ item }) => (
        <TouchableHighlight underlayColor={"#ebebeb"} onPress={() => navigation.navigate("ExchangeDetail", { item })} activeOpacity={0.4}>
            <View style={styles.searchResultItem}>
                <Text style={styles.item}>{item.short.toUpperCase()} </Text>
            </View>
        </TouchableHighlight>
    )

    return (
        <View style={styles.container}>
            <View style={styles.containerSearchBar}>
                <Ionicons style={styles.icon} name="search" size={24} color="#4a4a4a" />
                <TextInput style={styles.input}
                    onChangeText={onChangeText}
                    value={searchQuery}
                    ref={textInputRef}
                    onFocus={() => { setIsFocused(true) }}
                />
                <Ionicons style={[styles.icon, searchQuery ? styles.searchQueryTrue : styles.searchQueryFalse]} name="close" size={24} color="#4a4a4a" onPress={() => { setSearchQuery(null); Keyboard.dismiss(); }} />
            </View>
            {searchResults ?
                <View style={styles.containerSearchResults}>
                    <FlatList
                        data={searchResults}
                        renderItem={renderItem}
                        keyExtractor={item => item.short}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={'handled'}

                    />
                </View>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flex: 3.5,
        width: '100%',
    },
    containerSearchBar: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 4,
        backgroundColor: '#f5f5f5',
        padding: 4,
        alignItems: 'center'
    },
    containerSearchResults: {
        position: 'absolute',
        backgroundColor: '#f5f5f5',
        width: '100%',
        maxHeight: 450,
        top: '70%',
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#cccccc',
    },
    input: {
        fontSize: 18,
        flex: 6,
    },
    item: {
        fontSize: 16,
        padding: 8
    },
    icon: {
        flex: 1,
        marginLeft: 4,
    },
    searchResultItem: {
        fontSize: 30
    },
    searchQueryTrue: {
        opacity: 1
    },
    searchQueryFalse: {
        opacity: 0
    }
})