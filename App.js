import React, { useState, useCallback, useEffect } from 'react';

import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
  FlatList, Modal, TextInput, AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
const Anamatedbtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  //busca todas a tarefas ao iniciar o app
  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');
      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
    }
    loadTasks();
  }, []);

  //verifica se foi criada alguma nova tarefa e salva 
  useEffect(() => {
    async function saveTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));

    }
    saveTasks();
  }, [task]);

  function handleAdd() {

    if (input === '') return;
    const data = {
      key: input,
      task: input
    };
    //setTask  "...task" mantem os dados que ja estão e adiciona
    // os dados que esta recebendo na variavel data.
    setTask([...task, data]);
    //faz fechar o modal de inclusao de tarefa
    setOpen(false);
    //limpa o input
    setInput('');
  }
  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })
  return (
    <SafeAreaView style={styles.container} >
      <StatusBar backgroundColor='#171d31' barStyle="light-content" />

      <View style={styles.content}>
        <Text style={styles.title}> Minhas tarefas </Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScroLLIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} handleDelete={handleDelete} />}

      />

      <Modal anamationType="slide" tansparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <Animatable.View style={styles.modalHeader} animation="fadeInUp" useNativeDriver>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={40} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}> Nova Tarefa</Text>
          </Animatable.View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>

            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              outoCorrect={false}
              placeholder="O que precisa fazer hoje?"
              style={styles.input}
              value={input}
              onChangeText={(texto) => setInput(texto)}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}> Cadastrar</Text>
            </TouchableOpacity>

          </Animatable.View>

        </SafeAreaView>

      </Modal>
      <Anamatedbtn
        style={styles.fab}
        userNativeDriver
        anamation="bounceInUp"
        duration={1500}
        onPress={() => setOpen(true)}
      >
        <Ionicons nome="ios-add" size={35} color="#FFF">+</Ionicons>

      </Anamatedbtn>

    </SafeAreaView>


  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31',
    marginTop: 10
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    }
  },
  modal: {
    flex: 1,
    backgroundColor: "#171d31",
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDiretion: 'row',
    alingItens: 'center',
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 25,
    color: '#FFF'
  },
  modalBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRigth: 10,
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 9,
    height: 85,
    textAlingVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },
  handleAdd: {
    backgroundColor: '#FFF',
    marginTop: 10,
    alingItems: 'center',
    justiftContent: 'center',
    marginLeft: 10,
    marginRight: 10,

  },
  handleAdd: {
    backgroundColor: '#FFF',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadiu: 5,
  },
  handleAddText: {
    fonteSize: 20,
    marginTop: 10,
    alingItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5

  },


});