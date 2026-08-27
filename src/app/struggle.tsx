import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import { Option, OptionList, PrimaryButton } from "@/components/Controls";
import { ResponseTransition } from "@/components/ResponseTransition";
import { struggles } from "@/constants/options";
import { useRecovery } from "@/state/RecoveryContext";

export default function Struggle() {
  const router = useRouter();
  const { profile, setProfile } = useRecovery();
  const [value, setValue] = useState(profile.struggle);
  const [responded, setResponded] = useState(false);
  return (
    <FlowScreen
      eyebrow={responded ? undefined : "What brought you here?"}
      title={responded ? "" : "What are you struggling with?"}
      footer={
        <PrimaryButton
          label="CONTINUE"
          disabled={!value}
          onPress={() => {
            if (!responded) {
              setProfile({ struggle: value });
              setResponded(true);
            } else {
              router.push("/patterns");
            }
          }}
        />
      }
    >
      {responded ? (
        <ResponseTransition
          visible
          title="Naming it matters."
          body="You don't have to untangle everything at once. We're going to find one place to start."
        />
      ) : (
        <OptionList>
          {struggles.map((item) => (
            <Option
              key={item}
              label={item}
              selected={value === item}
              onPress={() => setValue(item)}
            />
          ))}
        </OptionList>
      )}
    </FlowScreen>
  );
}
