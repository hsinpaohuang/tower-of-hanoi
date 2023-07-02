import { type HTMLAttributes, useMemo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { styled } from '@nextui-org/react';
import {
  type TowerPosition,
  useTowerOfHanoiStore,
} from '@/stores/towerOfHanoiStore';
import {
  DISK_WIDTH_RATIO,
  DISK_HEIGHT,
  Disk,
} from '@/components/towerOfHanoi/Disk';
import { TowerBackground } from '@/components/towerOfHanoi/TowerBackground';

const TowerWrapper = styled('div', { position: 'relative' });

const StyledTower = styled('div', {
  height: '300px',
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const Padding = styled('div', { paddingBottom: '20px' });

type Props = HTMLAttributes<HTMLDivElement> & { id: TowerPosition };

export function Tower({ id, ...divProps }: Props) {
  const { [id]: disks, draggingDisk } = useTowerOfHanoiStore();

  /** pretend `useMemo` is `computed` from vue,
   * so we can use it to encapsulate complex logic
   */
  const isDropDisabled = useMemo(() => {
    const topDisk = disks[0];

    if (draggingDisk === null || topDisk === undefined) return false;
    if (disks.indexOf(draggingDisk) !== -1) return true;

    return draggingDisk > topDisk;
  }, [draggingDisk, disks]);

  /** manually override `width` & `height` to allow `<Disk />`'s
   * `getBoundingClientRect` to get the correct dimension before React rerenders
   * with the correct dimension
   */
  const customPlaceholderStyle = {
    height: DISK_HEIGHT,
    width: draggingDisk ? `${draggingDisk * DISK_WIDTH_RATIO}%` : 0,
  };

  return (
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {provided => (
        <TowerWrapper
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...divProps}
          className={`${divProps.className} tower-wrapper`}
        >
          <StyledTower className="tower">
            <TowerBackground />
            <div className="custom-placeholder" style={customPlaceholderStyle}>
              {provided.placeholder}
            </div>
            {disks.map((disk, index) => (
              <Disk key={disk} disk={disk} index={index} parentId={id} />
            ))}
            <Padding />
          </StyledTower>
        </TowerWrapper>
      )}
    </Droppable>
  );
}
