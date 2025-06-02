import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
  
export const SidebarData = [
  {
    title: "Tracker",
    path: "/tracker",
    icon: <AiIcons.AiFillHome />,  
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  
    subNav: [
      {
        title: "Requests",
        path: "/tasks/requests",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Incidents",
        path: "/tasks/incidents",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Packages",
        path: "/tasks/packages",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "KBs",
        path: "/kbs",
        icon: <FaIcons.FaBookmark />,
      },
    ],
  },
  {
    title: "Planning",
    path: "/planning",
    icon: <FaIcons.FaCalendar />,
  },
   {
    title: "Reporting",
    path: "/reporting",
    icon: <FaIcons.FaCalculator />,
  },
  {
    title: "Guides",
    path: "/guides",
    icon: <FaIcons.FaBook />,
  },
  
];