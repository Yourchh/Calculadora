import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface HistoryPanelProps {
  history: string[];
  onClearHistory?: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClearHistory }) => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Historial</ThemedText>
        {history.length > 0 && (
          <TouchableOpacity onPress={onClearHistory} style={styles.clearButton}>
            <ThemedText style={styles.clearButtonText}>Limpiar</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <ThemedText style={styles.emptyText}>Sin historial</ThemedText>
      ) : (
        <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
          {history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <ThemedText style={styles.historyText}>{item}</ThemedText>
            </View>
          ))}
        </ScrollView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 59, 48, 0.6)',
    borderRadius: 8,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  historyText: {
    fontSize: 14,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    marginVertical: 20,
  },
});
