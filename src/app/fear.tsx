import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import { Field, PrimaryButton } from "@/components/Controls";
import { useRecovery } from "@/state/RecoveryContext";
export default function Fear() {
  const router = useRouter();
  const { inventory, setInventory } = useRecovery();
  const [value, setValue] = useState(inventory.honestyFear ?? "");
  return (
    <FlowScreen
      title="What are you afraid will happen if you face this honestly?"
      footer={
        <PrimaryButton
          label="CONTINUE"
          disabled={!value.trim()}
          onPress={() => {
            setInventory({ honestyFear: value.trim() });
            router.push("/honest-action");
          }}
        />
      }
    >
      <Field
        autoFocus
        value={value}
        onChangeText={setValue}
        placeholder="Name the fear as plainly as you can…"
      />
    </FlowScreen>
  );
}
