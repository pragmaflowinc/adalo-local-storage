import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { WriteLocalStorageComponent } from './write-local-storage-component'
import { ReadLocalStorageComponent } from './read-local-storage-component'
import { LocalStorageProps } from './generated'
import { EditorWriteLocalStorageComponent } from './editor-write-local-storage-component'
class LocalStorage extends Component<LocalStorageProps> {
	render() {
		const { mode, editor } = this.props
		const renderComponent = () => {
			switch (mode) {
				case 0:
					return <ReadLocalStorageComponent {...this.props} />
				case 1:
					if (editor) {
						return <EditorWriteLocalStorageComponent {...this.props} />
					}
					return <WriteLocalStorageComponent {...this.props} />
			}
		}
		return (
			<View style={styles.wrapper}>
				{
					renderComponent()
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default LocalStorage
