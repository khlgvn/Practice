import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';

export default function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] = useState([])
  
  
  const onButtonPress = (value) => {
    if (value === '=') { 
      try {
        const evalResult = eval(input);
        setResult(evalResult);
        setHistory(prev => ([{ expression: input, result: evalResult }, ...prev]));
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '.') {
      // Prevent multiple decimals in the current number
      const parts = input.split(/[-+*/]/);
      const last = parts[parts.length - 1];
      if (!last.includes('.')) {
        setInput(prev => prev + value);
      }
    } else if (value === '%') {
      // Calculate percentage of the last number
      const match = input.match(/(\d+\.?\d*)$/);
      if (match) {
        const num = parseFloat(match[1]);
        const percent = num / 100;
        setInput(input.replace(/(\d+\.?\d*)$/, percent.toString()));
      }
    } else {
      setInput(prev => prev + value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/* History ScrollView */}
      <ScrollView style={{ maxHeight: 100, marginBottom: 10 }} contentContainerStyle={{ alignItems: 'flex-end' }}>
        {history.map((item, idx) => (
          <Text key={idx} style={{ color: '#555', fontSize: 18 }}>
            {item.expression} = {item.result}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.inputcontainer}>
        <TextInput 
          style={styles.inputText}
          value={input}
          onChangeText={setInput}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.buttonContainer}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '%', 'C', '=', '+'].map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.button}
            onPress={() => onButtonPress(item)}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cedada', // Light blue background
  }, 
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText  : {
    fontSize: 40,
    color: '#000000',
  },
  inputcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: 30,

  },
  buttonContainer: {
    flex: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  button: {
    fontSize: 24,
    width: '25%',
    height: '20%', 
    justifyContent: 'center',
    alignItems: 'center',
     borderWidth: 1,
     borderColor: '#000000',
  },
  buttonText: {
    fontSize: 24,
  },
});
