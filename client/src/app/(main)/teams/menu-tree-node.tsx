"use client";

import { actionAtom } from "@/store";
import { useAtom } from "jotai";
import { Pencil, PlusIcon, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useDeleteMenuMutation } from "./teams-query";

const TreeNode = ({
  node,
  expandAll,
  isFirstParent,
  selectedNodeId,
  onNodeClick,
}: any) => {
  const [isExpanded, setIsExpanded] = useState(expandAll);

  useEffect(() => {
    setIsExpanded(expandAll);
  }, [expandAll]);
  const [action, setAction] = useAtom(actionAtom);

  const handleNodeClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onNodeClick(node.id);
    setAction("edit");
  };

  const { mutate: deleteMenu } = useDeleteMenuMutation();

  return (
    <div className={`relative ${isFirstParent ? "pl-6" : "pl-12"}`}>
      <div className="relative">
        <div className="flex items-center space-y-2">
          <div className="relative">
            <button
              className="relative z-10 mr-2 flex h-6 w-6 items-center justify-center rounded-full border bg-white"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "-" : "+"}
            </button>
          </div>

          <span className="text-gray-800" onClick={handleNodeClick}>
            {node?.name}
          </span>
          {selectedNodeId === node?.id && (
            <div className="ml-2 space-x-2">
              <button
                type="button"
                className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setAction("add")}
              >
                <PlusIcon aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-full bg-red-600 p-1.5 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => deleteMenu(node.id)}
              >
                <Trash2 aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {node?.children && node.children.length > 0 && (
          <div className="relative ml-6">
            {isExpanded &&
              node?.children.map((child: any, index: number) => (
                <div className="relative" key={child.id}>
                  <div className="relative flex items-center">
                    <div className="absolute -left-3 -top-1 h-full w-[1px] bg-gray-300"></div>
                    <div className="absolute -left-2 top-4 h-[1px] w-16 bg-gray-300"></div>
                    <TreeNode
                      node={child}
                      expandAll={expandAll}
                      isLastChild={index === node.children.length - 1}
                      isFirstParent={false}
                      selectedNodeId={selectedNodeId}
                      onNodeClick={onNodeClick}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeNode;
