import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import {
  Field,
  Option,
  OptionList,
  PrimaryButton,
} from "@/components/Controls";
import { outcomes } from "@/constants/options";
import { useRecovery } from "@/state/RecoveryContext";
export default function Outcome() {
  const router = useRouter();
  const { profile, setProfile } = useRecovery();
  const [choice, setChoice] = useState(
    outcomes.includes(profile.desiredOutcome ?? "")
      ? profile.desiredOutcome
      : undefined,
  );
  const [text, setText] = useState(
    choice ? "" : (profile.desiredOutcome ?? ""),
  );
  const value = text.trim() || choice;
  return (
    <FlowScreen
      title="What would getting better give you back?"
      body="Choose what feels closest, or use your own words."
      footer={
        <PrimaryButton
          label="CONTINUE"
          disabled={!value}
          onPress={() => {
            setProfile({ desiredOutcome: value });
            router.push("/carrying");
          }}
        />
      }
    >
      <OptionList>
        {outcomes.map((item) => (
          <Option
            key={item}
            label={item}
            selected={choice === item}
            onPress={() => {
              setChoice(item);
              setText("");
            }}
          />
        ))}
      </OptionList>
      <Field
        value={text}
        onChangeText={(v) => {
          setText(v);
          if (v) setChoice(undefined);
        }}
        placeholder="Something else…"
        style={{ marginTop: 12, minHeight: 88 }}
      />
    </FlowScreen>
  );
}
