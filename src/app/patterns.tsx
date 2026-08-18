import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import { Option, OptionList, PrimaryButton } from "@/components/Controls";
import { patterns } from "@/constants/options";
import { useRecovery } from "@/state/RecoveryContext";
export default function Patterns() {
  const router = useRouter();
  const { profile, setProfile } = useRecovery();
  const [values, setValues] = useState(profile.strugglePatterns);
  const toggle = (item: string) =>
    setValues((v) =>
      v.includes(item) ? v.filter((x) => x !== item) : [...v, item],
    );
  return (
    <FlowScreen
      title="How is this showing up in your life?"
      body="Choose all that feel true."
      footer={
        <PrimaryButton
          label="CONTINUE"
          disabled={!values.length}
          onPress={() => {
            setProfile({ strugglePatterns: values });
            router.push("/outcome");
          }}
        />
      }
    >
      <OptionList>
        {patterns.map((item) => (
          <Option
            key={item}
            label={item}
            selected={values.includes(item)}
            onPress={() => toggle(item)}
          />
        ))}
      </OptionList>
    </FlowScreen>
  );
}
