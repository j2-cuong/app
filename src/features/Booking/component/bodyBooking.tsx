import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
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
  DatePicker,
  Select,
  Row,
  Col,
} from 'antd';
import {
  BookingContent15,
  BookingSection,
  BookingWrapContent,
  TourAddingSection,
  TourFormContent333,
  TourFormContent5050,
} from '@/features/tours/components/TourDataForm/TourDataFormStyled';
import { useState } from 'react';
import { ConvertNumber } from '@/utils/Process';
const { Option } = Select;

dayjs.extend(customParseFormat);
const BodyBooking = (props: any) => {
  const dataProps = props.data;
  const [form] = Form.useForm<[]>();
  const dateFormat = 'DD/MM/YYYY';
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [totalVisa, setTotalVisa] = useState(0);
  const [totalRoom, setTotalRoom] = useState(0);
  const Caculator = (type: string) => {
    const sumTicket =
      adultsCount * dataProps.adtprice +
      childrenCount * dataProps.chdprice +
      infantsCount * dataProps.infprice;

    const sumfee =
      totalVisa * dataProps.visaPrice + totalRoom * dataProps.privateRoomPrice;
    const total = sumTicket + sumfee;
    const result =
      type === 'ticket'
        ? sumTicket
        : type === 'fee'
          ? sumfee
          : type === 'total'
            ? total
            : 0;
    return ConvertNumber(result);
  };
  const handlePassengerCountChange = (count: number, type: string) => {
    switch (type) {
      case 'adults':
        if (count < 0 || count + childrenCount + infantsCount > 10) return;
        setAdultsCount(count);
        break;
      case 'children':
        if (count < 0 || count + adultsCount + infantsCount > 10) return;
        setChildrenCount(count);
        break;
      case 'infants':
        if (count < 0 || count + childrenCount + adultsCount > 10) return;
        setInfantsCount(count);
        break;
    }
  };

  const handlePassengerCheckboxVisaChange = (checked: boolean) => {
    if (checked) {
      setTotalVisa(totalVisa + 1);
    } else {
      setTotalVisa(totalVisa - 1);
    }
  };
  const handlePassengerCheckboxRoomChange = (checked: boolean) => {
    if (checked) {
      setTotalRoom(totalRoom + 1);
    } else {
      setTotalRoom(totalRoom - 1);
    }
  };

  const renderPassengerForm = (index: number, type: string) => {
    return (
      <TourAddingSection>
        <BookingSection>
          <BookingContent15>
            <Form.Item
              label="Họ và tên"
              name={[`CusData${type}`, index, 'CustomerName']}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name={[`CusData${type}`, index, 'Gender']}>
              <Select>
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name={[`CusData${type}`, index, 'dateOfBirth']}>
              <DatePicker />
            </Form.Item>
            {type !== 'infants' && (
              <>
                <Form.Item
                  label="Visa"
                  name={[`CusData${type}`, index, 'visa']}
                  valuePropName="checked">
                  <Checkbox
                    onChange={e =>
                      handlePassengerCheckboxVisaChange(e.target.checked)
                    }>
                    {ConvertNumber(dataProps.visaPrice)} đ
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  label="Phòng riêng"
                  name={[`CusData${type}`, index, 'room']}
                  valuePropName="checked">
                  <Checkbox
                    onChange={e =>
                      handlePassengerCheckboxRoomChange(e.target.checked)
                    }>
                    {ConvertNumber(dataProps.privateRoomPrice)} đ
                  </Checkbox>
                </Form.Item>
              </>
            )}
          </BookingContent15>
        </BookingSection>
      </TourAddingSection>
    );
  };

  const renderPassengerList = (count: number, type: string) => {
    const passengerList = [];
    for (let i = 0; i < count; i++) {
      passengerList.push(
        <div key={`${type}-${i}`}>{renderPassengerForm(i, type)}</div>
      );
    }
    return passengerList;
  };
  const replaceFieldDateOfBirth = (fieldValue: Date) => {
    // Chuyển đổi fieldValue thành chuỗi định dạng mong muốn
    const formattedDate = dayjs(fieldValue).format('DD/MM/YYYY');
    return formattedDate;
  }
  const flattenArray = (arr: any) => {
    return arr.reduce((acc: any, val: any) => {
      return Array.isArray(val)
        ? acc.concat(flattenArray(val))
        : acc.concat(val);
    }, []);
  };
  const onFinish = (value: any) => {
    console.log(value);
    const { tourId } = dataProps;
    const { customerName, phoneNumber, emailAddress, contactAddress, CusDataadults, CusDatachildren, CusDatainfants } = value;
    const seatnumber = adultsCount + childrenCount + infantsCount;
    const passengerList = [
      {
        customerName: customerName,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress,
        contactAddress: contactAddress,
      },
      CusDataadults !== undefined ? CusDataadults.map((field: any) => {
        console.log(field)
        if (field.dateOfBirth) {
          // Thay thế trường dateOfBirth
          return {
            ...field,
            dateOfBirth: replaceFieldDateOfBirth(field.value)
          };
        } else {
          // Giữ nguyên các trường khác
          return field;
        }
      }) : {},
      CusDatachildren !== undefined ? CusDatachildren.map((field: any) => {
        console.log(field)
        if (field.dateOfBirth) {
          // Thay thế trường dateOfBirth
          return {
            ...field,
            dateOfBirth: replaceFieldDateOfBirth(field.value)
          };
        } else {
          // Giữ nguyên các trường khác
          return field;
        }
      }) : {},
      CusDatainfants !== undefined ? CusDatainfants.map((field: any) => {
        console.log(field)
        if (field.dateOfBirth) {
          // Thay thế trường dateOfBirth
          return {
            ...field,
            dateOfBirth: replaceFieldDateOfBirth(field.value)
          };
        } else {
          // Giữ nguyên các trường khác
          return field;
        }
      }) : {}
    ];
    const result = flattenArray(passengerList);
    const newData = {
      tourId: tourId,
      seatnumber: seatnumber,
      childNo: childrenCount,
      adultNo: adultsCount,
      infantNo: infantsCount,
      cusData: result,
    };
    console.log(newData)
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        labelWrap={true}
        // onValuesChange={handleChangeTourDetails}

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
              name={'customerName'}
              label={'Họ và tên'}
              required={true}>
              <Input placeholder="Nội dung" />
            </Form.Item>
            <Form.Item name={'emailAddress'} label={'Email'} required={true}>
              <Input placeholder="Nội dung" />
            </Form.Item>
          </TourFormContent5050>
          <TourFormContent5050>
            <Form.Item
              name={'phoneNumber'}
              label={'Số điện thoại'}
              required={true}>
              <Input placeholder="Nội dung" />
            </Form.Item>
            <Form.Item
              name={'contactAddress'}
              label={'Địa chỉ'}
              required={true}>
              <Input placeholder="Nội dung" />
            </Form.Item>
          </TourFormContent5050>
        </Space>
        <div
          style={{
            backgroundColor: '#e1e8f1',
            padding: '20px',
            borderRadius: 5,
          }}>
          <div
            style={{
              backgroundColor: '#fafafa',
              padding: '10px',
              borderRadius: 5,
            }}>
            <Divider orientation="left">Hành khách</Divider>
            <TourFormContent333>
              <Form.Item label={'Người lớn'} required={true}>
                <Button
                  onClick={() =>
                    handlePassengerCountChange(adultsCount - 1, 'adults')
                  }>
                  -
                </Button>
                <span
                  style={{
                    fontSize: '16px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                  }}>
                  {adultsCount}
                </span>
                <Button
                  onClick={() =>
                    handlePassengerCountChange(adultsCount + 1, 'adults')
                  }>
                  +
                </Button>
              </Form.Item>
              <Form.Item label={'Trẻ em'} required={true}>
                <Button
                  onClick={() =>
                    handlePassengerCountChange(childrenCount - 1, 'children')
                  }>
                  -
                </Button>
                <span
                  style={{
                    fontSize: '16px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                  }}>
                  {childrenCount}
                </span>
                <Button
                  onClick={() =>
                    handlePassengerCountChange(childrenCount + 1, 'children')
                  }>
                  +
                </Button>
              </Form.Item>
              <Form.Item label={'Em bé'} required={true}>
                <Button
                  onClick={() =>
                    handlePassengerCountChange(infantsCount - 1, 'infants')
                  }>
                  -
                </Button>
                <span
                  style={{
                    fontSize: '16px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                  }}>
                  {infantsCount}
                </span>
                <Button
                  onClick={() =>
                    handlePassengerCountChange(infantsCount + 1, 'infants')
                  }>
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
            <Space
              direction="vertical"
              size="middle"
              style={{
                display: 'flex',
                border: '1px solid #ccc1c1',
                borderRadius: 5,
              }}>
              <BookingWrapContent>
                {adultsCount > 0 && (
                  <div
                    style={{
                      fontSize: '16px',
                      marginBottom: '20px',
                      padding: '10px',
                      borderBottom: '1px solid #ccc1c1',
                    }}>
                    Người Lớn: {adultsCount} người
                  </div>
                )}
                {renderPassengerList(adultsCount, 'adults')}
                {childrenCount > 0 && (
                  <div
                    style={{
                      fontSize: '16px',
                      marginBottom: '20px',
                      padding: '10px',
                      borderBottom: '1px solid #ccc1c1',
                    }}>
                    Trẻ em: {childrenCount} người
                  </div>
                )}
                {renderPassengerList(childrenCount, 'children')}
                {infantsCount > 0 && (
                  <div
                    style={{
                      fontSize: '16px',
                      marginBottom: '20px',
                      padding: '10px',
                      borderBottom: '1px solid #ccc1c1',
                    }}>
                    Em bé: {infantsCount} người
                  </div>
                )}
                {renderPassengerList(infantsCount, 'infants')}
              </BookingWrapContent>
            </Space>
          </div>
        </div>
        <div style={{ padding: '40px', borderRadius: 5 }}>
          <Row gutter={24}>
            <Col span={6} style={{ border: '1px soild #ccc1c1' }}>
              <Space direction="vertical">
                <div>
                  Người lớn{' '}
                  {adultsCount > 0 && (
                    <span>
                      {adultsCount} x {ConvertNumber(dataProps.adtprice)}đ
                    </span>
                  )}
                </div>

                <div>
                  Trẻ em{' '}
                  {childrenCount > 0 && (
                    <span>
                      {childrenCount} x {ConvertNumber(dataProps.chdprice)}đ
                    </span>
                  )}
                </div>

                <div>
                  Em bé{' '}
                  {infantsCount > 0 && (
                    <span>
                      {infantsCount} x {ConvertNumber(dataProps.infprice)}đ
                    </span>
                  )}
                </div>
              </Space>
            </Col>
            <Col span={8}>
              <Space
                direction="vertical"
                style={{ border: '1px soild #ccc1c1' }}>
                <div>
                  Phụ thu phòng riêng
                  {totalRoom > 0 && (
                    <span>
                      {totalRoom} x {ConvertNumber(dataProps.privateRoomPrice)}đ
                    </span>
                  )}
                </div>

                <div>
                  Phụ thu visa{' '}
                  {totalVisa > 0 && (
                    <span>
                      {totalVisa} x {ConvertNumber(dataProps.visaPrice)}đ
                    </span>
                  )}
                </div>
              </Space>
            </Col>
            <Col span={4}>
              <div>
                Chiết khấu <span> 0đ</span>
              </div>
            </Col>
            <Col span={4}>
              <div>Tổng cộng</div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <div style={{ textAlign: 'right' }}>{Caculator('ticket')}đ</div>
            </Col>
            <Col span={8}>
              <div style={{ textAlign: 'right' }}>{Caculator('fee')}đ</div>
            </Col>
            <Col span={4}>
              <div style={{ textAlign: 'right' }}>đ</div>
            </Col>
            <Col span={4}>
              {' '}
              <div style={{ textAlign: 'right' }}>{Caculator('total')}đ</div>
            </Col>
          </Row>
        </div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default BodyBooking;
