import { Visit } from "@/services/visitService";

export const visits: Visit[] = [
  {
    id: "1",
    startTime: new Date(2023, 1, 20, 1, 0),
    endTime: new Date(2023, 1, 20, 2, 0),
    notes: "Lorem",
    outletName: "Blacon",
  },
  {
    id: "2",
    startTime: new Date(2023, 1, 20, 4, 0),
    endTime: new Date(2023, 1, 20, 5, 0),
    notes: "Lorem123",
    outletName: "Groceries4U",
  },
  {
    id: "3",
    startTime: new Date(2023, 1, 21, 2, 30),
    endTime: new Date(2023, 1, 21, 4, 30),
    notes: "Lorem123 ipsum",
    outletName: "Test",
  },
  {
    id: "4",
    startTime: new Date(2023, 1, 23, 3, 0),
    endTime: new Date(2023, 1, 23, 4, 30),
    notes: "Lorem12356",
    outletName: "Blacon123",
  },
];
