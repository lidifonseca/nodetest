import React from 'react';
import {Button, Col, Row, Label, Input} from 'reactstrap';
import ReactTagInput from '@pathofdev/react-tag-input'
import {AvForm, AvField, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {connect} from 'react-redux';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import {getConfiguracoesState, IConfiguracoesBaseState} from './configuracoes-utils';
import CSVReader from 'react-csv-reader'
import {enviarDados, limparResposta, prencherComarcas, prencherEstados} from 'app/shared/reducers/configuracoes.ts';

import {Panel, PanelHeader, PanelBody} from 'app/shared/layout/panel/panel.tsx';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, RouteComponentProps} from "react-router-dom";

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}


export class Configuracoes extends React.Component<IHomeProp, IConfiguracoesBaseState> {

  private classesIncluir = [];
  private incluirMovimentacoes = [];
  private descartarMovimentacoes = [];
  private dataFileLoaded = [];

  constructor(props) {
    super(props);

    this.state = {
      ...getConfiguracoesState(this.props.location)
    };
    this.selectEstadoChange = this.selectEstadoChange.bind(this);
    this.onTagsMotivosIn = this.onTagsMotivosIn.bind(this);
    this.onTagsMotivosOut = this.onTagsMotivosOut.bind(this);
    this.onTagsChangedClasse = this.onTagsChangedClasse.bind(this);

    this.state.classe.map((value) => (
      this.classesIncluir.push(value['displayValue'])
    ));
    this.state.selecionarProcessosCom.map((value) => (
      this.incluirMovimentacoes.push(value['displayValue'])
    ));
    this.state.descartarProcessosCom.map((value) => (
      this.descartarMovimentacoes.push(value['displayValue'])
    ));
    this.incluirMovimentacoes = this.state.selecionarProcessosCom;
    this.descartarMovimentacoes = this.state.descartarProcessosCom;
    this.classesIncluir = this.state.classe;
  }

  componentDidMount() {
    this.props.prencherEstados(this.state.estado);
  }

  handleSubmit = (event, errors, fields) => {
    if (fields['nome'] === '' || this.dataFileLoaded.length === 0 || this.state.comarca === '' || this.state.estado === '') {
      return;
    }

    for (let i = this.incluirMovimentacoes.length - 1; i >= 0; i--) {
      if (this.incluirMovimentacoes[i].length == 0) {
        this.incluirMovimentacoes.splice(i, 1);
      }
    }

    fields['estadoId'] = this.state.estado;
    fields['comarcaTjId'] = this.state.comarca;
    fields['classesIncluir'] = this.classesIncluir;
    fields['incluirMovimentacoes'] = this.incluirMovimentacoes;
    fields['descartarMovimentacoes'] = this.descartarMovimentacoes;
    fields['processos'] = this.dataFileLoaded;
    fields['anoInicial'] = fields['anoInicial'] !== '' ? fields['anoInicial'] : null;
    fields['anoFinal'] = fields['anoFinal'] !== '' ? fields['anoFinal'] : null;
    this.props.enviarDados(fields);
  };

  onTagsChangedClasse = (tags) => {

    this.classesIncluir = tags;
    this.setState({classe: tags})
  };
  onTagsMotivosIn = (i, tags) => {
    let selecionarProcessos = this.state.selecionarProcessosCom;
    if (i >= 0) {
      selecionarProcessos[i] = tags;
    } else {
      selecionarProcessos.push(tags);
    }
    this.incluirMovimentacoes = selecionarProcessos;
    this.setState({selecionarProcessosCom: selecionarProcessos});
  };
  onRemoveTagsMotivosIn = (i) => {
    let selecionarProcessos = this.state.selecionarProcessosCom;
    selecionarProcessos.splice(i, 1);
    this.incluirMovimentacoes = selecionarProcessos;
    this.setState({selecionarProcessosCom: selecionarProcessos});
  };
  onAddTagsMotivosIn = () => {
    let selecionarProcessos = this.state.selecionarProcessosCom;
    if (selecionarProcessos.length > 0 && selecionarProcessos[selecionarProcessos.length - 1].length > 0) {
      selecionarProcessos.push([]);
      this.incluirMovimentacoes = selecionarProcessos;
      this.setState({selecionarProcessosCom: selecionarProcessos});
    }
  };
  onTagsMotivosOut = (tags) => {
    this.descartarMovimentacoes = tags;
    this.setState({descartarProcessosCom: tags})
  };
  handleFileLoaded = (data) => {
    this.dataFileLoaded = data
  };

  onKeyPressForm = (event) => {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  };
  selectEstadoChange = (value) => {
    this.props.prencherComarcas(value.value);
    this.setState({estado: value.value});
    this.setState({comarca: "-1"});

  };
  selectComarcaChange = (value) => {
    this.setState({comarca: value.value});

  };

  utilizeFocus = () => {
    const ref = React.createRef();
    const setFocus = () => {
      ref.current
    };

    return {setFocus, ref}
  };

