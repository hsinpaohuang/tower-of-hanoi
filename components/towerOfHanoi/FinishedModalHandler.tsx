import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTowerOfHanoiStore, isFinished } from '@/stores/towerOfHanoiStore';

/** Extra wrapper to lazy load modal while still keeping the open & close animation */
export function FinishedModalHandler() {
  const isGameFinished = useTowerOfHanoiStore(isFinished);
  const [isLoaded, setIsLoaded] = useState(false);

  const Modal = useMemo(
    () =>
      dynamic(
        () =>
          import('@/components/towerOfHanoi/FinishedModal').then(component => {
            setIsLoaded(true);
            return component.FinishedModal;
          }),
        { ssr: false },
      ),
    [],
  );

  return isLoaded || isGameFinished ? <Modal /> : null;
}
