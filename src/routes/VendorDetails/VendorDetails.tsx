import { vendorByIdQueryOptions } from "@/queries/vendors/vendorsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import InfoContainer from "../../components/InfoPanel/infoContents/InfoContainer";
import InfoTitle from "../../components/InfoPanel/infoContents/InfoTitle";
import InfoLabel from "../../components/InfoPanel/infoContents/InfoLabel";
import React from "react";
import InfoLink from "../../components/InfoPanel/InfoLink/InfoLink";
import InfoSkeleton from "@/components/InfoPanel/infoContents/InfoSkeleton";
import InfoError from "@/components/InfoPanel/infoContents/InfoError";

function InfoLinkContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-stone-700 rounded-lg px-2.5 py-1 overflow-y-auto max-h-60">
      {children}
    </div>
  );
}

export default function VendorDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(vendorByIdQueryOptions(idNum));

  if (isLoading) {
    return <InfoSkeleton />;
  }

  if (error) {
    return <InfoError error={error} />;
  }

  if (!data) {
    return <InfoError error={new Error("Data not found.")} />;
  }
  return (
    <InfoContainer>
      <InfoTitle>{data.name || data.npc.name}</InfoTitle>
      {/* Npc */}
      <div className="flex items-baseline gap-2">
        <InfoLabel>Npc:</InfoLabel>
        <InfoLink to={`/npcs/${data.npc.id.toString()}`} variant="npc">
          {data.npc.name}
        </InfoLink>
      </div>
      {/* Misc Items */}
      {data.miscItems.length > 0 && (
        <div>
          <InfoLabel>Misc Items:</InfoLabel>
          <InfoLinkContainer>
            {data.miscItems.map((item, index) => (
              <React.Fragment
                key={`misc-item-${item.id.toString()}-${index.toString()}`}
              >
                <p>{item.name}</p>
              </React.Fragment>
            ))}
          </InfoLinkContainer>
        </div>
      )}
      {/* Consumable Variants */}
      {data.consumableVariants.length > 0 && (
        <div>
          <InfoLabel>Consumables:</InfoLabel>
          <InfoLinkContainer>
            {data.consumableVariants.map((variant, index) => (
              <React.Fragment
                key={`consumable-variant-${variant.id.toString()}-${index.toString()}`}
              >
                <p>
                  {variant.name} {variant.consumable.name}
                </p>
              </React.Fragment>
            ))}
          </InfoLinkContainer>
        </div>
      )}
      {/* Armor Variants */}
      {data.armorVariants.length > 0 && (
        <div>
          <InfoLabel>Armor:</InfoLabel>
          <InfoLinkContainer>
            {data.armorVariants.map((variant, index) => (
              <React.Fragment
                key={`armor-variant-${variant.id.toString()}-${index.toString()}`}
              >
                <p>
                  {variant.name} {variant.armor.name}
                </p>
              </React.Fragment>
            ))}
          </InfoLinkContainer>
        </div>
      )}
      {/* Weapon Variants */}
      {data.weaponVariants.length > 0 && (
        <div>
          <InfoLabel>Weapons:</InfoLabel>
          <InfoLinkContainer>
            {data.weaponVariants.map((variant, index) => (
              <React.Fragment
                key={`weapon-variants-${variant.id.toString()}-${index.toString()}`}
              >
                <p>
                  {variant.name} {variant.weapon.name}
                </p>
              </React.Fragment>
            ))}
          </InfoLinkContainer>
        </div>
      )}
      {/* Resource Variants */}
      {data.resourceVariants.length > 0 && (
        <div>
          <InfoLabel>Resources:</InfoLabel>
          <InfoLinkContainer>
            {data.resourceVariants.map((variant, index) => (
              <React.Fragment
                key={`resource-variant-${variant.id.toString()}-${index.toString()}`}
              >
                <p>
                  {variant.name} {variant.resource.name}
                </p>
              </React.Fragment>
            ))}
          </InfoLinkContainer>
        </div>
      )}
    </InfoContainer>
  );
}
