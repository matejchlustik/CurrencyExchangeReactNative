import { View, Text, StyleSheet } from 'react-native'

export default function ExchangeDetail({ route }) {

    const { item } = route.params;

    return (
        <View>
            <Text>{item.short}</Text>
        </View>
    )
}

