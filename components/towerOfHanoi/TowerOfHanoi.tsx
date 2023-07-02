import { Controls } from '@/components/towerOfHanoi/Controls';
import dynamic from 'next/dynamic';

const GameBoard = dynamic(
  () =>
    import('@/components/towerOfHanoi/GameBoard').then(
      component => component.GameBoard,
    ),
  { ssr: false },
);

export function TowerOfHanoi() {
  return (
    <div>
      <Controls />
      <GameBoard />
    </div>
  );
}
