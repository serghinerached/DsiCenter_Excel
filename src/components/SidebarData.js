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
    title: "Reporting",
    path: "/tasks",
    icon: <FaIcons.FaCalculator />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  
    subNav: [
      {
        title: "Weekly - Wo",
        path: "/tasks/requests",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      },
      {
        title: "Monthly - Wo",
        path: "/tasks/incidents",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      },
      {
        title: "Weekly - Incidents",
        path: "/tasks/packages",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      },
      {
        title: "Monthly - Incidents",
        path: "/Reporting/Monthly_Incidents",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      },
      {
        title: "Monthly - Scade",
        path: "/Reporting/Monthly_Scade",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Planning",
    path: "/planning",
    icon: <FaIcons.FaCalendar />,
  },
  {
    title: "Guides",
    path: "/guides",
    icon: <FaIcons.FaBook />,
  },
  
];