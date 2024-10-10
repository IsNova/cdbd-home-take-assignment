import React from "react";
import { PermissionMatrix } from "./permission-matrix";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roles",
  description: "Role management",
};
export default function RolesPage() {
  return (
    <div>
      <PermissionMatrix />
    </div>
  );
}
