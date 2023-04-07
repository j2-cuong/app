import React, { useRef, useState, useEffect } from 'react';
import {
  SearchOutlined,
  EditOutlined,
  
} from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table, Modal } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { IToursList } from '@/features/ToursMain/IToursList';
import ModalBooking from '../modalBooking';


type DataTypeCallback = IToursList & {
  callback: (value: boolean) => void;
};
interface DataTypeCallbackProps {
  props: DataTypeCallback;
}

type DataIndex = keyof IToursList;
  const SearchTable = (props:any) => {
  const [data, setData] = useState<IToursList[]>([])
  useEffect(()=>{
    const mappedData : IToursList[] = props.data.map((e:IToursList) => ({
      ...e,
    }));
    setData(mappedData)
  },[])

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isTourId, setIsTourId] = useState('');

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleView =(id : string) => {

  }
  const handleBooking =(id : string) => {
    setIsTourId(id)
    setIsModal(true)
  }
  const handleCloseBooking =() => {
    setIsModal(false)
  }
  


  // const handleCancelEdit = () => {
  //   setIsOpenEdit(false);
  // };
  // const handleModalCloseEdit = (value: boolean) => {
  //   setIsOpenEdit(value);
  // };


  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<IToursList> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          //   placeholder={`Tìm ${dataIndex}`}
          placeholder="Tìm kiếm"
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}>
            Lọc
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text => text,
  });

  const columns: ColumnsType<IToursList> = [
    {
      title: 'tourName',
      dataIndex: 'tourName',
      key: 'tourName',
      width: '15%',

      ...getColumnSearchProps('tourName'),
    },
    {
      title: 'departureTime',
      dataIndex: 'departureTime',
      key: 'departureTime',
      width: '15%',
      ...getColumnSearchProps('departureTime'),
    },
    {
      title: 'arrivalTime',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
      width: '15%',
      ...getColumnSearchProps('arrivalTime'),
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
      width: '20%',
      ...getColumnSearchProps('price'),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_: any, record: IToursList) =>
        (data != null) ? (
          <Space size="middle">
            <a onClick={() => handleView(record.tourId)}>
              <EditOutlined />
              &nbsp;Xem
            </a>

            <a onClick={() => handleBooking(record.tourId)}>
              <EditOutlined />
              &nbsp;Booking
            </a>
          </Space>
        ) : null,
    },

  ].filter(x => x.dataIndex != "tourId");
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={'tourId'}
        pagination={{ pageSizeOptions: [10, 20, 50] }}
        size="small"
        bordered
      />
      <Modal open={isModal} onCancel={handleCloseBooking} width={1200} style={{top:"0px"}}
      >
        <ModalBooking data={isTourId}/>
      </Modal>
    </>
  );
};

export default SearchTable;
