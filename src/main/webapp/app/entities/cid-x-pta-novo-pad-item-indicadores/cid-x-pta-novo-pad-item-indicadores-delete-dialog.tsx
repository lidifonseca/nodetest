import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICidXPtaNovoPadItemIndicadores } from 'app/shared/model/cid-x-pta-novo-pad-item-indicadores.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './cid-x-pta-novo-pad-item-indicadores.reducer';

export interface ICidXPtaNovoPadItemIndicadoresDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidXPtaNovoPadItemIndicadoresDeleteDialog extends React.Component<ICidXPtaNovoPadItemIndicadoresDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.cidXPtaNovoPadItemIndicadoresEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { cidXPtaNovoPadItemIndicadoresEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.cidXPtaNovoPadItemIndicadores.delete.question">
          <Translate
            contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.delete.question"
            interpolate={{ id: cidXPtaNovoPadItemIndicadoresEntity.id }}
          >
            Are you sure you want to delete this CidXPtaNovoPadItemIndicadores?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-cidXPtaNovoPadItemIndicadores" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ cidXPtaNovoPadItemIndicadores }: IRootState) => ({
  cidXPtaNovoPadItemIndicadoresEntity: cidXPtaNovoPadItemIndicadores.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoPadItemIndicadoresDeleteDialog);
