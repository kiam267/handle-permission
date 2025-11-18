import { create } from 'zustand';

type AertDialog = {
  state: boolean;
  onAlertDialogOpen: () => void;
  onAlertDialogClose: () => void;
};

export const useAlertDialog = create<AertDialog>(set => ({
  state: false,
  onAlertDialogOpen: () =>
    set({
      state: true,
    }),
  onAlertDialogClose: () =>
    set({
      state: false,
    }),
}));
