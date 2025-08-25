import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
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
        title: "Monthly - Wo - FOR TEST",
        path: "/tasks/incidents",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      },
      {
        title: "Incidents",
        path: "/Reporting/Monthly_Incidents",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      },
      {
        title: "Monthly - Wo Scade",
        path: "/Reporting/Monthly_WoScade",
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
    path: "/Guides",
    icon: <FaIcons.FaBook />,
    subNav: [
      {
        title: "Requests",
        path: "/Guides/requests",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      },
      {
        title: "Incidents",
        path: "/Guides/Incidents",
        icon: <FaIcons.FaCalculator />,
      subNav: [
      {
        title: "Free",
        path: "/Guides/incidentsFree",
        icon: <FaIcons.FaCalculator />,
      subNav: [
      {
        title: "Installation",
        path: "/Guides/incidentsFree/Installation",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      },
      {
        title: "Issue",
        path: "/Guides/incidentsFree/Issue",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      }
    ]
      },
      {
        title: "Pull user",
        path: "/Guides/incidentsHome/pullUser",
        icon: <FaIcons.FaCalculator />,
        subNav: [
        {
          title: "Installation",
          path: "/Guides/incidentsFree",
          icon: <FaIcons.FaCalculator />,
          cName: "sub-nav",
        },
        {
          title: "Issue",
          path: "/Guides/incidentsHome/pullUser",
          icon: <FaIcons.FaCalculator />,
          cName: "sub-nav",
        }
      ]
      },
      {title: "Remote",
        path: "/Guides/incidentsHome/remoteControl",
        icon: <FaIcons.FaCalculator />,
        subNav: [
        {
          title: "Installation",
          path: "/Guides/incidentsFree",
          icon: <FaIcons.FaCalculator />,
          cName: "sub-nav",
        },
        {
          title: "Issue",
          path: "/Guides/incidentsHome/pullUser",
          icon: <FaIcons.FaCalculator />,
          cName: "sub-nav",
        }
      ]
      }
    ],
      },
      {title: "Packages",
        path: "/Guides/packages",
        icon: <FaIcons.FaCalculator />,
        cName: "sub-nav",
      }
    ],
    path: "/guides",
    icon: <FaIcons.FaBook />,
  },
  
];