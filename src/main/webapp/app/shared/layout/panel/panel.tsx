import React from 'react';

export interface IPainelProps { 
	className?: string;
	
}

class Panel extends React.Component<IPainelProps> {
	constructor(props) {
		super(props);

	}
	render() {
		return (
			<div className={'panel panel-inverse ' + (this.props.className ? this.props.className : '')}>
				{ this.props.children }
			</div>
		);
	}
};

class PanelHeader extends React.Component<IPainelProps> {
	render() {
		return (
			<div className="panel-heading">
				<h4 className="panel-title">{ this.props.children }</h4>
			</div>
		)
	}
}

class PanelBody extends React.Component<IPainelProps> {
	render() {
		return (
			<div className={"panel-body " + this.props.className}>
				{ this.props.children }				
			</div>
		);
	}
};

class PanelFooter extends React.Component<IPainelProps> {
	render() {
		return (
			<div className={"panel-footer "+ this.props.className}>
				{ this.props.children }
			</div>
		);
	}
};

export { Panel, PanelHeader, PanelBody, PanelFooter };
