import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavDropdown } from './menu-components';
import { locales, languages } from 'app/config/translation';

export const LocaleMenu = ({ currentLocale, onClick }) =>
currentLocale && languages && Object.keys(languages) && Object.keys(languages).length > 1 && (
    <NavDropdown icon="flag" name={currentLocale &&  languages[currentLocale] ? languages[currentLocale].name : undefined}>
      {locales.map(locale => (
        <DropdownItem key={locale} value={locale} onClick={onClick}>
          {locale && languages[locale] ? languages[locale].name : undefined}
        </DropdownItem>
      ))}
    </NavDropdown>
  );
