import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import {
  Field,
  Option,
  OptionList,
  PrimaryButton,
} from "@/components/Controls";
import { timingOptions } from "@/constants/options";
import { useRecovery } from "@/state/RecoveryContext";
export default function Commitment() {
  const router = useRouter();
  const { currentAction, setCurrentAction } = useRecovery();
  const [timing, setTiming] = useState<string>();
  const [custom, setCustom] = useState("");
  const valid = timing && (timing !== "Choose a time" || custom.trim());
  return (
    <FlowScreen
      title="One honest action."
      body={"You do not need to solve your whole life right now. Do this one thing.\n\nWhen will you do it?"}
      footer={
        <PrimaryButton
          label="COMMIT"
          disabled={!valid}
          onPress={() => {
            if (currentAction && valid) {
              setCurrentAction({
                ...currentAction,
                dueAt: timing === "Choose a time" ? custom.trim() : timing,
                status: "committed",
              });
              router.push("/introduction");
            }
          }}
        />
      }
    >
      <OptionList>
        {timingOptions.map((item) => (
          <Option
            key={item}
            label={item}
            selected={timing === item}
            onPress={() => setTiming(item)}
          />
        ))}
      </OptionList>
      {timing === "Choose a time" ? (
        <Field
          value={custom}
          onChangeText={setCustom}
          placeholder="For example: Saturday at 10 AM"
          style={{ marginTop: 12, minHeight: 72 }}
        />
      ) : null}
    </FlowScreen>
  );
}
