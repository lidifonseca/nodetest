import React from 'react';
import { Link } from 'react-router-dom';


export interface ISidebarNavProfileState {
	profileActive: boolean;
}

export interface ISidebarNavProfileProps {
  userAccount: any;
}

class SidebarProfile extends React.Component<ISidebarNavProfileProps, ISidebarNavProfileState> {

	constructor(props) {
		super(props);
		this.state = {
			profileActive: false
		};
		this.handleProfileExpand = this.handleProfileExpand.bind(this);
	}

	handleProfileExpand(e) {
		e.preventDefault();
		this.setState(state => ({
			profileActive: !this.state.profileActive,
		}));
	}

	render() {
		const pageSidebarMinify = true;
		return (
			<ul className="nav">
				<li className={"nav-profile p-t-10 p-b-30" + (this.state.profileActive ? "expand " : "")}>
					<Link to="/" onClick={this.handleProfileExpand}>
						<div className="image">
							<img src="/content/images/jhipster_family_member_3_head-192.png" alt="" />
						</div>
						<div className="info">
							{/* <b className="caret pull-right"></b> */}
							Olá {this.props.userAccount.login}
							<small>{this.props.userAccount.firstName} {this.props.userAccount.lastName}</small>

						</div>
					</Link>
				</li>
				<li>
					<ul className={"nav nav-profile " + (this.state.profileActive && !pageSidebarMinify ? "d-block " : "")}>
						<li><Link to="/"><i className="fa fa-cog"></i> Settings</Link></li>
						<li><Link to="/"><i className="fa fa-pencil-alt"></i> Send Feedback</Link></li>
						<li><Link to="/"><i className="fa fa-question-circle"></i> Helps</Link></li>
					</ul>
				</li>
			</ul>
		)
	}
}

export default SidebarProfile;
