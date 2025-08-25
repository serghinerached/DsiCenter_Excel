import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
  
const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  
  &:hover {
    background: #252831;
    border-left: 4px solid green;
    cursor: pointer;
  }
`;
  

const SubMenu = ({ item, depth = 0 }) => {
  const [subnav, setSubnav] = useState(false);

  const toggleSubnav = () => setSubnav(!subnav);

  return (
    <div style={{ paddingLeft: depth * 15 }}> {/* indentation visuelle */}
      <SidebarLink to={item.path} className="sidebar-link" onClick={item.subNav ? toggleSubnav : undefined}  >
        <div className="flex items-center gap-2">
          {item.icon} <span>{item.title}</span>
        </div>
        <div>
          {item.subNav && (subnav ? item.iconOpened || "▲" : item.iconClosed || "▼")}
        </div>
      </SidebarLink>

      {subnav && item.subNav?.map((subItem, index) => (
          <SubMenu key={index} item={subItem} depth={depth + 1} />
      ))}
    </div>
  );
};


export default SubMenu;