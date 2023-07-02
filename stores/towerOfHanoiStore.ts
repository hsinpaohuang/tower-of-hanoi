import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TowerPosition = 'left' | 'center' | 'right';

type TowerOfHanoiState = {
  diskCount: number;
  isDiskCountInvalid: boolean;
  setDiskCount: (val: number) => void;
  moves: number;
  resetMoves: () => void;
  left: number[];
  center: number[];
  right: number[];
  draggingDisk: number | null;
  setDraggingDisk: (id: number | null) => void;
  moveDisk: (from: TowerPosition, to: TowerPosition) => void;
  initializeDisks: () => void;
  resetGame: () => void;
};

export const MIN_DISKS = 3;
export const MAX_DISKS = 8;

export const useTowerOfHanoiStore = create<
  TowerOfHanoiState,
  [['zustand/devtools', never]]
>(
  devtools(
    set => ({
      diskCount: 3,
      isDiskCountInvalid: false,
      setDiskCount: newValue => {
        set(() => ({
          diskCount: newValue,
          isDiskCountInvalid: newValue > MAX_DISKS || newValue < MIN_DISKS,
        }));
      },
      moves: 0,
      resetMoves: () => {
        set(() => ({ moves: 0 }));
      },
      left: [1, 2, 3],
      center: [],
      right: [],
      draggingDisk: null,
      setDraggingDisk: id => {
        set(() => ({ draggingDisk: id }));
      },
      moveDisk: (from, to) => {
        set(state => {
          const [disk, ...rest] = state[from];
          return {
            [from]: rest,
            [to]: [disk, ...state[to]],
            moves: state.moves + 1,
          };
        });
      },
      initializeDisks: () => {
        set(state => ({
          left: state.isDiskCountInvalid
            ? []
            : Array.from({ length: state.diskCount }, (_, i) => i + 1),
          center: [],
          right: [],
        }));
      },
      resetGame: () => {
        set(state => {
          state.resetMoves();
          state.initializeDisks();
          return {};
        });
      },
    }),
    { name: 'towerOfHanoi' },
  ),
);

export const isFinished = (state: TowerOfHanoiState) =>
  !state.isDiskCountInvalid && state.right.length === state.diskCount;
