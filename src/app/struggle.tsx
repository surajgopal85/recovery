import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import { Option, OptionList, PrimaryButton } from "@/components/Controls";
import { struggles } from "@/constants/options";
import { useRecovery } from "@/state/RecoveryContext";

export default function Struggle() {
  const router = useRouter();
  const { profile, setProfile } = useRecovery();
  const [value, setValue] = useState(profile.struggle);
  return (
    <FlowScreen
      eyebrow="What brought you here?"
      title="What are you struggling with?"
      footer={
        <PrimaryButton
          label="CONTINUE"
          disabled={!value}
          onPress={() => {
            setProfile({ struggle: value });
            router.push("/patterns");
          }}
        />
      }
    >
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
    </FlowScreen>
  );
}
