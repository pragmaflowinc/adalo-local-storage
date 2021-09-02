import React, { useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput, View } from 'react-native'
import { IStyles, LocalStorageProps } from './generated'

function parseStyles(styles: IStyles) {
  const retVal = {} as IStyles
  if (styles.enabled) {
    if (styles.border) {
      retVal.borderColor = styles.borderColor;
      retVal.borderWidth = styles.borderWidth;
    }
    retVal.backgroundColor = styles.backgroundColor;
    retVal.color = styles.color;

  }
  return retVal
}

export function EditorWriteLocalStorageComponent({
  styles= {},
  storageValue = '',
}: LocalStorageProps) {

  return (
    <View style={{...styles, alignSelf: 'stretch' }}>
    <TextInput 
      value={storageValue}
    />
    </View>
  )
}