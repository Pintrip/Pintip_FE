import { create } from "zustand"

const ticketStore = create((set) => ({
    tickets: [],
    insertTicket: (newTicket) => set((state) => ({
        tickets: [...state.tickets, newTicket],
    })),
}))

export default ticketStore