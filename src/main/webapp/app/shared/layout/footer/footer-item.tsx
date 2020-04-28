import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IFooterItem {
  icon: IconProp;

}

export default class FooterItem extends React.Component<IFooterItem> {
  render() {
    const {  icon } = this.props;
    return (
      <div>
        <FontAwesomeIcon icon={icon} fixedWidth />
      </div>
    );
  }
}
