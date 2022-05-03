import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View, StyleSheet } from 'react-native'
import { IStyles, LocalStorageProps } from './generated'

export function ReadLocalStorageComponent({
  storageKey = "",
  onRetrieved = () => null,
  _fonts,
  styles,
  nonexistantKey = ""
}: LocalStorageProps) {
  const [storedValue, setStoredValue] = useState('a')
  const getStoredValue = async () => {
    const storedValue = await AsyncStorage.getItem(storageKey)
    if (storedValue !== null) {
      setStoredValue(storedValue)
      onRetrieved(storedValue)
    } else {
      setStoredValue(nonexistantKey)
    }
  }
  useEffect(() => { 
    if (storageKey) {
      getStoredValue()
    }
  }, [storageKey])
  return (
    <View style={{...styles, alignSelf: 'stretch'}}>
      <Text style={styles}>{storedValue || 'asd'}</Text>
    </View>
  )
}