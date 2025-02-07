"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";

type ProjectProps = {
  params: { id: string };
};

const Project = ({ params }: ProjectProps) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  
  return (
    <div>
      {/* modal new task */}
      {/* <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      {/* { activeTab === "Board" && (
        <Board projectId={id}) /> 
      } */}
    </div>
  );
};

export default Project;