  render() {

    let selectedEstado = null;
    for (const i in this.props.listaEstados) {
      if (parseInt(this.state.estado, 10) === this.props.listaEstados[i].value) {
        selectedEstado = this.props.listaEstados[i];
      }
    }

    let selectedComarca = null;
    if (selectedEstado) {
      selectedComarca = {value: -1, label: 'Todas'};
    }
    for (const i in this.props.listaComarcas) {
      if (parseInt(this.state.comarca, 10) === this.props.listaComarcas[i].value) {
        selectedComarca = this.props.listaComarcas[i];
      }
    }

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item">Pesquisar processos</li>
        </ol>
        <h1 className="page-header">Realizar coleta de processos
          <small></small>
        </h1>
        <Panel>
          <PanelHeader>&nbsp;Pesquisar processos</PanelHeader>
          <PanelBody>
            <AvForm onSubmit={this.handleSubmit} onKeyPress={this.onKeyPressForm} className="form-horizontal">
              <Row>
                <Col md="4">
                  <AvGroup>
                    <Label for="nome">Nome da pesquisa</Label>
                    <AvField type="text" name="nome" default={this.state.nome} autoFocus
                             validate={{
                               required: {
                                 value: true,
                                 errorMessage: ('O nome é obrigatório.')
                               }
                             }}/>
                  </AvGroup>
                  <div className="form-group comarca-form">
                    <Label for="comarcaTjId">Estado</Label>
                    <Select
                      id={"estadoTjId"}
                      name={"estadoTjId"}
                      value={selectedEstado}
                      options={this.props.listaEstados}
                      placeholder="Selecione um estado"
                      onChange={this.selectEstadoChange}
                      required={true}/>
                  </div>
                  <div className="form-group comarca-form">
                    <Label for="comarcaTjId">Comarca</Label>
                    <Select
                      id={"comarcaTjId"}
                      name={"comarcaTjId"}
                      value={selectedComarca}
                      options={this.props.listaComarcas}
                      placeholder="Selecione uma comarca"
                      onChange={this.selectComarcaChange}
                      required={true}/>
                    {selectedEstado && selectedEstado.sigla === "SP" && selectedComarca && selectedComarca.value === -1?
                      <div className="col-xs-12 checkbox checkbox-css">
                        <AvGroup>
                          <AvInput type="checkbox" name="comarcaPorComarca" checked={this.state.comarcaPorComarca}
                                   value={this.state.comarcaPorComarca}/>
                          <Label className="form-check-label" for="comarcaPorComarca">
                            Pesquisar comarca por comarca
                          </Label>
                        </AvGroup>
                      </div>
                      :
                      <div hidden className="col-xs-12 checkbox checkbox-css">
                        <AvGroup>
                          <AvInput type="checkbox" name="comarcaPorComarca" value={false} checked={false}/>
                          <Label className="form-check-label" for="comarcaPorComarca">
                            Pesquisar
                          </Label>
                        </AvGroup>
                      </div>
                    }
                  </div>
                  <AvGroup>
                    <Label>Credenciais
                      <small className="font-weight-bold text-danger">
                        &nbsp;(não serão salvas no servidor)
                      </small>
                    </Label>
                    <div className="row row-space-10">
                      <div className="col-lg-6 midle-input-form">
                        <AvField type="cnpj" name="usernamePesquisa" id="username"
                                 placeholder="CPF/CNPJ"
                                 helpMessage="CPF/CNPJ usado para logar no TJ"
                                 maskChar="_"
                                 mask="99.999.999/9999-99"
                                 tag={[Input]}
                                 validate={{
                                   required: {
                                     value: true,
                                     errorMessage: ('O usuário é obrigatório.')
                                   }
                                 }}
                        />
                      </div>
                      <div className="col-lg-6 midle-input-form">
                        <AvField type="password" name="password" id="password" placeholder="Senha"
                                 helpMessage="Senha usada para logar no TJ"
                                 validate={{
                                   required: {
                                     value: true,
                                     errorMessage: ('A senha é obrigatória.')
                                   }
                                 }}/>
                      </div>
                    </div>
                  </AvGroup>
                </Col>
                <Col md="4">
                  <div className={"form-group"}>
                    <Label for="seleccionarcom">Classe </Label>
                    <ReactTagInput
                      placeholder="Escreva e pressione Enter"
                      tags={this.state.classe}
                      onChange={this.onTagsChangedClasse}
                    />
                  </div>
                  <AvGroup>
                    <div className="row row-space-10">
                      <div className="col-lg-6 midle-input-form">
                        <Label for="intervalo">Ano Inicial</Label>
                        <AvField type="text" name="anoInicial" placeholder="Ex: 2010"
                                 defaultValue={this.state.anoInicial}
                                 mask="9999" maskChar="_" tag={[Input, InputMask]}
                        />
                      </div>
                      <div className="col-lg-6 midle-input-form">
                        <Label for="intervalo">Ano Final</Label>
                        <AvField type="text" name="anoFinal" placeholder="Ex: 2019" defaultValue={this.state.anoFinal}
                                 mask="9999" maskChar="_" tag={[Input, InputMask]}
                        />
                      </div>
                    </div>
                    <AvGroup>
                      <Label for="Observações">Observações</Label>
                      <AvField type="textarea" name="observacoes" id="observacoes"
                               defaultValue={this.state.observacoes}/>
                    </AvGroup>

                    <div className={"form-group"}>
                      <Label for="arquivocsv">CSV</Label>
                      <div>

                        <CSVReader key
                                   parserOptions={{
                                     header: false,
                                     skipEmptyLines: true,
                                     delimiter: ";"
                                   }}
                                   name="processos"
                                   onFileLoaded={this.handleFileLoaded}
                        />
                      </div>
                    </div>
                  </AvGroup>

                </Col>

                <Col md="4" style={{maxWidth: "90%"}}>
                  <div className={"form-group"}>
                    <Label for="seleccionarcom">Descartar processos com</Label>
                    <ReactTagInput

                      placeholder="Escreva e pressione Enter"
                      tags={this.state.descartarProcessosCom}
                      onChange={this.onTagsMotivosOut}
                    />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6 col-xs-12">
                        <Label for="seleccionarcom">Selecionar processos com</Label>
                      </div>
                      {this.state.selecionarProcessosCom && this.state.selecionarProcessosCom.length > 1 ?
                        <div hidden className="col-md-6 col-xs-12 checkbox checkbox-css p-t-0">
                          <AvGroup>
                            <AvInput type="checkbox" name="incluirMovimentacoesAll" value={true}/>
                            <Label className="form-check-label" for="incluirMovimentacoesAll">
                              Pesquisar por todas
                            </Label>
                          </AvGroup>
                        </div>
                        :
                        <div className="col-md-6 col-xs-12 checkbox checkbox-css p-t-0">
                          <AvGroup>
                            <AvInput type="checkbox" name="incluirMovimentacoesAll"
                                     value={this.state.incluirMovimentacoesAll}/>
                            <Label className="form-check-label" for="incluirMovimentacoesAll">
                              Pesquisar por todas
                            </Label>
                          </AvGroup>
                        </div>
                      }

                    </div>
                    {this.state.selecionarProcessosCom && this.state.selecionarProcessosCom.length > 0 ? (
                        this.state.selecionarProcessosCom.map((movimentacoes, i) => (
                          <div className="row m-b-5 align-items-center" key={i}>
                            <div className="col-md-10">
                              <ReactTagInput
                                placeholder="Escreva e pressione Enter"
                                tags={movimentacoes}
                                onChange={(val) => this.onTagsMotivosIn(i, val)}
                              />
                            </div>
                            {this.state.selecionarProcessosCom.length > 1 ?
                              <div className="col-md-2">
                                <div className={"btn btn-xs btn-danger hand"}
                                     onClick={() => this.onRemoveTagsMotivosIn(i)}>
                                  <span className="d-sm-block">
                                    <i className="fa fa-minus" aria-hidden={"true"}></i>
                                  </span>
                                </div>
                              </div>
                              : ("")}

                          </div>
                        ))) :
                      <div className="row m-b-5">
                        <div className="col-md-10">
                          <ReactTagInput
                            placeholder="Escreva e pressione Enter"
                            tags={this.state.selecionarProcessosCom}
                            onChange={(val) => this.onTagsMotivosIn(-1, val)}
                          />
                        </div>
                      </div>
                    }
                    <div className={"btn btn-sm btn-success hand mt-2"} onClick={() => this.onAddTagsMotivosIn()}>
                        <span className="d-sm-block">
                           <i className="fa fa-plus" aria-hidden={"true"}></i>
                          &nbsp; Adicionar grupo
                        </span>
                    </div>
                  </div>
                  {/* https://betterstack.dev/projects/react-tag-input/ */}

                </Col>
              </Row>
              <Row className={"mt-4 mb-2"} style={{maxWidth: "95%"}}>
                <Col lg="12">
                  <Button className={"col-lg-2 offset-lg-5"} color="success" disabled={this.props.coletando}>
                    <FontAwesomeIcon icon={this.props.coletando === true ? "spinner" : "search"}
                                     pulse={this.props.coletando}/>
                    &nbsp;Pesquisar
                  </Button>
                </Col>
              </Row>
            </AvForm>
          </PanelBody>
        </Panel>
      </div>

    );
  }
}

const mapStateToProps = (storeState) => ({
  coletando: storeState.configuracoes.coletando,
  listaComarcas: storeState.configuracoes.listaComarcas,
  listaEstados: storeState.configuracoes.listaEstados,
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});


const mapDispatchToProps = {enviarDados, limparResposta, prencherComarcas, prencherEstados};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configuracoes);
