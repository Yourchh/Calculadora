import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface BasicCalculatorProps {
  display: string;
  onAppendNumber: (num: string) => void;
  onSetOperation: (op: string) => void;
  onCalculate: () => void;
  onClearAll: () => void;
  onDeleteLast: () => void;
  onToggleSign: () => void;
  onPercentage: () => void;
  isScientific: boolean;
  onToggleMode: (value: boolean) => void;
}

export const BasicCalculator: React.FC<BasicCalculatorProps> = ({
  display,
  onAppendNumber,
  onSetOperation,
  onCalculate,
  onClearAll,
  onDeleteLast,
  onToggleSign,
  onPercentage,
  isScientific,
  onToggleMode,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const buttonConfigs = [
    [
      { label: "AC", onPress: onClearAll, style: styles.buttonClear },
      { label: "DEL", onPress: onDeleteLast, style: styles.buttonFunction },
      { label: "+/-", onPress: onToggleSign, style: styles.buttonFunction },
      {
        label: "÷",
        onPress: () => onSetOperation("/"),
        style: styles.buttonOperation,
      },
    ],
    [
      { label: "7", onPress: () => onAppendNumber("7"), style: styles.button },
      { label: "8", onPress: () => onAppendNumber("8"), style: styles.button },
      { label: "9", onPress: () => onAppendNumber("9"), style: styles.button },
      {
        label: "×",
        onPress: () => onSetOperation("*"),
        style: styles.buttonOperation,
      },
    ],
    [
      { label: "4", onPress: () => onAppendNumber("4"), style: styles.button },
      { label: "5", onPress: () => onAppendNumber("5"), style: styles.button },
      { label: "6", onPress: () => onAppendNumber("6"), style: styles.button },
      {
        label: "−",
        onPress: () => onSetOperation("-"),
        style: styles.buttonOperation,
      },
    ],
    [
      { label: "1", onPress: () => onAppendNumber("1"), style: styles.button },
      { label: "2", onPress: () => onAppendNumber("2"), style: styles.button },
      { label: "3", onPress: () => onAppendNumber("3"), style: styles.button },
      {
        label: "+",
        onPress: () => onSetOperation("+"),
        style: styles.buttonOperation,
      },
    ],
    [
      { label: "0", onPress: () => onAppendNumber("0"), style: styles.button },
      { label: ".", onPress: () => onAppendNumber("."), style: styles.button },
      { label: "%", onPress: onPercentage, style: styles.button },
      { label: "=", onPress: onCalculate, style: styles.buttonEquals },
    ],
  ];

  return (
    <ThemedView style={styles.container}>
      <View
        style={[
          styles.displayContainer,
          {
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.05)",
          },
        ]}
      >
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

      <View
        style={[
          styles.modeSelector,
          {
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.03)",
          },
        ]}
      >
        <ThemedText style={styles.modeLabel}>Básico</ThemedText>
        <Switch
          value={isScientific}
          onValueChange={onToggleMode}
          trackColor={{ false: "#0a7ea4", true: "#0a7ea4" }}
          thumbColor={isScientific ? "#ffffff" : "#ffffff"}
          ios_backgroundColor="#0a7ea4"
        />
        <ThemedText style={styles.modeLabel}>Científico</ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        {buttonConfigs.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((config, colIndex) => {
              const getButtonStyle = () => {
                if (config.style === styles.buttonClear) {
                  return {
                    backgroundColor: isDark
                      ? "rgba(255, 69, 58, 0.8)"
                      : "rgba(255, 59, 48, 0.7)",
                  };
                } else if (config.style === styles.buttonOperation) {
                  return {
                    backgroundColor: isDark
                      ? "rgba(255, 149, 0, 0.8)"
                      : "rgba(255, 102, 0, 0.7)",
                  };
                } else if (config.style === styles.buttonEquals) {
                  return {
                    backgroundColor: isDark
                      ? "rgba(48, 209, 88, 0.8)"
                      : "rgba(52, 168, 83, 0.7)",
                  };
                } else if (config.style === styles.buttonFunction) {
                  return {
                    backgroundColor: isDark
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(0, 0, 0, 0.1)",
                  };
                } else {
                  return {
                    backgroundColor: isDark
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.05)",
                  };
                }
              };

              return (
                <TouchableOpacity
                  key={`${rowIndex}-${colIndex}`}
                  onPress={config.onPress}
                  style={[styles.baseButton, getButtonStyle()]}
                  activeOpacity={0.7}
                >
                  <ThemedText style={styles.buttonText}>
                    {config.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  displayContainer: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    height: 85,
  },
  displayScrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  display: {
    fontSize: 48,
    fontWeight: "300",
    textAlign: "right",
    letterSpacing: 0.5,
    lineHeight: 50,
    includeFontPadding: false,
  },
  modeSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 10,
    borderRadius: 12,
  },
  modeLabel: {
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.8,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 10,
  },
  baseButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
  buttonWide: {
    flex: 2,
  },
  buttonOperation: {},
  buttonFunction: {},
  buttonClear: {},
  buttonEquals: {},
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
