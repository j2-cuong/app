import TourCategoryTable from '@/features/tours/components/TourCategoryTable';
import { TourCategoryPageWrap } from './TourCategoryPageStyled';

const TourCategoryPage = () => {
  return (
    <div>
      <TourCategoryPageWrap>
        <TourCategoryTable />
      </TourCategoryPageWrap>
    </div>
  );
};

export default TourCategoryPage;
