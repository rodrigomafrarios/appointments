export type DeleteProfessionalSlotParams = {
  id: string
  professionalId: string
}

export interface DeleteProfessionalSlot {
  delete: (params: DeleteProfessionalSlotParams) => Promise<void>
}
