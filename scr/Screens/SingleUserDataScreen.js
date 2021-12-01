import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import HeaderTab from '../Components/HeaderTab';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function SingleUserDataScreen({ navigation, route }) {

    const { userId, username } = route.params

    const [activeTab, setActiveTab] = useState("Upcoming");

    const [upcomingTodos, setUpcomingTodos] = useState([]);

    const [completedTodos, setCompletedTodos] = useState([]);

    const data = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
            const result = await response.json();
            let upcomingArr = await result.filter((item) => item.completed === false)
            let completedArr = await result.filter((item) => item.completed === true)
            setUpcomingTodos(upcomingArr)
            setCompletedTodos(completedArr)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        data()
    }, [])



    const Item = ({ title, completed }) => (
        <View style={styles.footer}>
            <View style={styles.secondFooter}>
                <View style={styles.thirdFooter}>
                    <View style={styles.dot} />
                </View>
                <View style={styles.textArea}>

                    <Text style={styles.titleText}>
                        {title}
                    </Text>

                    <Text style={styles.nameText}>
                        {username}
                    </Text>

                </View>
            </View>
        </View>
    );


    const renderItem = ({ item }) => {
        return <Item title={item.title} completed={item.completed} />
    };

    return (

        <View style={styles.container}>
            <StatusBar
                backgroundColor='#f6f7fb'
                barStyle='dark-content' />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                        <AntDesign name='arrowleft' size={25} color='black' />
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 1, paddingLeft: 20 }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: '600'
                        }}>{`To Dos of ${username}`}</Text>
                    </View>
                </View>
            </View>

            <View>
                <HeaderTab onChangeTab={setActiveTab} activeTab={activeTab} />
                <View style={{ height: 40 }}></View>
                <View>
                    <FlatList
                        data={activeTab === "Upcoming" ? upcomingTodos : completedTodos}
                        renderItem={renderItem}
                        keyExtractor={item => item.id} />
                </View>
                <View style={{ height: 40 }}></View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
    },
    header: {
        height: 50,
        justifyContent: 'center',
    },
    footer: {
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thirdFooter: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: completed ? 'green' : '#e9ebf3',
        elevation: 5
    },
    textArea: {
        width: '85%',
        justifyContent: 'center',
        paddingRight: 10,
        paddingVertical: 5
    },
    titleText: {
        fontSize: 20,
        color: '#000',
        fontWeight: '600'
    },
    nameText: {
        fontSize: 16,
        color: '#00a2e8',
        fontWeight: '600'
    }
})