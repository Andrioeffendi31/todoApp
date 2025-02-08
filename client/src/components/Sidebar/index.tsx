"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarOpen } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Icon,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects, isFetching, isError } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.global.isSidebarOpen);

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl 
  transition-all duration-300 ease-in-out z-40 dark:bg-black overflow-y-auto bg-white
  ${isSidebarOpen ? "w-64 opacity-100 visible" : "w-0 opacity-0 invisible"}
  `;

  useEffect(() => {
    if (isError) {
      router.push("/login");
    }
  }, [isError, router]);

  return (
    <div className={sidebarClassNames}>
      <div className="mb-8 flex h-[100%] w-full flex-col justify-start overflow-x-hidden">
        {/* top logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            Ticket Bestie
          </div>
          {isSidebarOpen ? (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarOpen());
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          ) : null}
        </div>
        {/* team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <div>
            <h3 className="text-md line-clamp-1 font-bold tracking-wide dark:text-gray-200">
              BESTIE TEAM
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* navbar links */}
        <nav className="z-10 w-full">
          <SidebarLink href="/" icon={Home} label="Home" />
          <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
          <SidebarLink href="/search" icon={Search} label="Search" />
          <SidebarLink href="/settings" icon={Settings} label="Settings" />
          <SidebarLink href="/users" icon={User} label="Users" />
          <SidebarLink href="/teams" icon={Users} label="Teams" />
        </nav>

        {/* projects */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          <ChevronIcon isOpen={showProjects} />
        </button>

        {/* project list */}
        <div
          className={`flex flex-col transition-all duration-300 ${
            showProjects ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {projects ? (
            projects.map((project) => (
              <SidebarLink
                key={project.id}
                href={`/projects/${project.id}`}
                icon={Briefcase}
                label={project.name}
              />
            ))
          ) : (
            <div className="px-8 py-3 text-gray-500">
              {isFetching ? "Loading projects..." : "No projects"}
            </div>
          )}
        </div>

        {/* priorities links */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          <ChevronIcon isOpen={showPriority} />
        </button>
        <div
          className={`flex flex-col transition-all duration-300 ${
            showPriority ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <SidebarLink
            href="/priority/urgent"
            icon={AlertCircle}
            label="Urgent"
          />
          <SidebarLink href="/priority/high" icon={ShieldAlert} label="High" />
          <SidebarLink
            href="/priority/medium"
            icon={AlertTriangle}
            label="Medium"
          />
          <SidebarLink href="/priority/low" icon={AlertOctagon} label="Low" />
          <SidebarLink
            href="/priority/backlog"
            icon={Layers3}
            label="Backlog"
          />
        </div>
      </div>
    </div>
  );
};

type SidebarLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start overflow-hidden px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <div className="h-6 w-6 flex-shrink-0">
          <Icon className="h-full w-full text-gray-800 dark:text-gray-100" />
        </div>
        <span
          className={`line-clamp-1 font-medium text-gray-800 dark:text-gray-100`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`transform transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <ChevronDown className="h-5 w-5" />
    </div>
  );
};

export default Sidebar;
