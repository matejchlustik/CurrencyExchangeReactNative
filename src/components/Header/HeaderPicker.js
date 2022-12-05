import { View } from 'react-native';
import { useContext, useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { ActiveCurrencyContext } from '../../contexts/ActiveCurrencyContext';
import useFetch from '../../hooks/useFetch';

export default function HeaderPicker() {

    const { activeCurrency, setActiveCurrency } = useContext(ActiveCurrencyContext)
    const { data: currencies, isPending: currenciesPending, error: currenciesError, refetch: currenciesRefetch } = useFetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`);


    return (
        <Picker
            selectedValue={activeCurrency}
            onValueChange={(itemValue, itemIndex) => {
                setActiveCurrency(itemValue)
            }}
            style={{ flex: 2, marginLeft: 2 }}
        >
            {currencies ?
                Object.entries(currencies).map(element =>
                (
                    <Picker.Item label={element[0].toUpperCase()} value={element[0]} key={element[0]} style={{ fontSize: 17, textAlign: 'center' }} />
                ))
                : null}

        </Picker>

    )
}