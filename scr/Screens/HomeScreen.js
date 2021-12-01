import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, Image, TouchableWithoutFeedback } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderTab from '../Components/HeaderTab';

export default function HomeScreen({ navigation }) {

    const [activeTab, setActiveTab] = useState("Upcoming");

    const [upcomingTodos, setUpcomingTodos] = useState([]);

    const [completedTodos, setCompletedTodos] = useState([]);

    const [userList, setUserList] = useState([]);

    const data = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
            const result = await response.json();
            return result
        } catch (e) {
            console.log(e);
        }
    }

    const userData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/')
            const result = await response.json();
            return result
        } catch (e) {
            console.log(e);
        }
    }

    const getName = (arr, id) => {
        return arr.filter((item) => item.id === id)[0].name
    }

    const getAllData = async () => {
        const [userDataList, todos] = await Promise.all([userData(), data()])
        if (todos && todos.length && userDataList && userDataList.length) {
            await todos.map((item) => {
                item.username = getName(userDataList, item.userId)
            })
            let upcomingArr = await todos.filter((item) => item.completed === false)
            let completedArr = await todos.filter((item) => item.completed === true)
            setUpcomingTodos(upcomingArr)
            setCompletedTodos(completedArr)
            setUserList(userDataList)
        }
    }

    useEffect(() => {
        getAllData()
    }, [])



    const Item = ({ title, completed, name, userId }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('SingleUserDataScreen', { userId: userId, username: name })}>
            <View style={styles.footer}>
                <View style={styles.secondFooter}>
                    <View style={thirdFooter}>
                        <View style={styles.dot} />
                    </View>
                    <View style={styles.textArea}>
                        <Text style={styles.titleText}>  {title} </Text>
                        <Text style={styles.nameText}> {name} </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );


    const renderItem = ({ item }) => {
        return <Item title={item.title} completed={item.completed} name={item.username} userId={item.userId} />
    };

    return (

        <View style={styles.container}>
            <StatusBar
                backgroundColor='#f6f7fb'
                barStyle='dark-content' />
            <View style={styles.header}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png' }}
                    />
                    <View style={{ flex: 1, paddingLeft: 20 }}>
                        <Text>To Dos</Text>
                    </View>
                    <AntDesign name='search1' size={25} color='black' />
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
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    image: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600'
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