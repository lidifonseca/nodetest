
import {AUTHORITIES} from "app/config/constants";

const Menu = [
  { path: '/paciente', icon: 'fa fa-cogs', title: 'Paciente', role: [AUTHORITIES.ADMIN] },
  {
    path: '/admin', icon: 'fa fa-cogs', title: 'Configurações', role: [AUTHORITIES.ADMIN],
    children: [
      { path: '/admin/user-management', title: 'Gerenciar usuários' },
      { path: '/admin/metrics', title: 'Metricas do sistema' },
    ]
  },
];

export default Menu;
