// File: EntryForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

export default function EntryForm({ onSave, configOptions }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString(),
    room: configOptions.roomNumbers[0],
    testCategory: configOptions.testCategories[0],
    tester: configOptions.testerNumbers[0],
    activeSockets: '',
    temperature: '',
    humidity: '',
    voltage: '',
    failedPositions: '',
    otherParamTitle: configOptions.otherParameterTitles[0],
    otherParamValue: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    onSave({ ...formData, timestamp: Date.now() });
    setFormData({
      ...formData,
      activeSockets: '',
      temperature: '',
      humidity: '',
      voltage: '',
      failedPositions: '',
      otherParamValue: '',
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <View>
      <Text style={styles.label}>Date: {formData.date}</Text>
      <Text style={styles.label}>Time: {formData.time}</Text>

      <Text style={styles.label}>Room Number</Text>
      <Picker
        selectedValue={formData.room}
        onValueChange={(val) => handleChange('room', val)}>
        {configOptions.roomNumbers.map((r) => <Picker.Item label={r} value={r} key={r} />)}
      </Picker>

      <Text style={styles.label}>Test Category</Text>
      <Picker
        selectedValue={formData.testCategory}
        onValueChange={(val) => handleChange('testCategory', val)}>
        {configOptions.testCategories.map((c) => <Picker.Item label={c} value={c} key={c} />)}
      </Picker>

      <Text style={styles.label}>Tester Number</Text>
      <Picker
        selectedValue={formData.tester}
        onValueChange={(val) => handleChange('tester', val)}>
        {configOptions.testerNumbers.map((t) => <Picker.Item label={t} value={t} key={t} />)}
      </Picker>

      <Text style={styles.label}># Active Sockets</Text>
      <TextInput style={styles.input} value={formData.activeSockets} onChangeText={(val) => handleChange('activeSockets', val)} />

      <Text style={styles.label}>Temperature Value</Text>
      <TextInput style={styles.input} value={formData.temperature} onChangeText={(val) => handleChange('temperature', val)} />

      <Text style={styles.label}>Humidity Value</Text>
      <TextInput style={styles.input} value={formData.humidity} onChangeText={(val) => handleChange('humidity', val)} />

      <Text style={styles.label}>Voltage</Text>
      <TextInput style={styles.input} value={formData.voltage} onChangeText={(val) => handleChange('voltage', val)} />

      <Text style={styles.label}>Failed Positions</Text>
      <TextInput style={styles.input} value={formData.failedPositions} onChangeText={(val) => handleChange('failedPositions', val)} />

      <Text style={styles.label}>Other Parameters</Text>
      <Picker
        selectedValue={formData.otherParamTitle}
        onValueChange={(val) => handleChange('otherParamTitle', val)}>
        {configOptions.otherParameterTitles.map((t) => <Picker.Item label={t} value={t} key={t} />)}
      </Picker>
      <TextInput style={styles.input} value={formData.otherParamValue} onChangeText={(val) => handleChange('otherParamValue', val)} />

      <Button title="Next" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 10,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
});
