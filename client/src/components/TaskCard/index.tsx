import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
};

const PriorityTag = ({ priority }: { priority: Task["priority"] }) => (
  <div
    className={`rounded-full px-2 py-1 text-xs font-semibold ${
      priority === "Urgent"
        ? "bg-red-200 text-red-700"
        : priority === "High"
          ? "bg-yellow-200 text-yellow-700"
          : priority === "Medium"
            ? "bg-green-200 text-green-700"
            : priority === "Low"
              ? "bg-blue-200 text-blue-700"
              : "bg-gray-200 text-gray-700"
    }`}
  >
    {priority}
  </div>
);

const StatusTag = ({ status }: { status: Task["status"] }) => (
  <div
    className={`rounded-full px-2 py-1 text-xs font-semibold ${
      status === "To Do"
        ? "bg-gray-200 text-gray-700"
        : status === "Work In Progress"
          ? "bg-yellow-200 text-yellow-700"
          : status === "Under Review"
            ? "bg-blue-200 text-blue-700"
            : status === "Completed"
              ? "bg-green-200 text-green-700"
              : "bg-gray-200 text-gray-700"
    }`}
  >
    {status}
  </div>
);

const TaskCard = ({ task }: Props) => {
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "Not set";
  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  return (
    <div className="mb-4 rounded-md bg-white shadow dark:bg-dark-secondary">
      {(task.attachments?.length ?? 0) > 0 && (
        <Image
          src={`/${task.attachments?.[0].fileURL}`}
          alt={task.attachments?.[0]?.fileName || "Attachment"}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.status && <StatusTag status={task.status} />}
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedDueDate}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description || "No description provided"}
        </p>

        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.userId}
                src={`/${task.assignee.profilePictureUrl!}`}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
