import type { CSSProperties } from 'react';
import { styled } from '@nextui-org/react';
import {
  Draggable,
  DraggableStateSnapshot,
  type DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';
import {
  MAX_DISKS,
  TowerPosition,
  useTowerOfHanoiStore,
} from '@/stores/towerOfHanoiStore';

const DISK_SIZE_COLOR_MAP: Record<string, string> = {
  1: '#F72585',
  2: '#B5179E',
  3: '#7209B7',
  4: '#560BAD',
  5: '#480CA8',
  6: '#3A0CA3',
  7: '#3F37C9',
  8: '#4361EE',
};

const StyledDisk = styled('div', {
  textAlign: 'center',
  height: '30px',
  borderRadius: '12px',
  border: '2px solid black',
  lineHeight: '$12',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const DISK_HEIGHT = '10%';

/** percent */
export const DISK_WIDTH_RATIO = 10;

const getAnimatingStyles = (
  snapshot: DraggableStateSnapshot,
  parentId: string,
) => {
  if (!snapshot.isDropAnimating) return;
  const droppableId = snapshot.draggingOver || parentId;
  const placeholder = document.querySelector(
    `[data-rbd-droppable-id="${droppableId}"] .custom-placeholder`,
  );
  if (!placeholder) return;

  const { curve, duration } = snapshot.dropAnimation || {};
  const { left, top } = placeholder.getBoundingClientRect();

  return {
    left,
    top,
    /** -10% on x to alleviate flickering */
    transform: 'translate(-10%, 0px)',
    transition: `all ${duration}s ${curve}`,
  };
};

type Props = {
  disk: number;
  index: number;
  parentId: TowerPosition;
};

export function Disk({ disk, index, parentId }: Props) {
  const { draggingDisk } = useTowerOfHanoiStore();

  /** only the top disk can be dragged */
  const isDragDisabled = !!index;
  const isDragging = disk === draggingDisk;

  const getStyle = (
    providedStyles: DraggableProvidedDraggableProps['style'],
    snapshot: DraggableStateSnapshot,
  ): CSSProperties => ({
    width: `calc(100% * ${disk / MAX_DISKS})`,
    height: DISK_HEIGHT,
    backgroundColor: DISK_SIZE_COLOR_MAP[String(disk)],
    zIndex: 1,
    userSelect: 'none',
    ...providedStyles,
    ...getAnimatingStyles(snapshot, parentId),
    ...(!isDragging && { transform: 'none', transition: 'none' }),
  });

  return (
    <Draggable
      draggableId={String(disk)}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <StyledDisk
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          style={getStyle(provided.draggableProps.style, snapshot)}
        />
      )}
    </Draggable>
  );
}
