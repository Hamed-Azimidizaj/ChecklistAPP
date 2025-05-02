// File: ConfigScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function ConfigScreen({ configOptions, setConfigOptions, goBack }) {
  const [localConfig, setLocalConfig] = useState(configOptions);

  const handleChange = (field, index, value) => {
    const updated = [...localConfig[field]];
    updated[index] = value;
    setLocalConfig({ ...localConfig, [field]: updated });
  };

  const addItem = (field) => {
    setLocalConfig({ ...localConfig, [field]: [...localConfig[field], ''] });
  };

  const saveChanges = () => {
    setConfigOptions(localConfig);
    goBack();
  };

  const renderField = (field, title) => (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={localConfig[field]}
        keyExtractor={(item, idx) => `${field}-${idx}`}
        renderItem={({ item, index }) => (
          <TextInput
            style={styles.input}
            value={item}
            onChangeText={(val) => handleChange(field, index, val)}
          />
        )}
      />
      <Button title={`Add ${title}`} onPress={() => addItem(field)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderField('roomNumbers', 'Room Numbers')}
      {renderField('testCategories', 'Test Categories')}
      {renderField('testerNumbers', 'Tester Numbers')}
      {renderField('otherParameterTitles', 'Other Parameter Titles')}
      <Button title="Save" onPress={saveChanges} />
      <Button title="Back" onPress={goBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
  },
});
