import { useRouter } from "expo-router";
import { FlowScreen } from "@/components/FlowScreen";
import { PrimaryButton } from "@/components/Controls";

const introductionCopy = [
  "When life gets tangled, bring us what you’re carrying.",
  "We’ll help you slow it down, tell the truth about it, and find the next useful action.",
  "One honest action at a time.",
].join("\n\n");

export default function Introduction() {
  const router = useRouter();
  return (
    <FlowScreen
      title="This is Gentle Path."
      body={introductionCopy}
      footer={
        <PrimaryButton
          label="CONTINUE"
          onPress={() => router.replace("/home")}
        />
      }
    />
  );
}
