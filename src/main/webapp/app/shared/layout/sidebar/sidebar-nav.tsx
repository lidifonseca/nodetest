import React from 'react';
import { Route } from 'react-router-dom';
import SidebarNavList from 'app/shared/layout/sidebar/sidebar-nav-list.tsx';
import menus from 'app/shared/layout/sidebar/menu.tsx';
import {hasAnyAuthority} from 'app/shared/auth/private-route';

export interface ISidebarNavState {
	active: number;
	clicked: number

}

export interface ISidebarNavProps {
  userAccount: any;
}

class SidebarNav extends React.Component<ISidebarNavProps, ISidebarNavState> {
	constructor(props) {
		super(props);
		this.state = {
			active: -1,
			clicked: -1
		};
	}

	handleExpand(e, i, match) {
		e.preventDefault();

		if (this.state.clicked === -1 && match) {
			this.setState(state => ({
				active: -1,
				clicked: 1
			}));
		} else {
			this.setState(state => ({
				active: (this.state.active === i ? -1 : i),
				clicked: 1
			}));
		}
	}

	render() {
		return (
			<ul className="nav">
				{/* <li className="nav-header">Navigation</li> */}
				{menus.map((menu, i) => (
					<Route path={menu.path} key={i}>
						{({ match }) => (
							<SidebarNavList
                show={hasAnyAuthority(this.props.userAccount.authorities, menu.role)}
								data={menu}
								key={i}
								expand={(e) => this.handleExpand(e, i, match)}
								active={i === this.state.active}
								clicked={this.state.clicked}
							/>
						)}
					</Route>
				))}
			</ul>
		);
	}
}

export default SidebarNav;
