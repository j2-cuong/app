import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table } from 'antd';
import { IBookingData, IBookingTransaction, ITourData } from '../ToursSearch/IBooking';
import { ConvertNumber } from '@/utils/Process';

const BookingPage = () => {
  const expandedRowRender = () => {
    const columns: TableColumnsType<IBookingTransaction> = [
      { title: 'Tài khoản thao tác', dataIndex: 'userId', key: 'userId' },
      { title: 'Thời gian', dataIndex: 'time', key: 'time' },
      { title: 'Số tiền', dataIndex: 'amount', key: 'amount' },
      { title: 'Quyền', dataIndex: 'partnerCode', key: 'partnerCode' },
    ];

    const data :IBookingTransaction[]= [];
    for (let i = 1; i < 4; ++i) {
      data.push({
        userId: `${Math.floor(Math.random() * (1 - 500 + 1)) + 500}`,
        time: '2014-12-24',
        amount: `${ConvertNumber(100 * (1*0.25 +1) * 3 * i)}`,
        partnerCode: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<IBookingData> = [
    { title: 'Mã tour', dataIndex: 'tourCode', key: 'tourCode' ,width: '20%'},
    { title: 'Thời gian đặt', dataIndex: 'lastIssueDate', key: 'lastIssueDate' ,width: '10%'},
    { title: 'Tổng số ghế', dataIndex: 'seatsNumber', key: 'seatsNumber' ,width: '10%'},
    { title: 'Chiết khấu', dataIndex: 'discountAmount', key: 'discountAmount' ,width: '10%'},
    { title: 'Số tiền thanh toán', dataIndex: 'paymentPrice', key: 'paymentPrice' ,width: '10%'},
    { title: 'ghi chú', dataIndex: 'note', key: 'note' ,width: '15%'},
    { title: 'Trạng thái', dataIndex: 'statusCode', key: 'statusCode' ,width: '10%', render: () => <Badge status="success" text="Finished" />},
    { title: 'Action', key: 'operation', render: () => <Space size="middle">
            <a>Thanh toán</a>
            <a>Gia hạn</a>
			      <a>Hủy</a>
          </Space> },
  ];

  const data: IBookingData[] = [];
  for (let i = 1; i < 5; ++i) {
    data.push({
      tourCode : "ex0123" + i,
      tourName : "Tên Tour",
      bookingId: "", 
      tourId: "", 
      seatsNumber: "10",
      childNo: "",
      adultNo: "strng", 
      userId: "", 
      createdBy: "", 
      createdTime: "", 
      updatedBy: "", 
      updatedTime: "", 
      price: `${ConvertNumber(10000 * 3 * i)}`, 
      partnerCode: "", 
      discountAmount: `${ConvertNumber(10000 * 0.01 * i)}`, 
      paymentPrice: `${ConvertNumber((10000 * 3 * i)-(10000 * 0.01 * i))}`, 
      lastIssueDate: "04-07-2023",
      visaPrice: `${ConvertNumber(1000 * 2 * i)}`, 
      privateRoomPrice: `${ConvertNumber(1000 * 3.5 * i)}`, 
      statusCode: "Done",
      note: "Ghi chú",
      infantNo: ""
    });
  }

  return (
    <>
      <Table
        rowKey={(record) => record.tourCode}
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
      />
    </>
  );
};

export default BookingPage;
