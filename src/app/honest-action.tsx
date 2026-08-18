import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import { Option, OptionList, PrimaryButton } from "@/components/Controls";
import { actionOptions } from "@/constants/options";
import { useRecovery } from "@/state/RecoveryContext";
import { actionFromChoice, suggestedActions } from "@/utils/actionSuggestions";
import { RecoveryAction } from "@/types/recovery";
export default function HonestAction() {
  const router = useRouter();
  const { inventory, profile, setCurrentAction } = useRecovery();
  const [choice, setChoice] = useState<string>();
  const [suggestion, setSuggestion] = useState<RecoveryAction>();
  const suggestions = useMemo(
    () => suggestedActions(inventory, profile),
    [inventory, profile],
  );
  const unsure = choice === "I'm not sure";
  const selected = unsure
    ? suggestion
    : choice
      ? actionFromChoice(choice)
      : undefined;
  return (
    <FlowScreen
      title="What do you think the next honest action is?"
      body={
        unsure
          ? "Start with one of these small, concrete actions."
          : "Choose what feels honest and useful—not what solves everything."
      }
      footer={
        <PrimaryButton
          label="CHOOSE THIS ACTION"
          disabled={!selected}
          onPress={() => {
            if (selected) {
              setCurrentAction(selected);
              router.push("/next-action");
            }
          }}
        />
      }
    >
      <OptionList>
        {(unsure ? suggestions : actionOptions).map((item) =>
          typeof item === "string" ? (
            <Option
              key={item}
              label={item}
              selected={choice === item}
              onPress={() => {
                setChoice(item);
                setSuggestion(undefined);
              }}
            />
          ) : (
            <Option
              key={item.title}
              label={item.title}
              detail={item.detail}
              selected={suggestion?.title === item.title}
              onPress={() => setSuggestion(item)}
            />
          ),
        )}
      </OptionList>
    </FlowScreen>
  );
}
