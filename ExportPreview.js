// File: ExportPreview.js
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, Alert, Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';

export default function ExportPreview({ entries, goBack }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const filterData = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const valid = entries.filter((e) => {
      const dt = new Date(e.date);
      return dt >= start && dt <= end;
    });
    if (valid.length === 0) {
      Alert.alert('No data', 'Dates are out of range. Only available data will be exported.');
    }
    setFilteredData(valid);
  };

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Checklist');
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

    const uri = FileSystem.cacheDirectory + 'checklist.xlsx';
    await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });

    await Sharing.shareAsync(uri, { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  };

  return (
    <View style={styles.container}>
      <Text>Start Date (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={startDate} onChangeText={setStartDate} />
      <Text>End Date (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} />
      <Button title="Preview Data" onPress={filterData} />

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.date} - {item.room} - {item.testCategory} - {item.tester}</Text>
          </View>
        )}
      />

      <Button title="Export to Excel" onPress={exportToExcel} />
      <Button title="Back" onPress={goBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
});
