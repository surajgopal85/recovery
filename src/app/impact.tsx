import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import { Option, OptionList, PrimaryButton } from "@/components/Controls";
import { affectedPeople } from "@/constants/options";
import { useRecovery } from "@/state/RecoveryContext";
export default function Impact() {
  const router = useRouter();
  const { inventory, setInventory } = useRecovery();
  const [values, setValues] = useState(inventory.affectedPeople);
  const toggle = (item: string) =>
    setValues((v) =>
      v.includes(item) ? v.filter((x) => x !== item) : [...v, item],
    );
  return (
    <FlowScreen
      title="Who has this affected?"
      body="Choose all that apply."
      footer={
        <PrimaryButton
          label="CONTINUE"
          disabled={!values.length}
          onPress={() => {
            setInventory({ affectedPeople: values });
            router.push("/fear");
          }}
        />
      }
    >
      <OptionList>
        {affectedPeople.map((item) => (
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
