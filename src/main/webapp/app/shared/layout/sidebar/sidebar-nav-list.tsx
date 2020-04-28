/* eslint no-console: off */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';


export interface ISidebarNavListPropsData {
	icon?: string;
	img?: string;
	children?: Array<ISidebarNavListPropsData>;
	title?: string;
	label?: string;
	badge?: string;
	exact?: boolean;
	path?: string;
}
export interface ISidebarNavListProps {
	data: ISidebarNavListPropsData;
	key?: number;
	expand?: Function;
	active?: boolean;
	clicked?: number;
	show?: boolean;
}
export interface ISidebarNavListState {
	active: number;
	clicked: number
}


export interface ISidebarProps extends StateProps, DispatchProps, ISidebarNavListProps, RouteComponentProps<{ url: string }> {}

class SidebarNavList extends React.Component<ISidebarProps, ISidebarNavListState> {
	constructor(props) {
		super(props);
		this.state = {
			active: -1,
			clicked: -1
		};
	}

	handleExpand(e, i, match) {
		e.preventDefault();
		console.info([e,i,match]);

		this.setState(state => ({
			active: (this.state.active === i ? -1 : i),
			clicked: 1
		}));
	}

	handleSidebarOnMouseOver(e, menu) {
		e.preventDefault();
	}

	handleSidebarOnMouseOut(e, menu) {
		e.preventDefault();
	}

	handleActiveMenu(match) {
	  if (match && match.url === '/' && match.isExact === false) {
	    return false;
    }
		return match;
	}

	render() {
		const icon = this.props.data.icon && <i className={this.props.data.icon}></i>;
		const img = this.props.data.img && <div className="icon-img"><img src={this.props.data.img} alt="" /></div>;
		const caret = (this.props.data.children && !this.props.data.badge) && <b className="caret"></b>;
		const label = this.props.data.label && <span className="label label-theme m-l-5">{this.props.data.label}</span>;
		const badge = this.props.data.badge && <span className="badge pull-right">{this.props.data.badge}</span>;
		const title = this.props.data.title && <span>{this.props.data.title} {label}</span>;
		const pageSidebarMinified = this.props.pageSidebarMinified;
		if(this.props.show === false) return null;
		return (
			<Route path={this.props.data.path} exact={this.props.data.exact}>
				{({ match }) => (
					<li className={(this.handleActiveMenu(match) ? "active " : "") + ((this.props.active || (this.props.clicked === -1 && match)) ? 'expand ' : 'closed ')}>
            {this.props.data.children ? (
                <Link to={"javascript:void(0)"}
                    onMouseOver={(e) => this.handleSidebarOnMouseOver(e, this.props.data)}
                  onMouseOut={(e) => this.handleSidebarOnMouseOut(e, this.props.data)}
                  onClick={(e) => this.props.expand(e)}>{ caret } { img } { icon } { badge } { title }</Link>
              ) : (
                <Link to={this.props.data.path}>{ caret } { img } { icon } { badge } { title }</Link>
              )}
            {this.props.data.children && (
              <ul className={"sub-menu " + (((this.props.active || (this.props.clicked === -1 && match)) && !pageSidebarMinified) ? 'd-block ' : 'd-none')}>
                {this.props.data.children && this.props.data.children.map((submenu, i) => (
                  <SidebarNavList
                    {...this.props}
                    data={submenu}
                    key={i}
                    expand={(e) => this.handleExpand(e, i, match)}
                    active={i === this.state.active}
                    clicked={this.state.clicked}
                  />
                ))}
              </ul>
            )}
					</li>
				)}
			</Route>
		);
	}
}



const mapStateToProps = ({ sidebar }: IRootState) => ({
	pageSidebarMinified: sidebar.pageSidebarMinified,
	pageSidebarTransparent: sidebar.pageSidebarTransparent
  });

  const mapDispatchToProps = {};

  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;

  export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(SidebarNavList);

