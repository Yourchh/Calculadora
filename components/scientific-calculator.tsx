import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Switch } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface ScientificCalculatorProps {
  display: string;
  onAppendNumber: (num: string) => void;
  onSetOperation: (op: string) => void;
  onCalculate: () => void;
  onClearAll: () => void;
  onDeleteLast: () => void;
  onToggleSign: () => void;
  onPercentage: () => void;
  onSquareRoot: () => void;
  onSquare: () => void;
  onSine: () => void;
  onCosine: () => void;
  onTangent: () => void;
  onLogarithm: () => void;
  onNaturalLogarithm: () => void;
  onExponential: () => void;
  onFactorial: () => void;
  onReciprocal: () => void;
  isScientific: boolean;
  onToggleMode: (value: boolean) => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({
  display,
  onAppendNumber,
  onSetOperation,
  onCalculate,
  onClearAll,
  onDeleteLast,
  onToggleSign,
  onPercentage,
  onSquareRoot,
  onSquare,
  onSine,
  onCosine,
  onTangent,
  onLogarithm,
  onNaturalLogarithm,
  onExponential,
  onFactorial,
  onReciprocal,
  isScientific,
  onToggleMode,
}) => {
  const scientificFunctions = [
    [
      { label: 'sin', onPress: onSine, style: styles.buttonScientific },
      { label: 'cos', onPress: onCosine, style: styles.buttonScientific },
      { label: 'tan', onPress: onTangent, style: styles.buttonScientific },
      { label: 'π', onPress: () => onAppendNumber(Math.PI.toString()), style: styles.buttonScientific },
    ],
    [
      { label: '√', onPress: onSquareRoot, style: styles.buttonScientific },
      { label: 'x²', onPress: onSquare, style: styles.buttonScientific },
      { label: '1/x', onPress: onReciprocal, style: styles.buttonScientific },
      { label: 'e', onPress: () => onAppendNumber(Math.E.toString()), style: styles.buttonScientific },
    ],
    [
      { label: 'log', onPress: onLogarithm, style: styles.buttonScientific },
      { label: 'ln', onPress: onNaturalLogarithm, style: styles.buttonScientific },
      { label: 'e^x', onPress: onExponential, style: styles.buttonScientific },
      { label: 'n!', onPress: onFactorial, style: styles.buttonScientific },
    ],
  ];

  const basicFunctions = [
    [
      { label: 'AC', onPress: onClearAll, style: styles.buttonClear },
      { label: 'DEL', onPress: onDeleteLast, style: styles.buttonFunction },
      { label: '+/-', onPress: onToggleSign, style: styles.buttonFunction },
      { label: '÷', onPress: () => onSetOperation('/'), style: styles.buttonOperation },
    ],
    [
      { label: '7', onPress: () => onAppendNumber('7'), style: styles.button },
      { label: '8', onPress: () => onAppendNumber('8'), style: styles.button },
      { label: '9', onPress: () => onAppendNumber('9'), style: styles.button },
      { label: '×', onPress: () => onSetOperation('*'), style: styles.buttonOperation },
    ],
    [
      { label: '4', onPress: () => onAppendNumber('4'), style: styles.button },
      { label: '5', onPress: () => onAppendNumber('5'), style: styles.button },
      { label: '6', onPress: () => onAppendNumber('6'), style: styles.button },
      { label: '−', onPress: () => onSetOperation('-'), style: styles.buttonOperation },
    ],
    [
      { label: '1', onPress: () => onAppendNumber('1'), style: styles.button },
      { label: '2', onPress: () => onAppendNumber('2'), style: styles.button },
      { label: '3', onPress: () => onAppendNumber('3'), style: styles.button },
      { label: '+', onPress: () => onSetOperation('+'), style: styles.buttonOperation },
    ],
    [
      { label: '0', onPress: () => onAppendNumber('0'), style: styles.buttonWide },
      { label: '.', onPress: () => onAppendNumber('.'), style: styles.button },
      { label: '%', onPress: onPercentage, style: styles.button },
      { label: '=', onPress: onCalculate, style: styles.buttonEquals },
    ],
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.displayContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.displayScrollContent}
        >
          <ThemedText style={styles.display} numberOfLines={1}>
            {display}
          </ThemedText>
        </ScrollView>
      </View>

      <View style={styles.modeSelector}>
        <ThemedText style={styles.modeLabel}>Básico</ThemedText>
        <Switch
          value={isScientific}
          onValueChange={onToggleMode}
          trackColor={{ false: '#0a7ea4', true: '#0a7ea4' }}
          thumbColor={isScientific ? '#ffffff' : '#ffffff'}
          ios_backgroundColor="#0a7ea4"
        />
        <ThemedText style={styles.modeLabel}>Científico</ThemedText>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Scientific Functions */}
        <View style={styles.scientificSection}>
          <ThemedText style={styles.sectionTitle}>Funciones Científicas</ThemedText>
          {scientificFunctions.map((row, rowIndex) => (
            <View key={`sci-${rowIndex}`} style={styles.row}>
              {row.map((config, colIndex) => (
                <TouchableOpacity
                  key={`${rowIndex}-${colIndex}`}
                  onPress={config.onPress}
                  style={[styles.baseButton, config.style]}
                  activeOpacity={0.7}
                >
                  <ThemedText style={styles.buttonText}>{config.label}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Basic Functions */}
        <View style={styles.basicSection}>
          <ThemedText style={styles.sectionTitle}>Operaciones Básicas</ThemedText>
          {basicFunctions.map((row, rowIndex) => (
            <View key={`basic-${rowIndex}`} style={styles.row}>
              {row.map((config, colIndex) => (
                <TouchableOpacity
                  key={`${rowIndex}-${colIndex}`}
                  onPress={config.onPress}
                  style={[styles.baseButton, config.style]}
                  activeOpacity={0.7}
                >
                  <ThemedText style={styles.buttonText}>{config.label}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: '#2a2a2a',
  },
  displayContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    height: 75,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  displayScrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  display: {
    fontSize: 40,
    fontWeight: '300',
    textAlign: 'right',
    letterSpacing: 0.5,
    lineHeight: 42,
    includeFontPadding: false,
  },
  modeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 12,
  },
  modeLabel: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
  },
  scrollContainer: {
    flex: 1,
  },
  scientificSection: {
    marginBottom: 10,
  },
  basicSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 2,
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
    gap: 6,
  },
  baseButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  buttonWide: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  buttonOperation: {
    backgroundColor: 'rgba(255, 102, 0, 0.7)',
  },
  buttonFunction: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonClear: {
    backgroundColor: 'rgba(255, 59, 48, 0.7)',
  },
  buttonEquals: {
    backgroundColor: 'rgba(52, 168, 83, 0.7)',
  },
  buttonScientific: {
    backgroundColor: 'rgba(0, 122, 255, 0.6)',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
