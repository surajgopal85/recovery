import { useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import {
  Field,
  Option,
  OptionList,
  PrimaryButton,
} from "@/components/Controls";
import { categories } from "@/constants/options";
import { useRecovery } from "@/state/RecoveryContext";
export default function Carrying() {
  const router = useRouter();
  const { inventory, setInventory } = useRecovery();
  const [category, setCategory] = useState(inventory.category);
  const [description, setDescription] = useState(inventory.description ?? "");
  return (
    <FlowScreen
      title="What are you carrying today?"
      body="Choose what feels closest."
      footer={
        <PrimaryButton
          label="BEGIN INVENTORY"
          disabled={!category}
          onPress={() => {
            setInventory({ category, description: description.trim() });
            router.push("/control");
          }}
        />
      }
    >
      <OptionList>
        {categories.map((item) => (
          <Option
            key={item}
            label={item}
            selected={category === item}
            onPress={() => setCategory(item)}
          />
        ))}
      </OptionList>
      <Field
        value={description}
        onChangeText={setDescription}
        placeholder="Add a few words, if it helps…"
        style={{ marginTop: 12 }}
      />
    </FlowScreen>
  );
}
