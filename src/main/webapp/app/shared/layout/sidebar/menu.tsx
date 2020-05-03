
import {AUTHORITIES} from "app/config/constants";

const Menu = [
  {
    path: '/', icon: 'fa fa-cogs', title: 'Cadastros', role: [AUTHORITIES.ADMIN],
    children: [
      { path: '/paciente', title: 'Pacientes', role: [AUTHORITIES.ADMIN]  },
      { path: '/operadora', title: 'Operadoras' },
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
