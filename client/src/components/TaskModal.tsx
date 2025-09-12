import { createContext, useContext, useState } from "react";
import type { Column } from "../types";


interface AddTaskModalContextType {
  setModalOpen: (column: Column) => void,
  setModalClose: () => void,
  column: Column | null,
  isOpen: boolean
};

export const AddTaskModalContext = createContext<AddTaskModalContextType | null>(null);

export const AddTaskModalProvider = ({children} : { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [column, setColumn] = useState<Column | null>(null);

  const openModal = (column: Column) => {
    setColumn(column);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    setColumn(null);
  }

  const value = {
    setModalOpen: (column: Column) => openModal(column),
    setModalClose: () => closeModal(),
    column,
    isOpen
  }


  return (
    <AddTaskModalContext.Provider value={value}>{children}</AddTaskModalContext.Provider>
  )
}

export function useAddTaskModal() {
  const ctx = useContext(AddTaskModalContext);
  if (!ctx) throw new Error("useAddTaskModal must be used inside AddTaskModalProvider");
  return ctx;
}
