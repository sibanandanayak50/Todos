import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function HeaderTab(props) {
    return (
        <View
            style={styles.header}>
            <View style={{ flex: 1 }}>
                <HeaderButtons
                    text='Upcoming'
                    btnColor="black"
                    textColor="white"
                    activeTab={props.activeTab}
                    setActiveTab={props.onChangeTab} /></View>
            <View style={{ flex: 1 }}>
                <HeaderButtons
                    text='Completed'
                    btnColor="white"
                    textColor="black"
                    activeTab={props.activeTab}
                    setActiveTab={props.onChangeTab} /></View>
        </View>
    )
}

const HeaderButtons = (props) =>

    <TouchableOpacity
        onPress={() => props.setActiveTab(props.text)}>
        <View style={[styles.button, { backgroundColor: props.activeTab == props.text ? "#ffffff" : "#e9ebf3" }]}>
            <Text style={[styles.text, { color: props.activeTab == props.text ? "black" : "#828d9a" }]}>{props.text}</Text>
        </View>
    </TouchableOpacity>


const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    text: {
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#e9ebf3',
        borderRadius: 10,
        elevation: 5,
        marginHorizontal: 20
    }
})