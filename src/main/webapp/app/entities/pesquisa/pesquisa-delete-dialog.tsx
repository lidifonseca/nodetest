import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import {getSortState, ICrudSearchAction, Translate} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { deleteEntity } from './pesquisa.reducer';
import {ITEMS_PER_PAGE} from "app/shared/util/pagination.constants";
import {IPesquisaState} from "app/entities/pesquisa/pesquisa";

export interface IPesquisaDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PesquisaDeleteDialog extends React.Component<IPesquisaDeleteDialogProps> {


  state: IPesquisaState = {
    sort: 'id',
    order: 'desc',
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
  };

  confirmDelete = event => {
    const {activePage, itemsPerPage, sort, order} = this.state;
    const listFilter = [activePage - 1, itemsPerPage, `${sort},${order}`];
    this.props.deleteEntity(this.props.match.params.id, listFilter);
    this.handleClose(event);
  };

  handleClose = event => {
    const {activePage, itemsPerPage, sort, order} = this.state;
    const listFilter = [activePage - 1, itemsPerPage, `${sort},${order}`];
    console.info(listFilter);
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { pesquisaEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="tjscrapperApp.pesquisa.delete.question">
          <Translate contentKey="tjscrapperApp.pesquisa.delete.question" interpolate={{ id: pesquisaEntity.id }}>
            Are you sure you want to delete this Pesquisa?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-pesquisa" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ pesquisa }: IRootState) => ({
  pesquisaEntity: pesquisa.entity
});

const mapDispatchToProps = { deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PesquisaDeleteDialog);
