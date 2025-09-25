import { createContext, useContext, useState } from "react";

import type { Board, Column } from "../types";
type ModalConfig = 
  | { type: 'ADD_TASK', props: { column: Column } }
  | { type: 'ADD_COLUMN', props: { board: Board }}
  | { type: null }


interface ModalContextType {
  modal: ModalConfig;
  openModal: (modal: Exclude<ModalConfig, {type: null}>) => void,
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({children} : {children: React.ReactNode}) => {
  const [modal, setModal] = useState<ModalConfig>({type: null});

  const openModal = (modal: Exclude<ModalConfig, {type: null}>) => {
    setModal(modal);
  }

  const closeModal = () => {
    setModal({type: null});
  }

  const value = {
    openModal,
    closeModal,
    modal
  }

  return (
   <ModalContext.Provider value={value}>
    {children}
   </ModalContext.Provider>
  )
}

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}