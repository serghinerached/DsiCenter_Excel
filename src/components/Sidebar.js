import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
  
const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
  
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
  
const SidebarNav = styled.nav`
  background: #15171c;
  width: 220px;
  height: 100vh;
  display: flex;
  justify-content: left;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;
  
const SidebarWrap = styled.div`
  width: 88%;
`;
  
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  
  const showSidebar = () => setSidebar(!sidebar);

  const fToday = () => {
    const dateTodayString = new Date().toLocaleDateString("fr-FR") ;
    return dateTodayString;
  };

  const fCurrentTime = () => {
    const today = new Date();
    const hour = today.getHours();
    const currentTime = today.toLocaleTimeString("fr-FR", { hour: 'numeric', hour12: false, minute: 'numeric' });
    return currentTime;
  };
  
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <h1
            style={{ textAlign: "left", 
                     marginLeft: "170px", 
                     color: "white",
                     fontWeight:"bold"
                    }}
          >DSI CENTER (React)</h1>
          <h2
            style={{ textAlign: "right", 
                     marginLeft: "700px", 
                     color: "white",
                     fontWeight:"bold"
                    }}
          >
            {fToday()}  {fCurrentTime()} 
          </h2>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>

  );// end return

}; // end const
  
export default Sidebar;