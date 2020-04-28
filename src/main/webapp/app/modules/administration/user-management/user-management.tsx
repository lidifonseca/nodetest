import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Table, Row, Badge} from 'reactstrap';
import {Translate, TextFormat, JhiPagination, JhiItemCount, getSortState} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {APP_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {getUsers, updateUser} from './user-management.reducer';
import {IRootState} from 'app/shared/reducers';
import {Panel, PanelHeader, PanelBody, PanelFooter} from 'app/shared/layout/panel/panel.tsx';
import './user.scss';

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export const UserManagement = (props: IUserManagementProps) => {
  const [pagination, setPagination] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllUsers = () => props.getUsers(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);

  useEffect(() => {
    getAllUsers();
  }, []);

  const sortUsers = () => getAllUsers();

  useEffect(() => {
    sortUsers();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  const sort = p => () => {
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
    props.history.push(`${props.location.pathname}?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`);
  };

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage
    });

  const toggleActive = user => () =>
    props.updateUser({
      ...user,
      activated: !user.activated
    });

  const {users, account, match, totalItems} = props;
  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
        <li className="breadcrumb-item">Usuários</li>
      </ol>
      <h2 id="user-management-page-heading">
        Gerenciar usuários
      </h2>

      <Panel>
        <PanelHeader>
          <span>Usuários</span>
          <Link to={`${match.url}/new`} className="btn-sm btn btn-success float-right jh-create-entity">
            <FontAwesomeIcon icon="plus"/> Criar usuário
          </Link>
        </PanelHeader>
        <PanelBody>
          <Table responsive striped>
            <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                ID&nbsp;
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('login')}>
                <Translate contentKey="userManagement.login">Nome de usuário</Translate>
                &nbsp;
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('email')}>
                <Translate contentKey="userManagement.email">Email</Translate>&nbsp;
                <FontAwesomeIcon icon="sort"/>
              </th>
              {/* <th className="hand" onClick={sort('langKey')}> */}
              {/*  <Translate contentKey="userManagement.langKey">Lang Key</Translate> */}
              {/*  <FontAwesomeIcon icon="sort" /> */}
              {/* </th> */}
              <th>
                <Translate contentKey="userManagement.profiles">Profiles</Translate>
              </th>
              <th className="hand" onClick={sort('createdDate')}>
                <Translate contentKey="userManagement.createdDate">Created Date</Translate>&nbsp;
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('lastModifiedBy')}>
                <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>&nbsp;
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
                <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>&nbsp;
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th>Ativar/Desativar</th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {users.map((user, i) => (
              <tr id={user.login} key={`user-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${user.login}`} color="link" size="sm">
                    {user.id}
                  </Button>
                </td>
                <td>{user.login}</td>
                <td>{user.email}</td>
                {/* <td>{user.langKey}</td> */}
                <td>
                  {user.authorities
                    ? user.authorities.map((authority, j) => (
                      <div key={`user-auth-${i}-${j}`}>
                        <Badge color="dark">{authority}</Badge>
                      </div>
                    ))
                    : null}
                </td>
                <td>
                  <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid/>
                </td>
                <td>{user.lastModifiedBy}</td>
                <td>
                  <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid/>
                </td>
                <td className={"align-middle text-center"}>
                  <div className="switcher switcher-success">
                    <input type="checkbox"
                           name={"active_" + user.id}
                           id={"active_" + user.id}
                           defaultChecked={user.activated}
                           onClick={toggleActive(user)}/>
                    <label htmlFor={"active_" + user.id}/>
                  </div>
                </td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${user.login}`} color="success" size="sm">
                      <FontAwesomeIcon icon="eye"/>{' '}
                    </Button>
                    &nbsp;
                    <Button tag={Link} to={`${match.url}/${user.login}/edit`} color="warning" size="sm">
                      <FontAwesomeIcon icon="pencil-alt"/>{' '}
                    </Button>
                    &nbsp;
                    <Button
                      tag={Link}
                      to={`${match.url}/${user.login}/delete`}
                      color="danger"
                      size="sm"
                      disabled={account.login === user.login}
                    >
                      <FontAwesomeIcon icon="trash"/>{' '}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </PanelBody>
        <PanelFooter>
          <div className={users && users.length > 0 ? '' : 'd-none'}>
            <Row className="justify-content-center">
              <JhiItemCount
                page={pagination.activePage}
                total={totalItems}
                itemsPerPage={pagination.itemsPerPage}
                i18nEnabled/>
            </Row>
            <Row className="justify-content-center">
              <JhiPagination
                activePage={pagination.activePage}
                onSelect={handlePagination}
                maxButtons={5}
                itemsPerPage={pagination.itemsPerPage}
                totalItems={props.totalItems}
              />
            </Row>
          </div>
        </PanelFooter>
      </Panel>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account
});

const mapDispatchToProps = {getUsers, updateUser};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
