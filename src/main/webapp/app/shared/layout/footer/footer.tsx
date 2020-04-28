import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'reactstrap';


const Footer = props => (
  <div className="footer page-content">
        <nav className="bg-primary navbar navbar-expand-md navbar-dark bottom">
          <Col md="1"></Col>
          <Col md="3">
            <h5 className="texto-footer">
              Endereço
            </h5>
            <p className="texto-footer">
              R. 7 de Setembro, 1760 - Conj. 502 <br/>
              Blumenau - Santa Catarina - 89010-204
            </p>
          </Col>
          <Col md="3">
            <h5 className="texto-footer">
              Telefones para contato
            </h5>
            <p className="texto-footer">
              0800 878 1169
              <br/>
              47 3305-9808
            </p>
          </Col>
          <Col md="4" className="copyright ">
            <div>
              ©2019  Confiança Prime Assessoria Ltda.
            </div>
            <FontAwesomeIcon icon={['fab', 'facebook']} />
            &nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={['fab', 'twitter']} />
            &nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
            <div>
            </div>
          </Col>
          <Col md="1"></Col>
        </nav>
  </div>
);

export default Footer;
