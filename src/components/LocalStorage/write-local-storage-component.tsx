import React, { useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput, View } from 'react-native'
import { IStyles, LocalStorageProps } from './generated'

type State = {
  initialized: boolean
  loaded: boolean
  value: string
  exists: boolean
}

type Action = { type: 'load_key' } | { type: 'success', value: string } | { type: 'no_key', defaultValue: string }

const initialState = {
  initialized: false,
  loaded: false,
  value: '',
  exists: false
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'load_key': {
      return {...state, initialized: true}
    }
    case 'success': {
      return {...state, loaded: true, exists: true, value: action.value}
    }
    case 'no_key': {
      return {...state, loaded: true, exists: false }
    }
  }
}

export function WriteLocalStorageComponent({
  editor,
  storageKey,
  styles= {},
  storageValue = '',
  overwrite = false
}: LocalStorageProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [inputValue, setInputValue] = useState(storageValue)
  useEffect(() => {
    if (storageKey && !state.loaded) {
      dispatch({ type: 'load_key' })
      AsyncStorage.getItem(storageKey).then(value => {
        if (value === null) {
          AsyncStorage.setItem(storageKey, storageValue)
          setInputValue(storageValue)
          dispatch({ type: 'no_key', defaultValue: storageValue })
        } else {
          if (overwrite) {
            AsyncStorage.setItem(storageKey, storageValue)
          } else {
            setInputValue(value)
          }
          dispatch({ type: 'success', value })
        }
      })
    }
  }, [storageKey, overwrite, storageValue])

  return (
    <View style={{...styles, alignSelf: 'stretch'}}>
      <TextInput
        style={styles}
        value={inputValue}
        onChangeText={e => {
          const text = e
          if (storageKey) {
            AsyncStorage.setItem(storageKey, text)
          }
          setInputValue(text)
        }}
      />
    </View>
  )
}