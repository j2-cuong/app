import { Row, Col, Layout, Image, Typography } from 'antd';
import { ConvertTime } from '@/utils/Process';
const { Title } = Typography;
const { Header } = Layout;

const HeaderBooking = (props: any) => {
  const UrlImage = props.data.thumb;

  return (
    <Header>
      <Row>
        <Col span={8}>
          <Image
            className="img-"
            width={300}
            height={300}
            src={UrlImage}
            alt="Introduction Image"
          />
        </Col>
        <Col span={16}>
          <Title level={2}>{props.data.tourName}</Title>
          <span
            style={{
              color: 'black',
              fontSize: '16px',
              fontStyle: 'normal',
              paddingRight: '5px',
            }}>
            {'Mã tour: '}
          </span>
          <span style={{ color: 'red', fontSize: '18px' }}>
            {props.data.tourCode}
          </span>
          <br />
          <span
            style={{
              color: 'black',
              fontSize: '16px',
              fontStyle: 'normal',
              paddingRight: '5px',
            }}>
            {'Khởi hành: '}
          </span>
          <span style={{ color: 'blue' }}>
            {ConvertTime(props.data.departureTime)}
          </span>
          <br />
          <span
            style={{
              color: 'black',
              fontSize: '16px',
              fontStyle: 'normal',
              paddingRight: '5px',
            }}>
            {'Nơi khởi hành: '}
          </span>
          <span style={{ color: 'blue' }}>
            {props.data.departureLocationName}
          </span>
          <br />
          <span
            style={{
              color: 'black',
              fontSize: '16px',
              fontStyle: 'normal',
              paddingRight: '5px',
            }}>
            {'Thời gian: '}
          </span>
          <span style={{ color: 'blue' }}>
            {props.data.day} ngày - {props.data.night} đêm
          </span>
          <br />
          <span
            style={{
              color: 'black',
              fontSize: '16px',
              fontStyle: 'normal',
              paddingRight: '5px',
            }}>
            {'Số chỗ: '}
          </span>
          <span style={{ color: 'blue' }}>{props.data.seatsNumber}</span>
          <br />
          <span
            style={{
              color: 'black',
              fontSize: '16px',
              fontStyle: 'normal',
              paddingRight: '5px',
            }}>
            {'Dịch vụ: '}
          </span>
          <span style={{ color: 'blue' }}>
            {props.data.vehicleDesc} - {props.data.destinationDesc}
          </span>
        </Col>
      </Row>
    </Header>
  );
};
export default HeaderBooking;
