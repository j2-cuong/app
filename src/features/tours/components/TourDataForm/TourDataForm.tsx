import {
  Form,
  Input,
  InputNumber,
  Space,
  Select,
  Divider,
  DatePicker,
  Button,
  Popconfirm,
  message,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { post } from '@/services/http';
import { ENDPOINT } from '@/config';
import { SuccessResponse } from '@/types/http.type';
import { ITourCategoryDataset } from '@/types/tourcategory.type';
import { ICreateTourResponse, ITourDataRequest } from '@/types/tour.type';
import { IOption } from '@/types/common.type';
import { initTourData } from '@/constants/initdata';
import { useResetTourState } from '@/hooks/useResetTourState';
import {
  mappingResponseCategoryToOption,
  mappingDestinationToGroupSelect,
  mappingResponseDestinationToOption,
} from '@/utils/mapping';
import {
  TourFormWrapSection,
  TourFormContent5050,
  TourFormContent4315,
  TourFormContent333,
  TourFormContent7030,
  TourAddingWrapContent,
  IconDeleteSection,
  TourAddingSection,
  ButtonWrap,
} from './TourDataFormStyled';
import { IDestination, ITourData } from '@/types/tour.type';
import { useStore } from '@/store';
import type { DefaultOptionType } from 'antd/es/select';

const { Option } = Select;

interface IFunctionShowDataPage {
  dataFormCallback: (param: boolean, id: string) => void;
}

const TourDataForm = (prop: IFunctionShowDataPage) => {
  const [form] = Form.useForm();
  const { tourStore } = useStore();
  const {
    tourId,
    tourData,
    tourDestinations,
    tourDetails,
    setTourId,
    setTourData,
    setTourDestinations,
    setTourDetails,
  } = tourStore;

  const [options, setOptions] = useState<IOption[]>([]);
  const [pointOptions, setPointOptions] = useState<IOption[]>([]);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const setInitTourState = useResetTourState();

  const min: number = 1;
  const max: number = 20;

  const dayOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
  ];

  // set form fields by open page first time
  form.setFieldsValue({
    ...tourData,
    tourDestinations: [...tourDestinations],
    tourdetails: [...tourDetails],
  });

  // api call get category
  const getAllCategory = () => {
    post<ITourCategoryDataset>(ENDPOINT.GET_ALL_CATEGORY, {
      name: '',
    }).then((res: SuccessResponse<ITourCategoryDataset>) => {
      setOptions(mappingResponseCategoryToOption(res.data));
    });
  };

  // api call get destinations
  const getAllDestination = () => {
    post<IDestination[]>(ENDPOINT.GET_ALL_DESTINATION).then(
      (res: SuccessResponse<IDestination[]>) => {
        setPointOptions(mappingResponseDestinationToOption(res.data));
      }
    );
  };

  // api call create tour
  const createNewTour = (createTour: ITourDataRequest) => {
    post<ICreateTourResponse>(ENDPOINT.CREATE_TOUR, createTour)
      .then((res: SuccessResponse<ICreateTourResponse>) => {
        if (res.data) {
          message.success('Thêm mới Tour thành công!');
          setInitTourState();
          prop.dataFormCallback(false, res.data.tourId);
        } else {
          message.error(res.message);
        }
        setButtonLoading(false);
      })
      .catch(err => console.log(err));
  };

  // api call edit tour
  const editTour = (editTour: ITourDataRequest) => {
    post<ICreateTourResponse>(ENDPOINT.UPDATE_TOUR, editTour)
      .then((res: SuccessResponse<ICreateTourResponse>) => {
        if (res.data) {
          message.success('Chỉnh sửa Tour thành công!');
          setInitTourState();
          prop.dataFormCallback(false, res.data.tourId);
          console.log(res.data);
        } else {
          message.error(res.message);
          console.log(res.data);
        }
        setButtonLoading(false);
      })
      .catch(err => console.log(err));
  };

  // store value to state while filling fields
  const handleChangeTourDetails = (payload: any, allValues: any) => {
    const { tourdetails, tourDestinations, ...dataValues } = allValues;
    setTourData({ ...dataValues });
    setTourDestinations([...tourDestinations]);
    setTourDetails([...tourdetails]);
  };

  // handle submit button
  const onFinish = (value: any) => {
    setButtonLoading(true);
    const { tourdetails, tourDestinations, ...dataValues } = value;

    const tourRequestModal: ITourDataRequest = {
      tourData: {
        ...dataValues,
        seatsNumber: 50,
      },
      tourDetails: tourdetails,
      tourDestinations: tourDestinations.map((item: IDestination) => {
        return { destinationCode: item };
      }),
    };
    console.log(tourId);
    if (tourId) {
      tourRequestModal.tourId = tourId;
      // tourRequestModal.tourData.tourCode = tourData.tourCode;
      // console.log(tourData.tourCode);
      // tourRequestModal.tourDetails = tourDetails.map(item => {
      //   return { dayNumber: item.dayNumber, description: item.description };
      // });
      editTour(tourRequestModal);
    } else {
      createNewTour(tourRequestModal);
    }
  };

  // load options by first time open page

  useEffect(() => {
    getAllCategory();
    getAllDestination();
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      labelWrap={true}
      onValuesChange={handleChangeTourDetails}
      onFinish={onFinish}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Divider orientation="left">Thông tin cơ bản</Divider>
        <TourFormWrapSection>
          <TourFormContent7030>
            <Form.Item
              name={'tourName'}
              label={'Tên Tour'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên tour',
                },
              ]}>
              <Input placeholder="Tour nội địa" />
            </Form.Item>
            <Form.Item
              name={'typeId'}
              label={'Loại Tour'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại tour',
                },
              ]}>
              <Select
                showSearch
                placeholder={'Chọn loại Tour'}
                options={options}
              />
            </Form.Item>
          </TourFormContent7030>
          <TourFormContent4315>
            <Form.Item
              name={'departureLocationCode'}
              label="Điểm khởi hành"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn điểm khởi hành',
                },
              ]}>
              <Select
                showSearch
                placeholder={'Lựa chọn'}
                options={pointOptions}></Select>
              {/* <Cascader
                options={pointOptions}
                placeholder="Chọn điểm đi"
                showSearch={{ filter }}
                onSearch={value => console.log(value)}
              /> */}
            </Form.Item>
            <Form.Item
              name={'departureTime'}
              label="Ngày khởi hành"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ngày khởi hành',
                },
              ]}>
              <DatePicker showTime />
            </Form.Item>
            <Form.Item
              name={'day'}
              label={'Số ngày'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn số ngày',
                },
              ]}>
              <Select placeholder={'Lựa chọn'} options={dayOptions}></Select>
            </Form.Item>
            <Form.Item
              name={'night'}
              label={'Số đêm'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn số đêm',
                },
              ]}>
              <Select placeholder={'Lựa chọn'} options={dayOptions}></Select>
            </Form.Item>
          </TourFormContent4315>
          <Form.Item
            name={'tourDestinations'}
            label={'Điểm đến (Chọn nhiều điểm đến)'}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn điểm đến',
              },
            ]}>
            <Select
              mode="multiple"
              placeholder="Lựa chọn"
              optionLabelProp="label"
              options={pointOptions}></Select>
            {/* <Cascader
              options={pointOptions}
              placeholder="Chọn điểm đến"
              showSearch={{ filter }}
              onSearch={value => console.log(value)}
              multiple
            /> */}
          </Form.Item>
          <TourFormContent5050>
            <Form.Item name={'vehicleDesc'} label={'Phương tiện di chuyển'}>
              <Input placeholder="Nội dung" />
            </Form.Item>
            <Form.Item name={'destinationDesc'} label={'Điểm tham quan'}>
              <Input placeholder="Nội dung" />
            </Form.Item>
          </TourFormContent5050>
          <TourFormContent5050>
            <Form.Item name={'idealTimeDesc'} label={'Thời điểm tham quan'}>
              <Input placeholder="Nội dung" />
            </Form.Item>
            <Form.Item name={'targetDesc'} label={'Đối tượng thích hợp'}>
              <Input placeholder="Nội dung" />
            </Form.Item>
          </TourFormContent5050>
          <TourFormContent5050>
            <Form.Item name={'hotel'} label={'Khách sạn'}>
              <Input placeholder="Nội dung" />
            </Form.Item>
            <Form.Item name={'specialOfferDesc'} label={'Ưu đãi'}>
              <Input placeholder="Nội dung" />
            </Form.Item>
          </TourFormContent5050>
        </TourFormWrapSection>
      </Space>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Divider orientation="left">Thông tin giá tour</Divider>
        <TourFormWrapSection>
          <TourFormContent333>
            <Form.Item name={'adtprice'} label={'Giá người lớn'}>
              <Input suffix={'VNĐ'} />
            </Form.Item>
            <Form.Item name={'chdprice'} label={'Giá trẻ em'}>
              <Input suffix={'VNĐ'} />
            </Form.Item>
            <Form.Item name={'infprice'} label={'Giá em bé'}>
              <Input suffix={'VNĐ'} />
            </Form.Item>
          </TourFormContent333>
          <TourFormContent333>
            <Form.Item name={'privateRoomPrice'} label={'Giá phòng riêng'}>
              <Input suffix={'VNĐ'} />
            </Form.Item>
            <Form.Item name={'visaPrice'} label={'Giá visa'}>
              <Input suffix={'VNĐ'} />
            </Form.Item>
            <Form.Item name={'firstCharge'} label={'Hình thức thanh toán'}>
              <Select placeholder={'Lựa chọn'}>
                <Option value="100">Thanh toán toàn bộ</Option>
              </Select>
            </Form.Item>
          </TourFormContent333>
        </TourFormWrapSection>
      </Space>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Divider orientation="left">Thông tin lịch trình</Divider>
        <TourAddingWrapContent>
          <Form.List name="tourdetails">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <div key={field.key}>
                    <TourAddingSection>
                      <Form.Item
                        name={[field.name, 'dayNumber']}
                        label={'Ngày'}
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập số ngày',
                          },
                        ]}>
                        <InputNumber
                          style={{ width: '100%' }}
                          min={min}
                          max={max}
                        />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'description']}
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập nội dung',
                          },
                        ]}>
                        <Input.TextArea placeholder={'Nội dung hành trình'} />
                      </Form.Item>
                      <IconDeleteSection>
                        <Popconfirm
                          title={'Chắc chắn xóa?'}
                          onConfirm={() => remove(field.name)}>
                          <MinusCircleOutlined />
                        </Popconfirm>
                      </IconDeleteSection>
                    </TourAddingSection>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}>
                    Thêm lịch trình
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </TourAddingWrapContent>
      </Space>
      <Divider></Divider>
      <ButtonWrap>
        <Button htmlType="submit" type="primary" loading={buttonLoading}>
          Gửi thông tin <ArrowRightOutlined />
        </Button>
      </ButtonWrap>
    </Form>
  );
};

export default TourDataForm;
