import React from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { FaLink } from "@react-icons/all-files/fa/FaLink";
import { Tooltip } from "@chakra-ui/react";
import { Link } from "gatsby";
import diDot from "./../images/dot-white-50.png";

const Sidebar = () => {
  return (
    <div style={{ height: "100vh", position: "fixed" }}>
      <ProSidebar collapsed>
        <SidebarHeader>
          <div className='d-flex justify-content-center p-3'>
            <img style={{ width: "35px" }} src={diDot} alt='' />
          </div>
        </SidebarHeader>
        <Menu iconShape='circle'>
          <Tooltip placement='right-end' label='Partner Page Creation'>
            <MenuItem icon={<FaUserFriends />}>
              <Link to='/page-creation' />
            </MenuItem>
          </Tooltip>
          <Tooltip placement='right-end' label='Marketing URL Creation'>
            <MenuItem icon={<FaLink />}>
              <Link to='/url-builder' />
            </MenuItem>
          </Tooltip>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
