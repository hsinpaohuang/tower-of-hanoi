import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TowerOfHanoiState = {
  disks: number;
  isDisksInvalid: boolean;
  setDisks: (val: number) => void;
  moves: number;
};

export const MIN_DISKS = 3;
export const MAX_DISKS = 5;

export const useTowerOfHanoiStore = create<
  TowerOfHanoiState,
  [['zustand/devtools', never]]
>(
  devtools(
    set => ({
      disks: 3,
      isDisksInvalid: false,
      setDisks: newValue =>
        set(() => ({
          disks: newValue,
          isDisksInvalid: newValue > MAX_DISKS || newValue < MIN_DISKS,
        })),
      moves: 0,
    }),
    { name: 'towerOfHanoi' },
  ),
);
