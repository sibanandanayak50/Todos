import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function HeaderTab(props) {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: '#e9ebf3',
                borderRadius: 10,
                elevation: 5
            }}>
            <HeaderButtons
                text='Upcoming'
                btnColor="black"
                textColor="white"
                activeTab={props.activeTab}
                setActiveTab={props.onChangeTab} />
            <HeaderButtons
                text='Completed'
                btnColor="white"
                textColor="black"
                activeTab={props.activeTab}
                setActiveTab={props.onChangeTab} />
        </View>
    )
}

const HeaderButtons = (props) =>

    <TouchableOpacity
        onPress={() => props.setActiveTab(props.text)}>
        <View style={{
            backgroundColor: props.activeTab == props.text ? "#ffffff" : "#e9ebf3",
            borderRadius: 10,
            height: 40,
            width: 200,
            justifyContent: 'center',
        }}>
            <Text
                style={{
                    color: props.activeTab == props.text ? "black" : "#828d9a",
                    fontSize: 16,
                    fontWeight: '900',
                    textAlign: 'center'
                }}>{props.text}</Text>
        </View>
    </TouchableOpacity>
