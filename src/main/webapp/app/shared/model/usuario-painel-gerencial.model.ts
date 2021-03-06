export interface IUsuarioPainelGerencial {
  id?: string;
  verCronicos?: boolean;
  verPacientesAtivosCr?: boolean;
  filtroPacientesAtivosCr?: boolean;
  verNumHospCr?: boolean;
  filtroNumHospCr?: boolean;
  verNumDesospCr?: boolean;
  filtroNumDesospCr?: boolean;
  verNumPsCr?: boolean;
  filtroNumPsCr?: boolean;
  verNumObitoCr?: boolean;
  filtroNumObitoCr?: boolean;
  verIndCliEstaveisCr?: boolean;
  filtroIndCliEstaveisCr?: boolean;
  verNumConsMedInternasCr?: boolean;
  filtroNumConsMedInternasCr?: boolean;
  verNumConsMedExternasCr?: boolean;
  filtroNumConsMedExternasCr?: boolean;
  verNumLaboratorialCr?: boolean;
  filtroNumLaboratorialCr?: boolean;
  verNumImagemCr?: boolean;
  filtroNumImagemCr?: boolean;
  verNumOutrosCr?: boolean;
  filtroNumOutrosCr?: boolean;
  verNumAtCatCr?: boolean;
  filtroNumAtCatCr?: boolean;
  verNumCatCompCr?: boolean;
  filtroNumCatCompCr?: boolean;
  verAtCmSucessoCr?: boolean;
  filtroAtCmSucessoCr?: boolean;
  verMediaPadAbertoCr?: boolean;
  filtroMediaPadAbertoCr?: boolean;
  verAtIntercorrenciaCr?: boolean;
  filtroAtIntercorrenciaCr?: boolean;
  verTempoMedioAtCr?: boolean;
  filtroTempoMedioAtCr?: boolean;
  verMediaPtaCr?: boolean;
  filtroMediaPtaCr?: boolean;
  verIndicadorUsoAppCr?: boolean;
  filtroIndicadorUsoAppCr?: boolean;
}

export const defaultValue: Readonly<IUsuarioPainelGerencial> = {
  verCronicos: false,
  verPacientesAtivosCr: false,
  filtroPacientesAtivosCr: false,
  verNumHospCr: false,
  filtroNumHospCr: false,
  verNumDesospCr: false,
  filtroNumDesospCr: false,
  verNumPsCr: false,
  filtroNumPsCr: false,
  verNumObitoCr: false,
  filtroNumObitoCr: false,
  verIndCliEstaveisCr: false,
  filtroIndCliEstaveisCr: false,
  verNumConsMedInternasCr: false,
  filtroNumConsMedInternasCr: false,
  verNumConsMedExternasCr: false,
  filtroNumConsMedExternasCr: false,
  verNumLaboratorialCr: false,
  filtroNumLaboratorialCr: false,
  verNumImagemCr: false,
  filtroNumImagemCr: false,
  verNumOutrosCr: false,
  filtroNumOutrosCr: false,
  verNumAtCatCr: false,
  filtroNumAtCatCr: false,
  verNumCatCompCr: false,
  filtroNumCatCompCr: false,
  verAtCmSucessoCr: false,
  filtroAtCmSucessoCr: false,
  verMediaPadAbertoCr: false,
  filtroMediaPadAbertoCr: false,
  verAtIntercorrenciaCr: false,
  filtroAtIntercorrenciaCr: false,
  verTempoMedioAtCr: false,
  filtroTempoMedioAtCr: false,
  verMediaPtaCr: false,
  filtroMediaPtaCr: false,
  verIndicadorUsoAppCr: false,
  filtroIndicadorUsoAppCr: false
};
