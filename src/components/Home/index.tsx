import React, { useState } from 'react';
import { Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

interface IInputType {
    task: string;
    edit: boolean;
    status: boolean;
}

const Home = () => {
    const [todo, setTodo] = useState<IInputType[]>([]);
    const [inputType, setInputType] = useState<IInputType>({ task: '', edit: false, status: false });

    const handleChange = (task: string) => {
        setInputType(prevState => ({
            ...prevState,
            task: task,
            edit: false,
            status: false
        }));
    };

    const handleAddTodo = () => {
        if (inputType.task.trim() === '') {
            return console.warn('Kindly Add Task');
        }
        setTodo([...todo, inputType]);
        setInputType({ task: '', edit: false, status: false });
    };

    const handleResetTodo = () => {
        setTodo([]);
        setInputType({ task: '', edit: false, status: false });
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'skyblue'} barStyle={'dark-content'} hidden={false} />
            <Text style={styles.header}>Todo List</Text>
            <View>
                <TextInput
                    style={styles.userInput}
                    placeholder='Enter Task Here'
                    value={inputType.task}
                    onChangeText={(task) => handleChange(task)}
                />
            </View>
            <View style={styles.btnParent}>
                <View style={styles.addbtn}>
                    <Button
                        color={'green'}
                        title='Add'
                        onPress={handleAddTodo}
                    />
                </View>
                <View style={styles.resetbtn}>
                    <Button
                        color={'red'}
                        title='Reset'
                        onPress={handleResetTodo}
                    />
                </View>
            </View>
            <View { ...(todo.length && styles.todoParent)}>
                <FlatList
                    data={todo}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.todoList}>
                            <Text style={styles.todoListItemNumber}>{index + 1}. </Text>
                            <Text style={styles.todoListItemText}>{item.task}</Text>
                            <View style={styles.icon}>
                                <View>
                                    <Text style={styles.editButton}>Edit</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: 'skyblue',
    },
    header: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: '700',
        marginVertical: 10,
        color: 'black',
    },
    btnParent: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    addbtn: {
        paddingHorizontal: 5,
        width: 120,
    },
    resetbtn: {
        paddingHorizontal: 5,
        width: 120,
    },
    userInput: {
        borderColor: 'blue',
        borderWidth: 1,
        marginVertical: 5,
        paddingHorizontal: 10,
        fontSize: 20,
    },
    todoParent: {
        borderColor: 'blue',
        borderWidth: 1,
        marginTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    todoList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    todoListItemNumber: {
        fontSize: 35,
        fontWeight: '700',
    },
    todoListItemText: {
        fontSize: 20,
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        fontSize: 15,
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 7,
        borderRadius: 100,
        color: 'white',
    }
});

export default Home;
