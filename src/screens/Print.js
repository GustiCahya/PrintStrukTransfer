import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DataStruk } from '../context/DataStruk'

export default function Print() {
    const {data} = useContext(DataStruk)
    return (
        <View>
            <Text>{JSON.stringify(data)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
