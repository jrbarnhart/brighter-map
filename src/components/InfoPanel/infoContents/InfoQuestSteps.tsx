import { components } from "@/lib/types/apiTypes";
import InfoLabel from "./InfoLabel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import InfoLink from "../InfoLink/InfoLink";

type InfoQuestStepsProps = {
  data: {
    questSteps: Array<components["schemas"]["QuestStepBaseEntityWithQuest"]>;
  };
};

export default function InfoQuestSteps({ data }: InfoQuestStepsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {data.questSteps.length > 0 && (
        <div>
          <Collapsible open={open}>
            <div className="flex items-center gap-2">
              <InfoLabel>Quest Steps:</InfoLabel>
              <CollapsibleTrigger
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
                className="flex gap-1 bg-stone-700 hover:bg-stone-600 cursor-pointer p-1 rounded-md"
              >
                {open ? "Hide" : "Show"}
                {open ? <Eye /> : <EyeClosed />}
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="grid gap-3">
                {data.questSteps.map((step) => (
                  <div key={`${step.questId.toString()}-${step.id.toString()}`}>
                    <InfoLink
                      to={`/quests/${step.questId.toString()}`}
                      variant="quest"
                      className="font-bold flex flex-col"
                    >
                      {`${step.quest.name} #${step.index.toString()}:`}
                    </InfoLink>
                    <span className="font-normal">{step.description}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </>
  );
}
