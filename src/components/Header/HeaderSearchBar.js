import { View, Text, StyleSheet, TextInput, FlatList, TouchableHighlight, Keyboard } from 'react-native'
import { useContext, useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { SearchContext } from '../../contexts/SearchContext';

export default function SearchBar() {

    const { searchQuery, setSearchQuery } = useContext(SearchContext);
    const [inputVal, setInputVal] = useState(null);

    const onChangeText = value => {
        if (value == '') {
            setInputVal(null)
            setSearchQuery(null);
        } else {
            setInputVal(value);
            setSearchQuery(value);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerSearchBar}>
                <Ionicons style={styles.icon} name="search" size={24} color="#4a4a4a" />
                <TextInput style={styles.input}
                    onChangeText={onChangeText}
                    value={inputVal}
                />
                <Ionicons
                    style={[styles.icon, searchQuery ? styles.searchQueryTrue : styles.searchQueryFalse]}
                    name="close"
                    size={24}
                    color="#4a4a4a"
                    onPress={() => { setSearchQuery(null); setInputVal(null) }}
                />
            </View>
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
        maxHeight: 375,
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
    },
    searchResultsVisible: {
        display: 'flex'
    },
    searchResultsNonVisible: {
        display: 'none'
    }
})