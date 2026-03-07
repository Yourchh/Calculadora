import { BasicCalculator } from "@/components/basic-calculator";
import { ScientificCalculator } from "@/components/scientific-calculator";
import { ThemedView } from "@/components/themed-view";
import { useCalculator } from "@/hooks/use-calculator";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const [isScientific, setIsScientific] = useState(false);
  const calculator = useCalculator();

  return (
    <ThemedView style={styles.container}>
      {isScientific ? (
        <ScientificCalculator
          display={calculator.state.display}
          onAppendNumber={calculator.appendNumber}
          onSetOperation={calculator.setOperation}
          onCalculate={calculator.calculate}
          onClearAll={calculator.clearAll}
          onDeleteLast={calculator.deleteLast}
          onToggleSign={calculator.toggleSign}
          onPercentage={calculator.percentage}
          onSquareRoot={calculator.squareRoot}
          onSquare={calculator.square}
          onSine={calculator.sine}
          onCosine={calculator.cosine}
          onTangent={calculator.tangent}
          onLogarithm={calculator.logarithm}
          onNaturalLogarithm={calculator.naturalLogarithm}
          onExponential={calculator.exponential}
          onFactorial={calculator.factorial}
          onReciprocal={calculator.reciprocal}
          isScientific={isScientific}
          onToggleMode={setIsScientific}
        />
      ) : (
        <BasicCalculator
          display={calculator.state.display}
          onAppendNumber={calculator.appendNumber}
          onSetOperation={calculator.setOperation}
          onCalculate={calculator.calculate}
          onClearAll={calculator.clearAll}
          onDeleteLast={calculator.deleteLast}
          onToggleSign={calculator.toggleSign}
          onPercentage={calculator.percentage}
          isScientific={isScientific}
          onToggleMode={setIsScientific}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
