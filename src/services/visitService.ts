import { visits } from "@/assets/visitData";

export interface Visit {
  id: string;

  // TODO: use Dates / js-joda conversions
  startTime: string;
  endTime: string;
  date: string;
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

  getAllVisits(): Visit[] {
    return this._db.entries;
  }

  getVisitById(id: string): Visit | undefined {
    return this._db.entries.find((visit) => visit.id === id);
  }

  saveVisit(visit: Visit): void {
    const visitIndex = this._db.entries.findIndex(({ id }) => visit.id === id);

    if (visitIndex === -1) {
      throw new Error(`Visit with id ${visit.id} not found`);
    }

    this._db.entries[visitIndex] = visit;
  }

  deleteVisit(id: string): void {
    const visitIndex = this._db.entries.findIndex((visit) => visit.id === id);

    if (visitIndex === -1) {
      throw new Error(`Visit with id ${id} not found`);
    }

    this._db.entries.splice(visitIndex);
  }
}
