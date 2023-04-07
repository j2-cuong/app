import {
  Form,
  Input,
  Divider,
  Space,
  Button,
  Popconfirm,
  Radio,
  Descriptions,
  Badge,
  Card,
  Collapse,
  Checkbox,
  Spin,
} from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import {
  BookingContent15,
  BookingIconDeleteSection,
  BookingSection,
  BookingWrapContent,
  TourAddingSection,
  TourFormContent333,
  TourFormContent5050,
} from '@/features/tours/components/TourDataForm/TourDataFormStyled';
import { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Calculator, ConvertNumber } from '@/utils/Process';
const { Panel } = Collapse;

const BodyBooking = (props: any) => {

  const dataProps = props.data

  const [form] = Form.useForm<[]>();
  const [countAdultNo, setCountAdultNo] = useState<number>(1); // số người lớn
  const [countChildNo, setCountChildNo] = useState<number>(0); // số trẻ em
  const [countInfantNo, setCountInfantNo] = useState<number>(0); // số Em bé 
  const [countPeople, setCountPeople] = useState<number>(1); // tổng số người
  const [bookPrivateRoom, setBookPrivateRoom ] = useState<number>(0); // số người chọn phòng riêng
  const [bookVisa, setBookVisa ] = useState<number>(0); // số người dùng visa

  const [showPanel2 , setShowPanel2] = useState<boolean>(false);
  const [showPanel3 , setShowPanel3] = useState<boolean>(false);


  const [price , setPrice] = useState(0) // giá chung
  const [visaPrice, setVisaPrice] = useState(0) // giá visa
  const [privateRoomPrice, setPrivateRoomPrice] = useState(0)// giá phòng riêng
  const [adtprice, setAdtprice] = useState(0) // giá người lớn
  const [chdprice, setChdprice] = useState(0) // giá trẻ em
  const [infprice, setInfprice] = useState(0) // giá em bé
  const [totalAmountTour, setTotalAmountTour] = useState(0) // tổng tiền



  useEffect(() => {
    // set các loại giá vào state
    setPrice(dataProps.price)
    setVisaPrice(dataProps.visaPrice)
    setPrivateRoomPrice(dataProps.privateRoomPrice)
    setAdtprice(dataProps.adtprice)
    setChdprice(dataProps.chdprice)
    setInfprice(dataProps.infprice)

    // set giá trị tour mặc định ban đầu
    setTotalAmountTour(dataProps.price * 1)

  }, []);


  const handleAdd = () => {
    setBookPrivateRoom(bookPrivateRoom +1)
  };
  const handleRemove=()=>{
    setBookPrivateRoom(bookPrivateRoom -1)
  }

  const panel1Title = `Chi phí tính theo giá Tour là:  ${ConvertNumber(totalAmountTour)} <=> Tương ứng của: ${countAdultNo} người lớn, ${countChildNo} trẻ em, ${countInfantNo} em bé`;
  const panel2Title = `Chi phí dịch vụ phòng riêng là:  ${'ConvertNumber(privateRoomPrice * 100000 * 2.75)'} <=> Tương ứng của: ${countPeople} người`;
  const panel3Title = `Chi phí Visa là:  ${'ConvertNumber(totalVisaAmount * 100000 * 1.55)'} <=> Tương ứng của: ${countPeople} người`;

  const onChange = (key: string | string[]) => {};
  const increment = (e: string) => {
    if (e == 'AdultNo') {
      setCountAdultNo(countAdultNo + 1);
    } else {
      setCountAdultNo(countAdultNo);
    }
    if (e == 'ChildNo') {
      setCountChildNo(countChildNo + 1);
    } else {
      setCountChildNo(countChildNo);
    }
    if (e == 'InfantNo') {
      setCountInfantNo(countInfantNo + 1);
    } else {
      setCountInfantNo(countInfantNo);
    }
  };

  const decrement = (e: string) => {
    if (e == 'AdultNo') {
      setCountAdultNo(countAdultNo - 1);
    } else {
      setCountAdultNo(countAdultNo);
    }
    if (e == 'ChildNo') {
      setCountChildNo(countChildNo - 1);
    } else {
      setCountChildNo(countChildNo);
    }
    if (e == 'InfantNo') {
      setCountInfantNo(countInfantNo - 1);
    } else {
      setCountInfantNo(countInfantNo);
    }
  };
  const handleSubmit = () => {};
  const onFinish = () => {};

  // xử lý visa và private room

  const onChangePrivateRoom =() =>{

  }
  const onChangeVisa =() =>{
    
  }
  const handleChangeTourDetails = (payload: any, allValues: any) => {
    // const { tourdetails, tourDestinations, ...dataValues } = allValues;
    // setTourData({ ...dataValues });
    // setTourDestinations([...tourDestinations]);
    // setTourDetails([...tourdetails]);
  };

  

  return (
    <>
        <Form
          form={form}
          layout="vertical"
          labelWrap={true}
          onValuesChange={handleChangeTourDetails}

          onFinish={onFinish}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <h1
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                alignContent: 'center',
              }}>
              Thông tin cơ bản
            </h1>
            <Divider orientation="left">Thông tin liên hệ</Divider>
            <TourFormContent5050>
              <Form.Item
                name={'vehicleDesc'}
                label={'Họ và tên'}
                required={true}>
                <Input placeholder="Nội dung" />
              </Form.Item>
              <Form.Item name={'vehicleDesc'} label={'Email'} required={true}>
                <Input placeholder="Nội dung" />
              </Form.Item>
            </TourFormContent5050>
            <TourFormContent5050>
              <Form.Item
                name={'vehicleDesc'}
                label={'Số điện thoại'}
                required={true}>
                <Input placeholder="Nội dung" />
              </Form.Item>
              <Form.Item name={'vehicleDesc'} label={'Địa chỉ'} required={true}>
                <Input placeholder="Nội dung" />
              </Form.Item>
            </TourFormContent5050>
            <Divider orientation="left">Hành khách</Divider>
            <TourFormContent333>
              <Form.Item name={'adultNo'} label={'Người lớn'} required={true}>
                <Button
                  onClick={() => {
                    decrement('AdultNo');
                  }}>
                  -
                </Button>
                <span
                  style={{
                    fontSize: '16px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                  }}>
                  {countAdultNo}
                </span>
                <Button
                  onClick={() => {
                    increment('AdultNo');
                  }}>
                  +
                </Button>
              </Form.Item>
              <Form.Item name={'childNo'} label={'Trẻ em'} required={true}>
                <Button
                  onClick={() => {
                    decrement('ChildNo');
                  }}>
                  -
                </Button>
                <span
                  style={{
                    fontSize: '16px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                  }}>
                  {countChildNo}
                </span>
                <Button
                  onClick={() => {
                    increment('ChildNo');
                  }}>
                  +
                </Button>
              </Form.Item>
              <Form.Item name={'infantNo'} label={'Em bé'} required={true}>
                <Button
                  onClick={() => {
                    decrement('InfantNo');
                  }}>
                  -
                </Button>
                <span
                  style={{
                    fontSize: '16px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                  }}>
                  {countInfantNo}
                </span>
                <Button
                  onClick={() => {
                    increment('InfantNo');
                  }}>
                  +
                </Button>
              </Form.Item>
              <p style={{ fontSize: '16px', textAlign: 'left' }}>
                {'● Người lớn'}
              </p>
              <p style={{ fontSize: '16px', textAlign: 'left' }}>
                {'● Trẻ em 2=> 12 tuổi'}
              </p>
              <p style={{ fontSize: '16px', textAlign: 'left' }}>
                {'● Em bé < 2 tuổi'}
              </p>
            </TourFormContent333>
          </Space>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Divider orientation="left">Thông tin hành khách</Divider>
            <BookingWrapContent>
              <Form.List name="cusData">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(field => (
                      <div key={field.key}>
                        <TourAddingSection>
                          <BookingSection>
                            <BookingContent15>
                              <Form.Item
                                name={[field.name, 'customerName']}
                                label={'Họ và tên'}>
                                <Input />
                              </Form.Item>
                              <Form.Item
                              name={[field.name, 'phoneNumber']}
                                label={'Số điện thoại'}>
                                <Input />
                              </Form.Item>
                              <Form.Item
                              name={[field.name, 'emailAddress']}
                                label={'Địa chỉ'}>
                                <Input />
                              </Form.Item>
                              <Form.Item name={[field.name, 'visaPrice']} label={'Visa'}>
                              <Checkbox onChange={onChangeVisa}>{ConvertNumber(visaPrice)}</Checkbox>
                              </Form.Item>
                              <Form.Item
                              name={[field.name, 'privateRoomPrice']} 
                                label={'Phòng riêng'}>
                                  <Checkbox onChange={onChangePrivateRoom}>{ConvertNumber(privateRoomPrice)}</Checkbox>
                              </Form.Item>
                            </BookingContent15>
                          </BookingSection>
                          <BookingIconDeleteSection>
                            <Popconfirm
                              title={'Chắc chắn xóa?'}
                              onConfirm={() => {
                                handleRemove()
                                remove(field.name)
                              }}>
                              <MinusCircleOutlined />
                            </Popconfirm>
                          </BookingIconDeleteSection>
                        </TourAddingSection>
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          handleAdd()
                          add()
                        }}
                        block
                        icon={<PlusOutlined />}>
                        Thêm dịch vụ
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </BookingWrapContent>
          </Space>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Badge.Ribbon text="Thanh toán" color="purple">
              <Card title="Thông tin thanh toán" size="small">
                <Collapse onChange={onChange}>
                  <Panel header={panel1Title} key="1">
                    <p>1111</p>
                  </Panel>
                  <Panel header={panel2Title} key="2">
                    <p>1111</p>
                  </Panel>
                  <Panel header={panel3Title} key="3">
                    <p>1111</p>
                  </Panel>
                </Collapse>
              </Card>
            </Badge.Ribbon>
          </Space>
        </Form>
    </>
  );
};
export default BodyBooking;
