import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import SearchBar from './HeaderSearchBar'
import HeaderPicker from './HeaderPicker';


export default function CustomHeader(props) {

    return (
        <View style={styles.headerOuter}>
            <View style={styles.headerInner}>
                {props.navigation.canGoBack() ?
                    <TouchableHighlight style={styles.headerBackButton} onPress={props.navigation.goBack} underlayColor={"#f5f5f5"} activeOpacity={0.4}>
                        <Ionicons name="arrow-back" size={32} color="#4a4a4a" />
                    </TouchableHighlight>
                    : null}
                <SearchBar navigation={props.navigation} />
                <HeaderPicker />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerOuter: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 100,
        alignItems: 'flex-end',
        borderBottomWidth: 0.5
    },
    headerInner: {
        height: '70%',
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    headerBackButton: {
        alignItems: 'center',
        flex: 0.8,
        marginLeft: -6
    }
})