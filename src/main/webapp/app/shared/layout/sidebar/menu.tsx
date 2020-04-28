
import {AUTHORITIES} from "app/config/constants";

const Menu = [
  {
    path: '/configuracoes', icon: 'fa fa-search', title: 'Pesquisar processos', role: [AUTHORITIES.ADMIN, AUTHORITIES.COLLECTOR]
  },
  {
    path: '/pesquisa', icon: 'fa fa-history', title: 'Histórico de pesquisas', role: []
  },
  {
    path: '/apenso', icon: 'fa fa-history', title: 'Apenso', role: []
  },
  {
    path: '/processo', icon: 'fa fa-balance-scale', title: 'Estados', role: [],
    children: [
      { path: '/processo/Todos', title: 'Todos' },
      { path: '/processo/SC', title: 'Santa Catarina' },
      { path: '/processo/SP', title: 'São Paulo' },
    ]
  },
  {
    path: '/admin', icon: 'fa fa-cogs', title: 'Configurações', role: [AUTHORITIES.ADMIN],
    children: [
      { path: '/admin/user-management', title: 'Gerenciar usuários' },
      { path: '/admin/metrics', title: 'Metricas do sistema' },
    ]
  },
];

export default Menu;
