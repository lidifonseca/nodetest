import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IFranquiaAreaAtuacao } from 'app/shared/model/franquia-area-atuacao.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './franquia-area-atuacao.reducer';

export interface IFranquiaAreaAtuacaoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FranquiaAreaAtuacaoDeleteDialog extends React.Component<IFranquiaAreaAtuacaoDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.franquiaAreaAtuacaoEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { franquiaAreaAtuacaoEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.franquiaAreaAtuacao.delete.question">
          <Translate contentKey="generadorApp.franquiaAreaAtuacao.delete.question" interpolate={{ id: franquiaAreaAtuacaoEntity.id }}>
            Are you sure you want to delete this FranquiaAreaAtuacao?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-franquiaAreaAtuacao" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ franquiaAreaAtuacao }: IRootState) => ({
  franquiaAreaAtuacaoEntity: franquiaAreaAtuacao.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaAreaAtuacaoDeleteDialog);
