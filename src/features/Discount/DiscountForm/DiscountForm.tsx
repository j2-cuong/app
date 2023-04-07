import { useEffect, useState } from 'react';
import { Form, Typography, Input, Button, Select, message } from 'antd';
import { SuccessResponse } from '@/types/http.type';
import { ENDPOINT } from '@/config';
import { post } from '@/services/http';
import { ITourCategory } from '@/types/tourcategory.type';
const { Title } = Typography;

export interface IDiscountList {
    discountId?: string;
    categoryId?: string;
    discountMax?: string
}

type DataTypeCallback = IDiscountList & {
  callback: (param: boolean, payload: IDiscountList) => void;
};
const DiscountForm: React.FC<DataTypeCallback> = props => {
    const [loading, setLoading] = useState<boolean>();
    const Option = Select.Option;
    const [form] = Form.useForm<IDiscountList>();
    const { discountId, categoryId, discountMax,  callback } = props;
    useEffect(() => {
      if (!categoryId || !categoryId || !discountMax) {
        return;
      }
      form.setFieldsValue({
        categoryId :categoryId,
        discountId: discountId,
        discountMax:discountMax
      });
    }, [categoryId, discountId, discountMax]);

    const [selectedValue, setSelectedValue] = useState('');
    const [data, setData] = useState<ITourCategory[]>([]);
    useEffect(() => {
        post<ITourCategory[]>(ENDPOINT.GET_ALL_CATEGORY, { name: '' }).then(
        (res: SuccessResponse<ITourCategory[]>) => setData(res.data)
        );
    }, []);
    const handleSelectChange = (event:any) => {
        setSelectedValue(event.target.value);
        };

    useEffect(() => {
        if (!discountId) {
            return;
        }
        form.setFieldsValue({
            discountId: discountId,
            categoryId: categoryId,
            discountMax:discountMax
        })
    }, [discountId, categoryId,discountMax,])

    const handleSubmit = (payload: IDiscountList) => {
        setLoading(true);
        message.success(`${categoryId ? 'Sửa thành công!' : 'Thêm thành công!'}`);
        setLoading(false);
        if (discountId) {
            // callback(false, {...payload, discountId });
            post<IDiscountList>(ENDPOINT.UPDATE_DISCOUNT, {
            ...payload,
            discountId,
            }).then((res: SuccessResponse<IDiscountList>) => callback(false, res.data));
        } else {
            post<IDiscountList>(ENDPOINT.CREATE_DISCOUNT, {
            ...payload,
            }).then((res: SuccessResponse<IDiscountList>) => callback(false, res.data));
            // callback(false, payload);
        }
        form.resetFields();
    };

    
    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit} id="formData">
            <Title level={5}>
                Tạo mới chiết khấu
            </Title>
            <Form.Item
                name={'discountId'}
                label={'discountId'}
                hidden={true}
            >
            <Input />
            </Form.Item>
            <Form.Item
                name={'categoryId'}
                label={'categoryId'}
            >
            <Select value={selectedValue} onChange={handleSelectChange}>
            <Option>Select a value</Option>
            {data.map(value => (
                <Option key={value.categoryId} value={value.categoryId}>
                {value.categoryName}
                </Option>
            ))}
            </Select>
            </Form.Item>
            <Form.Item
                name={'discountMax'}
                label={'discountMax'}
                rules={[
                    { required: true, message: 'Vui lòng nhập mô tả _discountMax!' },
                ]}>
                <Input />
            </Form.Item>
            <Button block type={'primary'} htmlType={'submit'} loading={loading}>
                {discountId ? 'Sửa danh mục' : 'Tạo mới danh mục'}
            </Button>
        </Form>
    );
};

export default DiscountForm;
