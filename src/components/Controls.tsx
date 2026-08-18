import { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.primaryText}>{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}
    >
      <Text style={styles.secondaryText}>{label}</Text>
    </Pressable>
  );
}

export function Option({
  label,
  selected,
  onPress,
  detail,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  detail?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.option, selected && styles.optionSelected]}
    >
      <View style={styles.optionCopy}>
        <Text
          style={[styles.optionText, selected && styles.optionTextSelected]}
        >
          {label}
        </Text>
        {detail ? <Text style={styles.detail}>{detail}</Text> : null}
      </View>
      <View style={[styles.marker, selected && styles.markerSelected]} />
    </Pressable>
  );
}

export function OptionList({ children }: { children: ReactNode }) {
  return <View style={styles.list}>{children}</View>;
}

export function Field(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="#89918B"
      multiline
      textAlignVertical="top"
      {...props}
      style={[styles.field, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  primary: {
    alignItems: "center",
    backgroundColor: "#2D5A49",
    borderRadius: 14,
    minHeight: 54,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  secondary: {
    alignItems: "center",
    borderColor: "#AAB4AC",
    borderRadius: 14,
    borderWidth: 1,
    minHeight: 52,
    justifyContent: "center",
    marginTop: 12,
    paddingHorizontal: 20,
  },
  secondaryText: {
    color: "#2D5A49",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  disabled: { opacity: 0.38 },
  pressed: { opacity: 0.78 },
  list: { gap: 10 },
  option: {
    alignItems: "center",
    backgroundColor: "#FBFAF6",
    borderColor: "#D8D8CE",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 58,
    padding: 16,
  },
  optionSelected: { backgroundColor: "#E5EDE7", borderColor: "#527361" },
  optionCopy: { flex: 1 },
  optionText: { color: "#35443D", fontSize: 16, lineHeight: 22 },
  optionTextSelected: { color: "#203F32", fontWeight: "600" },
  detail: { color: "#69736D", fontSize: 14, lineHeight: 20, marginTop: 6 },
  marker: {
    borderColor: "#A8AFA9",
    borderRadius: 8,
    borderWidth: 1,
    height: 16,
    marginLeft: 12,
    width: 16,
  },
  markerSelected: { backgroundColor: "#2D5A49", borderColor: "#2D5A49" },
  field: {
    backgroundColor: "#FBFAF6",
    borderColor: "#D8D8CE",
    borderRadius: 14,
    borderWidth: 1,
    color: "#24372F",
    fontSize: 16,
    lineHeight: 24,
    minHeight: 120,
    padding: 16,
  },
});
