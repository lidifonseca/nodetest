import React from 'react';
import {Translate} from 'react-jhipster';
import {Row, Col, Alert} from 'reactstrap';
import {Link} from "react-router-dom";

class PageNotFound extends React.Component {
  render() {
    return (
      <div className="insufficient-authority">
        <div className="error">
          <div className="error-code m-b-10">404</div>
          <div className="error-content">
            <div className="error-message">
              <Translate contentKey="error.http.404">The page does not exist.</Translate>
            </div>
            <div className="error-desc m-b-30">
              <Translate contentKey="error.http.404">The page does not exist.</Translate>
            </div>
            <div>
              <Link to="/" className="btn btn-success p-l-20 p-r-20">
                <Translate contentKey="error.goHome">Exit</Translate>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
