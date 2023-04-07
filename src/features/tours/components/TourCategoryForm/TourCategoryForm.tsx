import { useEffect, useState } from 'react';
import { ITourCategory, ITourCategoryNullable } from '@/types/tourcategory.type';
import { ENDPOINT } from '@/config';
import { SuccessResponse } from '@/types/http.type';
import { post } from '@/services/http';
import { Form, Typography, Input, Button, message } from 'antd';
const { Title } = Typography;

type TDataTypeCallback = ITourCategoryNullable & {
  callback: (param: boolean, payload: ITourCategoryNullable) => void;
};

const TourCategoryForm: React.FC<TDataTypeCallback> = props => {
  const [loading, setLoading] = useState<boolean>();
  const [form] = Form.useForm<ITourCategoryNullable>();
  const { categoryId, categoryName, categoryCode, callback } = props;


  useEffect(() => {
    if (!categoryId || !categoryCode || !categoryName) {
      return;
    }
    form.setFieldsValue({
      categoryCode,
      categoryName: categoryName,
    });
  }, [categoryId, categoryCode, categoryName]);

  const createCategory = (payload: ITourCategoryNullable) => {
    post<ITourCategory>(ENDPOINT.UPDATE_CATEGORY, {
      ...payload,
      categoryId,
    }).then((res: SuccessResponse<ITourCategory>) => {
      callback(false, res.data)
      message.success('Sửa thành công!')
    });
  }

  const updateCategory = (payload: ITourCategoryNullable) => {
    post<ITourCategory>(ENDPOINT.CREATE_CATEGORY, {
      ...payload,
    }).then((res: SuccessResponse<ITourCategory>) => {
      callback(false, res.data)
      message.success('Thêm thành công!')
    });
  }

  const handleSubmit = (payload: ITourCategoryNullable) => {
    setLoading(true);
    if (categoryId) {
      createCategory({...payload, categoryId})
    } else {
      updateCategory(payload)
    }
    setLoading(false)
    form.resetFields();
  };
  
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Title level={5}>
        {categoryId ? 'Sửa danh mục tour' : 'Tạo mới danh mục tour'}
      </Title>
      <Form.Item
        name={'categoryCode'}
        label={'Mã danh mục Tour'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mã danh mục Tour!',
          },
          {
            min: 1,
            message: 'Nhập tối thiểu 1 ký tự',
          },
          {
            max: 50,
            message: 'Nhập tối đa 50 ký tự',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={'categoryName'}
        label={'Tên danh mục Tour'}
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên danh mục Tour!',
          },
          {
            min: 1,
            message: 'Nhập tối thiểu 1 ký tự',
          },
          {
            max: 250,
            message: 'Nhập tối đa 250 ký tự',
          },
        ]}>
        <Input />
      </Form.Item>
      <Button block type={'primary'} htmlType={'submit'} loading={loading}>
        {categoryId ? 'Sửa danh mục' : 'Tạo mới danh mục'}
      </Button>
    </Form>
  );
};

export default TourCategoryForm;
