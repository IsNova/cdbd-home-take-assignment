"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import TreeNode from "./menu-tree-node";
import { TeamForm } from "./menu-form";
import { useGetMenuItemQuery } from "./menu-query";

/**
 * A component to render a tree view from a nested array of data.
 *
 * @param {{ data: TreeNode[]; parents?: string[] }} props
 * @returns {JSX.Element}
 */
export const TreeView = ({
  data,
  parents = [],
}: {
  data: TreeNode[];
  parents?: string[] | any;
}): JSX.Element => {
  const [expandAll, setExpandAll] = useState<boolean>(true);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleExpandAll = () => setExpandAll(true);

  const handleCollapseAll = () => setExpandAll(false);

  const handleNodeClick = (id: string | null) =>
    setSelectedNodeId(id === selectedNodeId ? null : id);

  const { data: item } = useGetMenuItemQuery(selectedNodeId ?? "");

  const formDefaultValue: TreeNode | undefined = item;

  return (
    <div className="flex flex-col justify-start space-y-24 md:flex-row md:space-x-24 md:space-y-0">
      <div>
        {parents?.length ? (
          <div className="">
            <div className="static mb-4 flex w-full justify-start space-x-2">
              <Button
                variant="outline"
                onClick={handleExpandAll}
                className="rounded-full bg-gray-900 px-4 py-1 text-xs text-white"
              >
                Expand All
              </Button>
              <Button
                onClick={handleCollapseAll}
                variant="outline"
                className="rounded-full px-4 py-1 text-xs"
              >
                Collapse All
              </Button>
            </div>

            {data?.map((node, index) => (
              <TreeNode
                key={node.id}
                node={node}
                expandAll={expandAll}
                isFirstParent={index === 0}
                selectedNodeId={selectedNodeId}
                onNodeClick={handleNodeClick}
              />
            ))}
          </div>
        ) : (
          <div>
            <>Please add at least one root element</>
          </div>
        )}
      </div>

      <div>
        <TeamForm data={formDefaultValue} />
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
