import React , { useState } from  'react';

import {View , Text , StyleSheet, SafeAreaView, TouchableOpacity, 
  FlatList, Modal, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import { StatusBar } from 'expo-status-bar';
import  * as Animatable from 'react-native-animatable';
const Anamatedbtn =  Animatable.createAnimatableComponent(TouchableOpacity);

export default function App(){
  const[task,  setTask ] = useState([ 
     {key: 1 , task: 'comprar pao'},
     {key: 2 , task: 'comprar ribeiro'},
     {key: 4 , task: 'comprar arroz'},
     {key: 5 , task: 'comprar leite'},

]);
 const[open, setOpen] = useState(false);
 const[input, setInput] = useState('');
     return( 
     <SafeAreaView  style={styles.container} >
        <StatusBar backgroundColor='#171d31' barStyle="light-content"/>
        
       <View style={ styles.content}>
               <Text  style ={styles.title}> Minhas tarefas </Text>
              
       </View>
        <FlatList
          marginHorizontal={10}
          showsHorizontalScroLLIndicator={false}
          data={task}
          keyExtractor={ (item) => String(item.key)}
          renderItem={({item})=><TaskList data={item}/> }
         
        />

        <Modal anamationType= "slide" tansparent={false} visible={open}>
            <SafeAreaView style={styles.modal}>
              <View style={styles.modalHeader}>
                 <TouchableOpacity onPress={ ()=> setOpen(false)}>
                  <Ionicons style={{marginLeft:5 , marginRight:5}}name= "md-arrow-back" size={40} color="#000" />
                 </TouchableOpacity>
                 <Text  style={styles.modalTitle}> Nova Tarefa</Text>
              </View>

              <View style={styles.modalBody} animation="fadeInup" useNativeDriver>
                
                 <TextInput
                 multiline={true}
                 placeholderTextColor="#747474"
                 outoCorrect={false}
                  placeholder="O que precisa fazer hoje?"
                  style={styles.input}
                  value={input}
                  onChageText={ (texto) => setInput(texto)}
                 />
                 
                 <TouchableOpacity style={styles.handleAdd}>
                  <Text  style={styles.handleAddText}> Cadastrar</Text>
                 </TouchableOpacity>

              </View>

            </SafeAreaView>
      
        </Modal>
      <Anamatedbtn
       style={styles.fab}
       userNativeDriver
       anamation="bounceInUp"
       duration={1500}
       onPress={()=> setOpen(true) }
       >
        <Ionicons nome="ios-add" size={35} color="#FFF">+</Ionicons>
       
      </Anamatedbtn>

     </SafeAreaView>
    

) }
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#171d31',
        marginTop: 10
    },
    title:{
      marginTop: 10,
      paddingBottom: 10,
      fontSize: 25,
      textAlign: 'center',
      color: '#fff'
    },
    fab:{
      position:'absolute',
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
      shadowOffset:{
        width: 1,
        height: 3,
      }
    },
    modal:{
      flex: 1,
      backgroundColor: "#171d31",
    },
    modalHeader:{
      marginLeft: 10,
      marginTop: 20,
      flexDiretion: 'row',
      alingItens: 'center',
    },
    modalTitle:{
       marginLeft:15,
       fontSize: 25,
       color:'#FFF'
    },
    modalBody:{
      marginTop:15,
    },
    input:{
      fontSize: 15,
      marginLeft: 10,
      marginRigth: 10,
      marginTop:30,
      backgroundColor: '#FFF',
      padding: 9,
      height: 85,
      textAlingVertical: 'top',
      color: '#000',
      borderRadius: 5,
    },
    handleAdd:{
      backgroundColor: '#FFF',
      marginTop: 10,
      alingItems: 'center',
      justiftContent: 'center',
      marginLeft: 10,
      marginRight: 10,

    },
    handleAdd:{
      backgroundColor: '#FFF',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',  
      marginLeft: 10,
      marginRight: 10,
      height: 40,
      borderRadiu: 5,
    },
    handleAddText:{
      fonteSize: 20,
    }//38:45
});