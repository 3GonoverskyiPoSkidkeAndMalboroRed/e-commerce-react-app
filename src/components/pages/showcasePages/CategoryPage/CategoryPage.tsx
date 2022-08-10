import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ProductCardList from '../../../showcase/ProductCardList/ProductCardList';
import { Category } from '../../../../types/common';
import Loader from '../../../UI/Loader/Loader';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import { NO_PRODUCTS_MESSAGE } from '../../../../constants/messages';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionHeader from '../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';

const CategoryPage: React.FC = () => {
  const location = useLocation();

  const { id, name, description } = location.state as Category;
  const { products, isLoading } = useSelector((state: RootState) => state.product);
  const categoryProducts = products.filter((product) => product.category.id === id);
  const hasProducts = !isLoading && categoryProducts.length > 0;
  const noProducts = !isLoading && categoryProducts.length === 0;

  return (
    <Section>
      <>
        <SectionHeader title={name} description={description} />

        <SectionBody>
          <>
            {isLoading && <Loader />}

            {hasProducts && <ProductCardList products={categoryProducts} />}
            {noProducts && <Placeholder text={NO_PRODUCTS_MESSAGE} size={'38px'} />}
          </>
        </SectionBody>
      </>
    </Section>
  );
};

export default CategoryPage;
