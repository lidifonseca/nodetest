
import { AUTHORITIES } from 'app/config/constants';

const Menu = [
  { path: '/dashboard', icon: 'fa fa-dashboard fa-fw', title: 'Dashboard' , role: [AUTHORITIES.ADMIN] },
  { path: '/atendimento', icon: 'fa fa-home fa-fw', title: 'Painel de Controle' , role: [AUTHORITIES.ADMIN] },
  { path: '/profissional', icon: 'fa fa-user-md', title: 'Profissional' , role: [AUTHORITIES.ADMIN] },
  { path: '/paciente', icon: 'fa fa-users', title: 'Paciente' , role: [AUTHORITIES.ADMIN] },
  { path: '/pad', icon: 'fa fa-list', title: 'PADs' , role: [AUTHORITIES.ADMIN] },
  { path: '/diario', icon: 'fa fa-hospital-o', title: 'Diário de Enfermagem' , role: [AUTHORITIES.ADMIN] },
  { path: '/relatorio', icon: 'fa fa-edit', title: 'Relatórios' , role: [AUTHORITIES.ADMIN] },
  { path: '/push', icon: 'fa fa-table', title: 'Push' , role: [AUTHORITIES.ADMIN] },
  { path: '/log', icon: 'fa fa-calendar', title: 'Logs' , role: [AUTHORITIES.ADMIN] },
  { path: '/usuario', icon: 'fa fa-user', title: 'Usuários' , role: [AUTHORITIES.ADMIN] },
  { path: '/ver-todos-mapa', icon: 'fa fa-map-marker', title: 'Localização' , role: [AUTHORITIES.ADMIN] },
  { path: '/categoria', icon: 'fa fa-tags', title: 'Categorias' , role: [AUTHORITIES.ADMIN] },
  { path: '/especialidade', icon: 'fa fa-stethoscope', title: 'Especialidades' , role: [AUTHORITIES.ADMIN] },
  { path: '/especialidadesatividade', icon: 'fa fa-stethoscope', title: 'Especialidades X Atividades' , role: [AUTHORITIES.ADMIN] },
  { path: '/cid-pta', icon: 'fa fa-stethoscope', title: 'CID X PTA' , role: [AUTHORITIES.ADMIN] },
  { path: '/indicadores', icon: 'fa fa-list', title: 'Indicadores Clínicos' , role: [AUTHORITIES.ADMIN] },
  { path: '/alertas-indicadores', icon: 'fa fa-bell', title: 'Alertas' , role: [AUTHORITIES.ADMIN] },
  { path: '/alertas-resultados-esperados', icon: 'fa fa-bell', title: 'Alertas Res. Esp.' , role: [AUTHORITIES.ADMIN] },
  { path: '/operadora', icon: 'fa fa-medkit', title: 'Operadora' , role: [AUTHORITIES.ADMIN] },
  { path: '/unidade-easy', icon: 'fa fa-building-o', title: 'Unidade Easy Care' , role: [AUTHORITIES.ADMIN] },
  { path: '/termo', icon: 'fa1 fa-mobile', title: 'Termos de Uso (app)' , role: [AUTHORITIES.ADMIN] },
  { path: '/outro', icon: 'fa fa-users', title: 'Cadastro Outros' , role: [AUTHORITIES.ADMIN] },
  { path: '/cep', icon: 'fa fa-train', title: 'Cadastro de CEP' , role: [AUTHORITIES.ADMIN] },
  { path: '/account/settings', icon: 'fa fa-user', title: 'Meus Dados' , role: [AUTHORITIES.ADMIN] },
  { path: '/account/password', icon: 'fa fa-key', title: ' Alterar Senha' , role: [AUTHORITIES.ADMIN] },
  { path: '/chat', icon: 'fa fa-comments-o', title: ' Chat' , role: [AUTHORITIES.ADMIN] },
  {
    path: '/admin', icon: 'fa fa-cogs', title: 'Configurações', role: [AUTHORITIES.ADMIN],
    children: [
      { path: '/admin/user-management', title: 'Gerenciar usuários' },
      { path: '/admin/metrics', title: 'Metricas do sistema' },
    ]
  },
];

export default Menu;
