import { components } from "@/lib/types/apiTypes";
import InfoLabel from "./InfoLabel";

type InfoQuestStepsProps = {
  data: {
    questSteps: Array<components["schemas"]["QuestStepBaseEntityWithQuest"]>;
  };
};

export default function InfoQuestSteps({ data }: InfoQuestStepsProps) {
  return (
    <>
      {data.questSteps.length > 0 && (
        <div>
          <InfoLabel>Quest Steps:</InfoLabel>
          <div className="grid gap-4">
            {data.questSteps.map((step) => (
              <p
                key={`${step.questId.toString()}-${step.id.toString()}`}
                className="font-bold flex flex-col"
              >
                {`${step.quest.name} #${step.index.toString()}:`}
                <span className="font-normal">{step.description}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
