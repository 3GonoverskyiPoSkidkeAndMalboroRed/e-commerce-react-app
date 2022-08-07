import classes from './ProductForm.module.css';
import useForm from '../../../hooks/useForm';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import Textarea from '../../UI/Textarea/Textarea';
import { Brand, Category } from '../../../types/common';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { createProduct, updateProduct } from '../../../store/ProductSlice';
import ProductFormSelect from './ProductFormSelect/ProductFormSelect';

const INIT_INPUT = {
  name: '',
  description: '',
  price: '',
  image: '',
  weight: '',
  brand: {
    id: '',
    name: '',
  },
  discount: '',
  category: {
    id: '',
    name: '',
  },
};

const VALIDATE_FIELDS = ['name', 'price', 'image', 'weight', 'brand', 'category'];

interface IProductFormProps {
  onClose: () => void;
  categories: Category[];
  brands: Brand[];
}

const ProductForm: React.FC<IProductFormProps> = ({ onClose, categories, brands }) => {
  const { input, setInput, handleChange, errors, submit, handleChangeSelect } = useForm(
    INIT_INPUT,
    VALIDATE_FIELDS,
    submitHandler
  );
  const dispatch = useDispatch<AppDispatch>();
  const productToBeEdited = useSelector((state: RootState) => state.product.selectedProduct);

  useEffect(() => {
    if (!productToBeEdited.id) return;

    setInput((prevState) => ({
      ...prevState,
      ...productToBeEdited,
    }));
  }, [productToBeEdited, setInput]);

  function submitHandler() {
    if (productToBeEdited.id) {
      const updatedProduct = {
        ...productToBeEdited,
        ...input,
      };

      dispatch(updateProduct(updatedProduct));
    } else {
      const newProduct = {
        category: input.category,
        description: input.description,
        discount: input.discount,
        image: input.image,
        name: input.name,
        price: input.price,
        weight: input.weight,
        brand: input.brand,
      };

      dispatch(createProduct(newProduct));
    }

    onClose();
  }

  return (
    <div className={classes.wrapper}>
      <Card fullWidth>
        <Form onSubmit={submit}>
          <>
            <Input
              label={'Название товара'}
              errorText={errors.name}
              name={'name'}
              type={'text'}
              value={input.name || ''}
              onChange={handleChange}
              required
              placeholder={'Укажите название категории'}
            />

            <Textarea
              label={'Описание'}
              errorText={errors.description}
              name={'description'}
              placeholder={'Заполните описание категории'}
              onChange={handleChange}
              value={input.description || ''}
            />

            <div className={classes.container}>
              <ProductFormSelect
                label={'Категория'}
                defaultOptionText={'Выберите категорию'}
                isDisabled={false}
                options={categories}
                required
                onSelect={handleChangeSelect}
                value={input.category.name || ''}
                errorText={errors.category}
                field={'category'}
              />

              <ProductFormSelect
                label={'Производитель'}
                defaultOptionText={'Выберите бренд'}
                isDisabled={false}
                options={brands}
                required
                onSelect={handleChangeSelect}
                value={input.brand.name || ''}
                errorText={errors.brand}
                field={'brand'}
              />
            </div>

            <Input
              label={'Изображение'}
              errorText={errors.image}
              name={'image'}
              type={'text'}
              value={input.image || ''}
              onChange={handleChange}
              required
              placeholder={'Укажите ссылку на изображение'}
            />

            <div className={classes.container}>
              <Input
                label={'Цена'}
                errorText={errors.price}
                name={'price'}
                type={'number'}
                value={input.price || ''}
                onChange={handleChange}
                required
                placeholder={'Укажите цену товара'}
              />

              <Input
                label={'Скидка в %'}
                errorText={errors.discount}
                name={'discount'}
                type={'number'}
                value={input.discount || ''}
                onChange={handleChange}
                placeholder={'Размер скидки'}
              />
            </div>

            <Input
              label={'Вес, кг'}
              errorText={errors.weight}
              name={'weight'}
              type={'number'}
              value={input.weight || ''}
              onChange={handleChange}
              required
              placeholder={'Укажите вес товара в килограммах'}
            />

            <div className={classes.action}>
              <Button mode={'secondary'} onClick={onClose}>
                Отмена
              </Button>
              <Button mode={'primary'} type={'submit'}>
                Сохранить
              </Button>
            </div>
          </>
        </Form>
      </Card>
    </div>
  );
};

export default ProductForm;
