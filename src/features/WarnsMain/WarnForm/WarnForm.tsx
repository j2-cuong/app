import { useEffect, useState } from 'react';
import { Form, Typography, Input, Button, message } from 'antd';
import { post } from '@/services/http';
import { ENDPOINT } from '@/config';
import { iWarnListType } from '../IWarnList';
const { Title } = Typography;

type DataTypeCallback = iWarnListType & {
    callback: (param: boolean) => void;
};
const WarnForm: React.FC<DataTypeCallback> = props => {
    const [loading, setLoading] = useState<boolean>();
    const [form] = Form.useForm<iWarnListType>();
    const { warnId, title, content, callback } = props;

    useEffect(() => {
        if (!warnId) {
            return;
        }
        form.setFieldsValue({
            warnId: warnId,
            title: title,
            content: content
        })
    }, [warnId, title, content,])


    const _title = Form.useWatch('title', form);
    const _content = Form.useWatch('content', form);
    const _id = Form.useWatch('warnId', form);

    const handleSubmit = (payload: iWarnListType) => {
        setLoading(true);
        setTimeout(() => {
            message.success('Thêm thành công!');
            setLoading(false);
            callback(false);
            form.resetFields();
        }, 2000);
    };
    const pushData = () => {
        const token = localStorage.getItem('jwt');
        let headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        let url = ENDPOINT.CREATE_WARN.toString();
        const check = !_id;
        if (check == false)
            url = ENDPOINT.UPDATE_WARN.toString();
        let JsonBody = {
            title: _title,
            content: _content,
            partnerCode: 'DEMO',
            warnId: _id
        }
        post(url, JsonBody);
    };
    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit} id="formData">
            <Title level={5}>
                Tạo mới danh mục Lưu ý
            </Title>
            <Form.Item
                name={'warnId'}
                label={'id'}
                hidden={true}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={'title'}
                label={'Tiêu đề'}
                rules={[
                    { required: true, message: 'Vui lòng nhập tiêu đề!' },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                name={'content'}
                label={'Chi tiết'}
                rules={[
                    { required: true, message: 'Vui lòng nhập mô tả chi tiết!' },
                ]}>
                <Input />
            </Form.Item>
            <Button block type={'primary'} htmlType={'submit'} onClick={pushData} loading={loading}>
                Lưu
            </Button>
        </Form>
    );
};

export default WarnForm;
