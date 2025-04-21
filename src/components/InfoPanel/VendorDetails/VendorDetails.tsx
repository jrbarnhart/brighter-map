import { vendorByIdQueryOptions } from "@/queries/vendors/vendorsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import InfoContainer from "../infoContents/InfoContainer";
import InfoTitle from "../infoContents/InfoTitle";
import InfoLabel from "../infoContents/InfoLabel";
import React from "react";
import InfoLink from "../InfoLink/InfoLink";

export default function VendorDetails() {
  const { id } = useParams();
  const idNum = Number(id);

  const { data, isLoading, error } = useQuery(vendorByIdQueryOptions(idNum));

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
      <InfoTitle>{data.name || data.npc.name}</InfoTitle>
      <div className="flex items-baseline gap-2">
        <InfoLabel>Npc:</InfoLabel>
        <InfoLink to={`/npcs/${data.npc.id.toString()}`} variant="npc">
          {data.npc.name}
        </InfoLink>
      </div>
      <InfoLabel>Stock:</InfoLabel>
      {data.miscItems.length > 0 && <InfoLabel>Misc Items:</InfoLabel>}
      {data.miscItems.map((i, index) => (
        <React.Fragment
          key={`misc-item-${i.id.toString()}-${index.toString()}`}
        >
          <p>{i.name}</p>
        </React.Fragment>
      ))}
      {data.consumableVariants.length > 0 && (
        <InfoLabel>Consumables:</InfoLabel>
      )}
      {data.consumableVariants.map((c, index) => (
        <React.Fragment
          key={`consumable-variant-${c.id.toString()}-${index.toString()}`}
        >
          <p>{c.name}</p>
        </React.Fragment>
      ))}
      {data.armorVariants.length > 0 && <InfoLabel>Armor:</InfoLabel>}
      {data.armorVariants.map((a, index) => (
        <React.Fragment
          key={`armor-variant-${a.id.toString()}-${index.toString()}`}
        >
          <p>{a.name}</p>
        </React.Fragment>
      ))}
      {data.weaponVariants.length > 0 && <InfoLabel>Weapons:</InfoLabel>}
      {data.weaponVariants.map((w, index) => (
        <React.Fragment
          key={`weapon-variants-${w.id.toString()}-${index.toString()}`}
        >
          <p>{w.name}</p>
        </React.Fragment>
      ))}
      {data.resourceVariants.length > 0 && <InfoLabel>Resources:</InfoLabel>}
      {data.resourceVariants.map((r, index) => (
        <React.Fragment
          key={`resource-variant-${r.id.toString()}-${index.toString()}`}
        >
          <p>{r.name}</p>
        </React.Fragment>
      ))}
    </InfoContainer>
  );
}
