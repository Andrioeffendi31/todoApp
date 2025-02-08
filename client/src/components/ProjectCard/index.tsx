import { Project } from "@/state/api";
import React from "react";

type Props = {
  project: Project;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A"; // Handle missing dates gracefully
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="mb-4 flex flex-col rounded-md bg-white p-4 shadow dark:bg-dark-secondary md:p-6">
      <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
      <p className="mt-2 text-gray-600">{project.description || "No description available"}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>📅 Start: {formatDate(project.startDate)}</span>
        <span>⏳ End: {formatDate(project.endDate)}</span>
      </div>
    </div>
  );
};

export default ProjectCard;