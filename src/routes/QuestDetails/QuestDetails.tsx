import InfoContainer from "@/components/InfoPanel/infoContents/InfoContainer";
import InfoLabel from "@/components/InfoPanel/infoContents/InfoLabel";
import InfoTitle from "@/components/InfoPanel/infoContents/InfoTitle";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { questByIdQueryOptions } from "@/queries/quests/questsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function QuestDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(questByIdQueryOptions(idNum));

  if (isLoading) {
    return (
      <div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div>
        <p>There was an error while fetching the data.</p>
      </div>
    );
  }

  return (
    <InfoContainer>
      <InfoTitle>{data.name}</InfoTitle>
      {/* Region */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>Region: </InfoLabel>
        <p>{data.region.name}</p>
      </div>
      <div>
        <InfoLabel>Quest Steps</InfoLabel>
        <div className="flex flex-col gap-2 border-t pt-2">
          {data.steps
            .sort((a, b) => {
              if (a.index < b.index) return -1;
              if (a.index > b.index) return 1;
              return 0;
            })
            .map((step) => (
              <div
                key={`step-${step.id.toString()}`}
                className="flex gap-3 items-center"
              >
                <Checkbox
                  id={`step-${step.index.toString()}-id:${step.id.toString()}`}
                />
                <Label
                  htmlFor={`step-${step.index.toString()}-id:${step.id.toString()}`}
                  className="text-base"
                >
                  #{step.index} {step.description}
                </Label>
              </div>
            ))}
        </div>
      </div>
    </InfoContainer>
  );
}
