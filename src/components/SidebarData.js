import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
  
export const SidebarData = [
  /*
  {
    title: "Tracker",
    path: "/tracker",
    icon: <AiIcons.AiFillHome />,  
  },
  {
    title: "Reporting",
    path: "/reporting",
    icon: <AiIcons.AiFillHome />,  
  },
  {
    title: "Planning",
    path: "/planning",
    icon: <FaIcons.FaCalendar />,
  },
  */
  {
    title: "Guides",
    path: "/Guides",
    icon: <FaIcons.FaBook />,
    subNav: [
      {
        title: "Requests",
        path: "/Guides/requests",
        icon: <FaIcons.FaBook />,
        subNav: [
          {
            title: "Access",
            path: "/Guides/AccessRequests",
            icon: <FaIcons.FaBook />,
            cName: "sub-nav",
          },
          {
            title: "VS license key",
            path: "/Guides/VsLicenseKey",
            icon: <FaIcons.FaBook />,
          }
        ],
      },

      {
        title: "Incidents",
        icon: <FaIcons.FaBook />,
         subNav: [
          {
            title: "Process",
            path: "/Guides/Process",
            icon: <FaIcons.FaBook />,
            cName: "sub-nav",
          },
          {
            title: "K.Articles",
            path: "/Guides/IncidentsKArticles",
            icon: <FaIcons.FaBook />,
          },
          {
            title: "Examples",
            path: "/Guides/IncidentsExamples",
            icon: <FaIcons.FaBook />,
          }
        ],
        
      },
      {title: "Packages",
        path: "/Guides/packages",
        icon: <FaIcons.FaBook />,
        cName: "sub-nav",
      }
    ],
    path: "/guides",
    icon: <FaIcons.FaBook />,
  },
  
];