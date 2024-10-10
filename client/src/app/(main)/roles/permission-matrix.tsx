"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const ACTIONS = ["all", "read", "create", "update", "delete"];

const abilityOptions = [
  {
    subject: "All",
    action: ["all", "read", "create", "update", "delete"],
  },
  {
    subject: "Team",
    action: ["all", "read", "create", "delete"],
  },
  {
    subject: "Match",
    action: ["all", "read", "create", "update", "delete"],
  },
  {
    subject: "User",
    action: ["all", "read", "create", "update"],
  },
];

const columns = ["", "All", "Read", "Create", "Edit", "Delete"];

type Ability = {
  subject: string;
  action: string[];
};
export function PermissionMatrix() {
  const [selectedAbilities, setSelectedAbilities] = useState<Ability[]>([]);

  const checkSelected = (subject: string, action: string) => {
    const selectedAbility = selectedAbilities.find(
      (ability) => ability.subject === subject,
    );
    if (!selectedAbility) {
      return false;
    }
    return selectedAbility.action.includes(action);
  };

  const addToSelected = (subject: string, action: string) => {
    const prevSelectedAbility = selectedAbilities.find(
      (ability) => ability.subject === subject,
    );
    if (subject === "All" && action === "all") {
      setSelectedAbilities(abilityOptions);
    } else if (subject === "All") {
      const updatedSelectedAbilities = abilityOptions
        .map((ability) => {
          const selectedAbility = selectedAbilities.find(
            (sAbility) => sAbility.subject === ability.subject,
          );
          if (ability.action.includes(action)) {
            return { subject: ability.subject, action: [action] };
          }

          return { subject: ability.subject, action: [] };
        })
        .filter((ability) => ability.action.length > 0);

      setSelectedAbilities(updatedSelectedAbilities);
    } else if (action === "all") {
    } else {
      const { action: prevAction } = prevSelectedAbility ?? {};
      const newAction = new Set([...(prevAction ?? []), action]);
      const filteredSelectedAbilities = selectedAbilities.filter(
        (ability) => ability.subject !== subject,
      );

      const updatedSelectedAbilities = [
        ...filteredSelectedAbilities,
        { subject, action: Array.from(newAction) },
      ];
      setSelectedAbilities(updatedSelectedAbilities);
    }
  };

  const removeFromSelected = (subject: string, action: string) => {
    const prevSelectedAbility = selectedAbilities.find(
      (ability) => ability.subject === subject,
    );
    if (!prevSelectedAbility) {
      return;
    } else {
      const { action: prevAction } = prevSelectedAbility;
      const updatedAction = prevAction.filter(
        (prevAction) => prevAction !== action,
      );
      const filteredSelectedAbilities = selectedAbilities.filter(
        (ability) => ability.subject !== subject,
      );
      const updatedSelectedAbilities = [
        ...filteredSelectedAbilities,
        { subject, action: updatedAction },
      ].filter((ability) => ability.action.length > 0);

      setSelectedAbilities(updatedSelectedAbilities);
    }
  };

  return (
    <div className="mx-auto mt-4 max-w-4xl rounded-lg ring-1 ring-gray-300">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="whitespace-nowrap py-3 pl-4 pr-3 text-center text-xs font-medium uppercase text-gray-800 "
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {abilityOptions.map((ability) => {
            const { subject } = ability;
            return (
              <tr key={subject}>
                <td className="whitespace-nowrap rounded-lg px-2 py-2 text-right text-sm font-medium text-gray-900">
                  {subject}
                </td>
                {ACTIONS.map((action) => {
                  const hidden =
                    action !== "all" && !ability.action.includes(action);
                  const checked = checkSelected(subject, action);
                  return (
                    <td
                      key={`${subject}-${action}`}
                      className="whitespace-nowrap rounded-lg px-2 py-2 text-center text-sm font-medium text-gray-900"
                    >
                      <Checkbox
                        hidden={hidden}
                        checked={checked}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToSelected(subject, action);
                          } else {
                            removeFromSelected(subject, action);
                          }
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
