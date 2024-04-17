import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Home = () => {
    const [todo, setTodo] = useState([]);
    const [inputTodo, setInputTodo] = useState('');
    const [inputType, setInputType] = useState({ task: '', edit: false, status: false, id: uniqueId, check: false });

    const uniqueId = () => parseInt(Date.now() * Math.random());

    const handleChange = (task) => {
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
        setTodo([...todo, { ...inputType, id: uniqueId() }]);
        setInputType({ task: '', edit: false, status: false });
    };

    const handleResetTodo = () => {
        setTodo([]);
        setInputType({ task: '', edit: false, status: false });
    };

    const handleDelete = (id) => {
        const removedTodo = todo.filter(item => item.id !== id);
        setTodo(removedTodo);
    };

    const handleUnChecked = (id) => {
        const checkBoxTodo = todo.map(item => {
            if (item.id === id) {
                return { ...item, check: false };
            }
            return item;
        });
        setTodo(checkBoxTodo);
    }
    const handleChecked = (id) => {
        const checkBoxTodo = todo.map(item => {
            if (item.id === id) {
                return { ...item, check: true };
            }
            return item;
        });
        setTodo(checkBoxTodo);
    }

    const handleToggle = (id) => {
        const updatedTodo = todo.map(item => {
            if (item.id === id) {
                return { ...item, task: setInputTodo(item.task), edit: true };
            }
            return item;
        });
        setTodo(updatedTodo);
    }

    const handleEdit = (id) => {
        const editTodo = todo.map(item => {
            if (item.id === id) {
                return { ...item, task: inputTodo, edit: false };
            }
            return item;
        });
        setTodo(editTodo);
    };

    return (
        <View className='w-11/12 mx-auto'>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} hidden={false} />
            <View className='flex flex-row justify-between items-center py-5'>
                <Text className='text-3xl font-bold text-red-600'>Todo List</Text>
                <TouchableOpacity>
                    <MaterialIcons size={30} color="red" onPress={handleResetTodo} name='clear-all' />
                </TouchableOpacity>
            </View>
            <View className='relative flex flex-row items-center h-12 pl-3 justify-between outline-none border border-red-600 rounded-3xl overflow-hidden shadow-lg'>
                <View className='max-w-[250px]'>
                    <TextInput
                        className='text-base'
                        placeholder='Enter Task Here'
                        value={inputType.task}
                        onChangeText={(task) => handleChange(task)}
                    />
                </View>
                <TouchableOpacity onPress={handleAddTodo}>
                    <View className='bg-purple-400 text-white p-4 text-base font-medium'>
                        <Entypo color={'white'} size={17} name='paper-plane' />
                    </View>
                </TouchableOpacity>
            </View>
            
            <FlatList
                className='mt-5'
                data={todo}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className='flex flex-row items-center justify-between px-3 py-1'>
                        <View className='w-[15%]'>
                            {
                                item.check
                                    ?
                                    (<AntDesign size={25} onPress={() => handleUnChecked(item.id)} color={'green'} name='check' />)
                                    :
                                    (<Fontisto size={15} onPress={() => handleChecked(item.id)} name='radio-btn-passive' />)
                            }
                        </View>
                        <View className='w-[55%]'>
                            {item.edit ?
                                (<TextInput
                                    className='outline-none border px-10 rounded-md h-10'
                                    value={inputTodo}
                                    onChangeText={(text) => setInputTodo(text)}
                                />)
                                :
                                (<Text className='text-lg'>{item.task}</Text>)
                            }
                        </View>
                        <View className='w-[30%] flex flex-row justify-around'>
                            {
                                item.edit ?
                                    (<TouchableOpacity onPress={() => handleEdit(item.id)}>
                                        <Feather name='edit' size={25} color="blue" />
                                    </TouchableOpacity>)
                                    :
                                    (<TouchableOpacity onPress={() => handleToggle(item.id)}>
                                        <Feather name='edit' size={25} color="green" />
                                    </TouchableOpacity>)
                            }
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Feather name='trash-2' size={25} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
});

export default Home;
