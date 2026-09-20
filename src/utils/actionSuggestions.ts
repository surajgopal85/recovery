import { Inventory, RecoveryAction, RecoveryProfile } from "@/types/recovery";

const action = (title: string, detail: string): RecoveryAction => ({
  id: `action-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  title,
  detail,
  status: "proposed",
});

export function suggestedActions(
  inventory: Inventory,
  profile: RecoveryProfile,
): RecoveryAction[] {
  if (
    inventory.category === "Craving" ||
    profile.struggle === "Alcohol" ||
    profile.struggle === "Drugs"
  ) {
    return [
      action(
        "Call or text someone I trust",
        "Tell them plainly what is happening and ask them to stay connected with you.",
      ),
      action(
        "Remove access to something that's hurting me",
        "Create distance from the substance or situation right now.",
      ),
      action(
        "Go to a meeting or seek recovery support",
        "Choose the next available source of human support.",
      ),
    ];
  }
  if (
    inventory.category === "Dishonesty" ||
    profile.strugglePatterns.includes("I'm hiding something.")
  ) {
    return [
      action(
        "Tell someone the truth",
        "Choose one trustworthy person and share what you have been carrying.",
      ),
      action(
        "Write down what happened honestly",
        "Write the facts without defending or punishing yourself.",
      ),
      action(
        "Call or text someone I trust",
        "Ask for a private conversation today.",
      ),
    ];
  }
  if (inventory.category === "Resentment") {
    return [
      action(
        "Write down what happened honestly",
        "Name what happened, how it affected you, and what is yours to do now.",
      ),
      action(
        "Call or text someone I trust",
        "Talk it through with someone who supports your recovery.",
      ),
      action(
        "Apologize or repair something",
        "Make only the part of the repair that belongs to you.",
      ),
    ];
  }
  return [
    action(
      "Do something I've been avoiding",
      "Take the smallest concrete step that is within your control.",
    ),
    action(
      "Call or text someone I trust",
      "Let one trustworthy person know what you are facing.",
    ),
    action(
      "Write down what happened honestly",
      "Put the facts in writing before deciding what follows.",
    ),
  ];
}

export function actionFromChoice(choice: string): RecoveryAction {
  const details: Record<string, string> = {
    "Tell someone the truth":
      "Choose one trustworthy person and tell them honestly what has been happening.",
    "Call or text someone I trust":
      "Contact one trustworthy person today and say that you need to talk.",
    "Go to a meeting or seek recovery support":
      "Choose the next available meeting or recovery support and make a plan to attend.",
    "Write down what happened honestly":
      "Write down the facts without minimizing, defending, or punishing yourself.",
    "Remove access to something that's hurting me":
      "Create practical distance between you and what is hurting you.",
    "Apologize or repair something":
      "Name the harm you caused and ask what responsible repair looks like.",
    "Ask for professional help":
      "Contact a qualified professional and ask for an appointment or next step.",
    "Do something I've been avoiding":
      "Take the smallest concrete step toward the thing you have been avoiding.",
    "Something else":
      "Take the honest action you named while it is still clear.",
  };
  return action(
    choice,
    details[choice] ?? "Take one concrete, honest step today.",
  );
}

export function smallerVersion(current: RecoveryAction): RecoveryAction {
  const detail =
    current.title.includes("Call or text") ||
    current.title.includes("Tell someone")
      ? "Send this message: “There is something I need to talk about honestly. Can we speak today?”"
      : `Spend five minutes starting this: ${current.title.toLowerCase()}. You only need to begin.`;
  return { ...current, title: `Begin: ${current.title}`, detail };
}
