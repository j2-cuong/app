import { SearchOutlined } from '@ant-design/icons';
import { Typography, Button, DatePicker, Form, Select } from 'antd';
import { TourCategoryPageWrap } from '../../TourCategoryPage/TourCategoryPageStyled';
import { useEffect, useState } from 'react';
import {  postDestinationCategory, postGetTour } from '@/services/http';
import { ENDPOINT } from '@/config';
import { IToursList } from '@/features/ToursMain/IToursList';
import { DestinationCategory,  SuccessResponseTourSearch } from '@/types/http.type';
import { IDestination, IDestinationRes } from './IBooking';
import SearchTable from '@/features/Booking/SearchTable';
import './style.css';
import {  ITourDataset } from '@/types/tour.type';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ToursSearch = () => {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const [selectedItem, setSelectedItem] = useState<IDestinationRes[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [data, setData] = useState<IToursList[]>([]);


  const loadDataLocation = () => {
    postDestinationCategory<IDestination[]>(ENDPOINT.DestinationCategory, {
      name: '',
    }).then((res: DestinationCategory<IDestination[]>) => {
      if (typeof res.data !== 'undefined') {
        let resAPI = res.data.map((e: IDestination) => {
          return {
            value: e.code,
            label: e.nameVi,
          };
        });
        setSelectedItem(resAPI);
      } else {
        setSelectedItem([]);
      }
    });
  };
  useEffect(() => {
    loadDataLocation();
  }, []);


  const onFinish = (values: any) => {
    // let json = {
    //   departureTime: values.time[0].format('YYYY-MM-DD'),
    //   arrivalTime: values.time[1].format('YYYY-MM-DD'),
    //   departureLocationCode: values.valuesLocationStart,
    //   destinationCode: values.valuesLocationFinish,
    // };

    let json = {
      "departureTime": "2023-04-05",
      "arrivalTime": "2023-04-05",
      "departureLocationCode": "VN",
      "destinationCode": "NHA"
    }

    postGetTour<IToursList[]>(ENDPOINT.ToursSearchInBooking, JSON.stringify(json))
    .then((res: SuccessResponseTourSearch<IToursList[]>) => {
        setData(res.data.dataList);
      }
    );
  };
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <div>
      <TourCategoryPageWrap>
        <Form
          {...layout}
          className="form-data"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 900 }}>
          <Form.Item
            name="valuesLocationStart"
            label=" Điểm đi"
            // rules={[{ required: true }]}
            >
            <Select
              className="form-input"
              showSearch
              placeholder="Điểm đi"
              optionFilterProp="children"
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={selectedItem}
            />
          </Form.Item>
          <Form.Item
            name="valuesLocationFinish"
            label=" Điểm đến"
            // rules={[{ required: true }]}
            >
            <Select
              className="form-input"
              showSearch
              placeholder="Điểm đến"
              optionFilterProp="children"
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={selectedItem}
            />
          </Form.Item>

          <Form.Item name="time" label="Thời gian" 
          // rules={[{ required: true }]}
          >
            <RangePicker className="form-input" format={'DD-MM-YYYY'} />
          </Form.Item>
          <Form.Item {...tailLayout} className="form-button">
            <Button type="primary" htmlType="submit">
              <SearchOutlined />
              Tìm kiếm
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Bỏ lọc
            </Button>
          </Form.Item>
        </Form>

        {data && data.length > 0 ? (
          <SearchTable data={data} />
        ) : (
          <p
            className="no-data"
            style={{ textAlign: 'center', fontSize: '22px' }}>
            No data available.
          </p>
        )}
      </TourCategoryPageWrap>
    </div>
  );
};

export default ToursSearch;
