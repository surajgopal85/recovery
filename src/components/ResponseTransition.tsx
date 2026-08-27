import { useEffect, useMemo } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  body: string;
};

export function ResponseTransition({ visible, title, body }: Props) {
  const opacity = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } else {
      opacity.setValue(0);
    }
  }, [visible, opacity]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.accent} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  accent: {
    backgroundColor: "#9EAA9F",
    borderRadius: 1,
    height: 2,
    marginBottom: 28,
    width: 32,
  },
  title: {
    color: "#2D5A49",
    fontSize: 26,
    fontWeight: "600",
    letterSpacing: -0.5,
    lineHeight: 33,
  },
  body: {
    color: "#56625B",
    fontSize: 17,
    lineHeight: 26,
    marginTop: 14,
  },
});
