import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import { Field, PrimaryButton } from "@/components/Controls";
import { ResponseTransition } from "@/components/ResponseTransition";
import { useRecovery } from "@/state/RecoveryContext";

export default function Fear() {
  const router = useRouter();
  const { inventory, setInventory } = useRecovery();
  const [value, setValue] = useState(inventory.honestyFear ?? "");
  const [responded, setResponded] = useState(false);
  return (
    <FlowScreen
      title={
        responded
          ? ""
          : "What are you afraid will happen if you face this honestly?"
      }
      footer={
        <PrimaryButton
          label="CONTINUE"
          disabled={!value.trim()}
          onPress={() => {
            if (!responded) {
              setInventory({ honestyFear: value.trim() });
              setResponded(true);
            } else {
              router.push("/honest-action");
            }
          }}
        />
      }
    >
      {responded ? (
        <ResponseTransition
          visible
          title="Honesty feels risky."
          body="But avoiding this has a cost too. You don't have to face everything today — just enough to take one honest step."
        />
      ) : (
        <Field
          autoFocus
          value={value}
          onChangeText={setValue}
          placeholder="Name the fear as plainly as you can…"
        />
      )}
    </FlowScreen>
  );
}
