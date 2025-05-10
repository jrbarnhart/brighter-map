import InfoContainer from "@/components/InfoPanel/infoContents/InfoContainer";
import InfoLabel from "@/components/InfoPanel/infoContents/InfoLabel";
import InfoSkeleton from "@/components/InfoPanel/infoContents/InfoSkeleton";
import InfoTitle from "@/components/InfoPanel/infoContents/InfoTitle";
import { InfoPanelContext } from "@/components/InfoPanel/InfoPanel";
import MapLink from "@/components/MapLink/MapLink";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { questByIdQueryOptions } from "@/queries/quests/questsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useParams } from "react-router";

export default function QuestDetails() {
  const { id } = useParams();
  const idNum = Number(id);
  const context: InfoPanelContext | undefined = useOutletContext();
  const { setInfoOpen, screenSize } = context || {};

  const { data, isLoading, error } = useQuery(questByIdQueryOptions(idNum));

  if (isLoading) {
    return <InfoSkeleton />;
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
                className="flex flex-col gap-1 border-b pb-2"
              >
                {/* Checkbox + Label */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`step-${step.index.toString()}-id:${step.id.toString()}`}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={`step-${step.index.toString()}-id:${step.id.toString()}`}
                    className="text-base"
                  >
                    #{step.index} {step.description}
                  </Label>
                </div>

                {/* Optional Action Links */}
                {step.roomId && (
                  <div className="flex gap-2 pl-7 pt-1">
                    {step.roomId && (
                      <div className="flex items-center gap-2">
                        <p>Room: </p>
                        <MapLink
                          roomId={step.roomId}
                          setInfoOpen={setInfoOpen}
                          closeInfo={screenSize && screenSize.width <= 768}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </InfoContainer>
  );
}
