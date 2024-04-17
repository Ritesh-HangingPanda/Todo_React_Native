import React, { useState, useEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Home = () => {
    const [allTodos, setAllTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [inputTodo, setInputTodo] = useState('');
    const [inputType, setInputType] = useState({ task: '', edit: false, status: false });

    useEffect(() => {
        handleFilter(currentFilter);
    }, [allTodos]);

    const uniqueId = () => parseInt(Date.now() * Math.random());

    const handleChange = (task) => {
        setInputType(prevState => ({
            ...prevState,
            task: task
        }));
    };

    const handleAddTodo = () => {
        if (inputType.task.trim() === '') {
            return console.warn('Kindly Add Task');
        }
        const newTodo = { ...inputType, id: uniqueId() };
        setAllTodos([...allTodos, newTodo]);
        setInputType({ task: '', edit: false, status: false });
    };

    const handleResetTodo = () => {
        setAllTodos([]);
        setInputType({ task: '', edit: false, status: false });
    };

    const handleDelete = (id) => {
        const removedTodo = allTodos.filter(item => item.id !== id);
        setAllTodos(removedTodo);
    };

    const handleUnChecked = (id) => {
        const checkBoxTodo = allTodos.map(item => {
            if (item.id === id) {
                return { ...item, status: false };
            }
            return item;
        });
        setAllTodos(checkBoxTodo);
    }

    const handleChecked = (id) => {
        const checkBoxTodo = allTodos.map(item => {
            if (item.id === id) {
                return { ...item, status: true };
            }
            return item;
        });
        setAllTodos(checkBoxTodo);
    }

    const handleToggle = (id) => {
        const updatedTodo = allTodos.map(item => {
            if (item.id === id) {
                return { ...item, task: setInputTodo(item.task), edit: true };
            }
            return item;
        });
        setAllTodos(updatedTodo);
    }

    const handleEdit = (id) => {
        const editTodo = allTodos.map(item => {
            if (item.id === id) {
                return { ...item, task: inputTodo, edit: false, status:false };
            }
            return item;
        });
        setAllTodos(editTodo);
    };

    const [currentFilter, setCurrentFilter] = useState('all');

    const handleFilter = (e) => {
        setCurrentFilter(e);
        switch (e) {
            case 'all':
                setFilteredTodos(allTodos);
                break;
            case 'assign':
                setFilteredTodos(allTodos.filter(item => item.status === false));
                break;
            case 'done':
                setFilteredTodos(allTodos.filter(item => item.status === true));
                break;
            default:
                setFilteredTodos(allTodos);
        }
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
                        keyboardType="default"
                        returnKeyType="done"
                        onSubmitEditing={handleAddTodo}
                    />
                </View>
                <TouchableOpacity onPress={handleAddTodo}>
                    <View className='bg-blue-400 text-white p-4 text-base font-medium'>
                        <Entypo color={'white'} size={17} name='paper-plane' />
                    </View>
                </TouchableOpacity>
            </View>
            <View className='relative py-5 flex flex-row items-center justify-center gap-2'>
                <TouchableOpacity onPress={() => handleFilter('all')} className={`outline-none border border-red-600 ${currentFilter == 'all' ? 'bg-blue-400 py-3 rounded-3xl w-20' : 'bg-gray-400 py-3 rounded-3xl w-20'}`}>
                    <View >
                        <Text className='text-white text-center text-sm font-medium'>All</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('assign')} className={`outline-none border border-red-600 ${currentFilter == 'assign' ? 'bg-blue-400 py-3 rounded-3xl w-20' : 'bg-gray-400 py-3 rounded-3xl w-20'}`}>
                    <View>
                        <Text className='text-white text-center text-sm font-medium'>Assign</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('done')} className={`outline-none border border-red-600 ${currentFilter == 'done' ? 'bg-blue-400 py-3 rounded-3xl w-20' : 'bg-gray-400 py-3 rounded-3xl w-20'}`}>
                    <View>
                        <Text className='text-white text-center text-sm font-medium'>Done</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredTodos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className='flex flex-row items-center justify-between px-3 py-1'>
                        <View className='w-[15%]'>
                            {
                                item.status
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
                                (<Text className={`${item.status ? 'text-lg line-through' : 'text-lg'}`}>{item.task}</Text>)
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
                            {
                                currentFilter == 'done' && 'all' &&
                                (
                                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                        <Feather name='trash-2' size={25} color="red" />
                                    </TouchableOpacity>
                                )
                            }
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
