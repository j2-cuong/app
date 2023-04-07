import { useStore } from '@/store';
import { initTourData } from '@/constants/initdata';

export const useResetTourState = () => {
  const { tourStore } = useStore();
  const { setTourId, setTourData, setTourDestinations, setTourDetails } =
    tourStore;
  function setInitTourState() {
    setTourId('');
    setTourData(initTourData);
    setTourDetails([]);
    setTourDestinations([]);
  }

  return setInitTourState;
};
