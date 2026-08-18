import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import { Field, PrimaryButton } from "@/components/Controls";
import { useRecovery } from "@/state/RecoveryContext";
export default function Control() {
  const router = useRouter();
  const { inventory, setInventory } = useRecovery();
  const [value, setValue] = useState(inventory.controllablePart ?? "");
  return (
    <FlowScreen
      title="What part of this is within your control?"
      body="Not everything that happened is your responsibility. For now, focus only on what you can honestly act on."
      footer={
        <PrimaryButton
          label="CONTINUE"
          disabled={!value.trim()}
          onPress={() => {
            setInventory({ controllablePart: value.trim() });
            router.push("/impact");
          }}
        />
      }
    >
      <Field
        autoFocus
        value={value}
        onChangeText={setValue}
        placeholder="What can you honestly act on?"
      />
    </FlowScreen>
  );
}
