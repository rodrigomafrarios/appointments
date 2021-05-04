import { ProfessionalSlot } from '@/domain/models/professional-slot'

export class SlotsPeriodsAdapter {
  async toPeriod (professionalSlots: ProfessionalSlot[]): Promise<ProfessionalSlot[]> {
    let periods: ProfessionalSlot[] = []
    
    for(const slot of professionalSlots) {
      let periodMidDate = new Date(slot.start)
      periodMidDate.setMinutes(periodMidDate.getMinutes() + 30)
      
      periods.push({
        id: slot.id,
        professionalId: slot.professionalId,
        start: slot.start,
        end: periodMidDate.toISOString(),
        isAvailable: slot.isAvailable
      })
  
      periods.push({
        id: slot.id,
        professionalId: slot.professionalId,
        start: periodMidDate.toISOString(),
        end: slot.end,
        isAvailable: slot.isAvailable
      })
    }
    return periods
  }
}
