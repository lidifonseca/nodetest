import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SidebarProfile from 'app/shared/layout/sidebar/sidebar-profile.tsx';
import SidebarNav from 'app/shared/layout/sidebar/sidebar-nav.tsx';

  export interface ISidebarProps {
	pageSidebarMinified: boolean;
	pageSidebarTransparent: boolean;
  toggleSidebarMinify: Function;
  toggleMobileSidebar: Function;
  userAccount: any;
  }

  const Sidebar = (props: ISidebarProps) => {

	return (
		<React.Fragment>
			<div className={(props.pageSidebarMinified ? 'page-sidebar-minified' : '')}>
				<div id="sidebar" className={'sidebar ' + (props.pageSidebarTransparent ? 'sidebar-transparent' : '')}>
					<PerfectScrollbar className="height-full" options={{suppressScrollX: true}}>
						<SidebarProfile userAccount={props.userAccount}/>
						<SidebarNav userAccount={props.userAccount}/>
					</PerfectScrollbar>
				</div>
				<div className="sidebar-bg"></div>
				<div className="sidebar-mobile-dismiss" onClick={()=>props.toggleMobileSidebar()}></div>
			</div>
		</React.Fragment>
	);
  };

  export default Sidebar;
