"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import TreeNode from "./menu-tree-node";
import { TeamForm } from "./team-form";
import { useGetMenuItemQuery } from "./teams-query";

/**
 * A component to render a tree view from a nested array of data.
 *
 * @param {TreeViewProps} props
 * @param {TreeNode[]} props.data
 * @returns {JSX.Element}
 */
export const TreeView = ({ data }: TreeViewProps): JSX.Element => {
  const [expandAll, setExpandAll] = useState<boolean>(true);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const handleExpandAll = () => setExpandAll(true);

  const handleCollapseAll = () => setExpandAll(false);

  const handleNodeClick = (id: any) =>
    setSelectedNodeId(id === selectedNodeId ? null : id);

  const { data: item } = useGetMenuItemQuery(selectedNodeId ?? "");
  console.log("🚀 ~ TreeView ~ item:", item);

  return (
    <div className="flex justify-between">
      <div className="w-full">
        <div className="static mb-4 flex w-full justify-start space-x-8">
          <Button
            variant="outline"
            onClick={handleExpandAll}
            className="rounded bg-gray-700 px-3 py-1 text-white"
          >
            Expand All
          </Button>
          <Button onClick={handleCollapseAll} variant="outline">
            Collapse All
          </Button>
        </div>

        {data?.map((node, index) => (
          <TreeNode
            key={node?.id}
            node={node}
            expandAll={expandAll}
            isFirstParent={index === 0}
            selectedNodeId={selectedNodeId}
            onNodeClick={handleNodeClick}
          />
        ))}
      </div>

      <div>
        <TeamForm data={item} />
      </div>
    </div>
  );
};

export type TreeNode = {
  id?: string;
  name?: string;
  children?: TreeNode[];
};

export type TreeViewProps = {
  data: TreeNode[];
};

export default TreeView;
