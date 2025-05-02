// File: App.js
import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import EntryForm from './EntryForm';
import ConfigScreen from './ConfigScreen';
import ExportPreview from './ExportPreview';

export default function App() {
  const [formEntries, setFormEntries] = useState([]);
  const [showConfig, setShowConfig] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [configOptions, setConfigOptions] = useState({
    roomNumbers: ['Room 1', 'Room 2'],
    testCategories: ['Burn-In', 'HAST', 'HTOL'],
    testerNumbers: ['T1', 'T2', 'T3'],
    otherParameterTitles: ['Burn-in Current', 'Chamber RH']
  });

  const handleSaveEntry = (entry) => {
    setFormEntries([...formEntries, entry]);
  };

  const toggleConfig = () => setShowConfig(!showConfig);
  const toggleExport = () => setShowExport(!showExport);

  if (showConfig) {
    return (
      <ConfigScreen
        configOptions={configOptions}
        setConfigOptions={setConfigOptions}
        goBack={() => setShowConfig(false)}
      />
    );
  }

  if (showExport) {
    return (
      <ExportPreview
        entries={formEntries}
        goBack={() => setShowExport(false)}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daily Status Check: Reliability Tests</Text>
      <EntryForm
        onSave={handleSaveEntry}
        configOptions={configOptions}
      />
      <View style={styles.buttonRow}>
        <Button title="Config" onPress={toggleConfig} />
        <Button title="Export" onPress={toggleExport} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
