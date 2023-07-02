import { useCallback } from 'react';
import { Card, styled } from '@nextui-org/react';
import {
  DragDropContext,
  type OnDragStartResponder,
  type OnDragEndResponder,
} from 'react-beautiful-dnd';
import {
  type TowerPosition,
  useTowerOfHanoiStore,
} from '@/stores/towerOfHanoiStore';
import { Tower } from '@/components/towerOfHanoi/Tower';
import { FinishedModalHandler } from '@/components/towerOfHanoi/FinishedModalHandler';

const StyledCard = styled(Card, { position: 'static', transform: 'none' });

const StyledCardBody = styled(Card.Body, {
  position: 'static',
  transform: 'none',
});

const Board = styled('div', { display: 'flex', flexWrap: 'wrap', gap: '$10' });

const StyledTower = styled(Tower, { flex: 1 });

/** Gameboard will rerender quite often due to it being wrapped in `dynamic`,
 * so functions inside should be wrapped in `useCallback`
 */
export function GameBoard() {
  const { setDraggingDisk, moveDisk } = useTowerOfHanoiStore();

  const setDraggingDiskInfo = useCallback<OnDragStartResponder>(
    ({ draggableId }) => {
      setDraggingDisk(Number(draggableId));
    },
    [setDraggingDisk],
  );

  const moveDiskToTower = useCallback<OnDragEndResponder>(
    result => {
      setDraggingDisk(null);

      if (result.destination?.droppableId) {
        moveDisk(
          result.source.droppableId as TowerPosition,
          result.destination.droppableId as TowerPosition,
        );
      }
    },
    [setDraggingDisk, moveDisk],
  );

  return (
    <>
      <StyledCard variant="bordered">
        <StyledCardBody>
          <Board className="board">
            <DragDropContext
              onDragStart={setDraggingDiskInfo}
              onDragEnd={moveDiskToTower}
            >
              <StyledTower id="left" />
              <StyledTower id="center" />
              <StyledTower id="right" />
            </DragDropContext>
          </Board>
        </StyledCardBody>
      </StyledCard>
      <FinishedModalHandler />
    </>
  );
}
