import { Cv } from '../../../core/models/core.model';

export type AddCvProjectResult = {
  addCvProject: Cv
}

export type UpdateCvProjectResult = {
  updateCvProject: Cv
}

export type RemoveCvProjectResult = {
  removeCvProject: Cv
}

export type ExportPdfResult = {
  exportPdf: string
}
