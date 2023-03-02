import { visits } from "@/assets/visitData";

export interface Visit {
  id: string;
  startTime: Date;
  endTime: Date;
  notes?: string;
  outletName: string;
}

interface Database<T> {
  entries: T[];
}

export class VisitService {
  private _db: Database<Visit>;

  constructor() {
    this._db = {
      entries: [...visits],
    };
  }

  private validateVisit(visit: Visit): void {
    if (visit.startTime.getDay() !== visit.endTime.getDay()) {
      throw new Error("Visits have to be on the same day");
    }

    if (visit.startTime.getMonth() !== visit.endTime.getMonth()) {
      throw new Error("Visits have to be in the same month");
    }

    if (visit.startTime.getFullYear() !== visit.endTime.getFullYear()) {
      throw new Error("Visits have to be in the same year");
    }
  }

  getAllVisits(): Visit[] {
    // return a shallow copy to ensure vue knows to trigger reactive updates
    return [...this._db.entries];
  }

  getVisitById(id: string): Visit | undefined {
    return this._db.entries.find((visit) => visit.id === id);
  }

  saveVisit(visit: Visit): void {
    const visitIndex = this._db.entries.findIndex(({ id }) => visit.id === id);

    if (visitIndex === -1) {
      throw new Error(`Visit with id ${visit.id} not found`);
    }

    this.validateVisit(visit);

    this._db.entries[visitIndex] = visit;
  }

  deleteVisit(id: string): void {
    const visitIndex = this._db.entries.findIndex((visit) => visit.id === id);

    if (visitIndex === -1) {
      throw new Error(`Visit with id ${id} not found`);
    }

    this._db.entries.splice(visitIndex);
  }

  createVisit(visit: Visit): void {
    const visitIndex = this._db.entries.findIndex(({ id }) => visit.id === id);

    if (visitIndex !== -1) {
      throw new Error(`Visit with id ${visit.id} already exists`);
    }

    this.validateVisit(visit);

    this._db.entries.push(visit);
  }
}
