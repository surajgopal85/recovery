import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import { Option, OptionList, PrimaryButton } from "@/components/Controls";
import { ResponseTransition } from "@/components/ResponseTransition";
import { patterns } from "@/constants/options";
import { useRecovery } from "@/state/RecoveryContext";

export default function Patterns() {
  const router = useRouter();
  const { profile, setProfile } = useRecovery();
  const [values, setValues] = useState(profile.strugglePatterns);
  const [responded, setResponded] = useState(false);
  const toggle = (item: string) =>
    setValues((v) =>
      v.includes(item) ? v.filter((x) => x !== item) : [...v, item],
    );

  const responseTitle =
    values.length === 1
      ? "That's honest."
      : "You're already seeing this isn't contained to one part of your life.";

  return (
    <FlowScreen
      title={responded ? "" : "How is this showing up in your life?"}
      body={responded ? undefined : "Choose all that feel true."}
      footer={
        <PrimaryButton
          label="CONTINUE"
          disabled={!values.length}
          onPress={() => {
            if (!responded) {
              setProfile({ strugglePatterns: values });
              setResponded(true);
            } else {
              router.push("/outcome");
            }
          }}
        />
      }
    >
      {responded ? (
        <ResponseTransition
          visible
          title={responseTitle}
          body={
            values.length === 1
              ? "Even one pattern is worth paying attention to. We're looking for the first thread to pull."
              : "That matters. We don't need to repair everything at once \u2014 we're looking for the first thread to pull."
          }
        />
      ) : (
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
      )}
    </FlowScreen>
  );
}
