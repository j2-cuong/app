import { useRef, useState, useEffect } from 'react';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table, Popconfirm, Modal } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { IToursList } from './IToursList';
import { SuccessResponse } from '@/types/http.type';
import { ENDPOINT } from '@/config';
import { post } from '@/services/http';
import { useStore } from '@/store';
import { ITourData, ITourDestinations, ITourDetails } from '@/types/tour.type';
import { useHistory } from 'react-router-dom';
import { getPath } from '@/router-paths';

type DataTypeCallback = IToursList & {
  callback: (value: boolean) => void;
};

interface DataTypeCallbackProps {
  props: DataTypeCallback;
}

type DataIndex = keyof IToursList;

const TourPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const { tourStore } = useStore();
  const history = useHistory();

  const { setTourId, setTourData, setTourDestinations, setTourDetails } =
    tourStore;

  const [data, setData] = useState<IToursList[]>();

  // delete tour by id
  const deleteTour = (id: string) => {
    console.log(id);
    post<ITourData>(ENDPOINT.DELETE_TOUR, { tourId: id }).then(res => {
      console.log(res.data)
    })
  }

  // get tour data by id
  const getTourData = (id: string) => {
    post<ITourData>(ENDPOINT.GET_TOUR_BY_ID, { tourId: id }).then(res => {
      setTourData({
        ...res.data,
        departureTime: dayjs(res.data.departureTime),
      });
    });
  };

  // get tour details by id
  const getTourDetails = (id: string) => {
    post<ITourDetails[]>(ENDPOINT.GET_TOUR_DETAIL_BY_TOURID, {
      tourId: id,
    }).then(res => {
      setTourDetails(res.data);
    });
  };

  // get tour destinations by id
  const getTourDestinations = (id: string) => {
    post<ITourDestinations[]>(ENDPOINT.GET_DESTINATION_BY_TOURID, {
      tourId: id,
    }).then(res => {
      setTourDestinations(res.data.map(item => item.destinationCode));
    });
  };

  // GetDataTour
  const loadDataTour = () => {
    post<IToursList[]>(ENDPOINT.GET_ALL_TOURS, { name: '' }).then(
      (res: SuccessResponse<IToursList[]>) => {
        setIsLoadingTable(false);
        setData(res.data);
        setTotalNumber(res.data.length);
      }
    );
  };

  useEffect(() => {
    setIsLoadingTable(true);
    loadDataTour();
  }, []);
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

  const handleEdit = (id: string) => {
    setTourId(id);
    getTourData(id);
    getTourDestinations(id);
    getTourDetails(id);
    history.push(getPath('edittour'));
  };

  const handleCancelEdit = () => {
    setIsOpenEdit(false);
  };

  const handleDelete = (id: string) => {
    if (typeof data !== 'undefined') {
      const newData: IToursList[] = data.filter(el => el.tourId !== id);
      setData([...newData]);
      deleteTour(id);
      setTotalNumber(totalNumber - 1)
    }
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<IToursList> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
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
      title: 'Mã tour',
      dataIndex: 'tourCode',
      key: 'tourCode',
      width: '15%',
      fixed: 'left',
      ...getColumnSearchProps('tourCode'),
      // sorter: (a, b) => a.tourCode.length - b.tourCode.length,
    },
    {
      title: 'Tên Tours',
      dataIndex: 'tourName',
      key: 'tourName',
      ...getColumnSearchProps('tourName'),
    },
    {
      title: 'Ngày khởi hành',
      dataIndex: 'departureTime',
      key: 'departureTime',
      width: '15%',
      ...getColumnSearchProps('departureTime'),
    },
    {
      title: 'Số ngày',
      dataIndex: 'day',
      key: 'day',
      width: '10%',
      ...getColumnSearchProps('day'),
    },
    {
      title: 'Số đêm',
      dataIndex: 'night',
      key: 'night',
      width: '10%',
      ...getColumnSearchProps('night'),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      ...getColumnSearchProps('price'),
    },
    {
      title: 'Số khách',
      dataIndex: 'seatsNumber',
      key: 'seatsNumber',
      width: '10%',
      ...getColumnSearchProps('seatsNumber'),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      width: '15%',
      fixed: 'right',
      render: (_, record) =>
        typeof data !== 'undefined' ? (
          <Space size="middle">
            <a onClick={() => handleEdit(record.tourId)}>
              <EditOutlined />
              &nbsp;Chỉnh sửa
            </a>

            <Popconfirm
              title="Chắc chắn xóa?"
              onConfirm={() => handleDelete(record.tourId)}>
              <a>
                <DeleteOutlined />
                &nbsp;Xóa
              </a>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={'tourId'}
        loading={isLoadingTable}
        scroll={{ x: 1300 }}
        pagination={{
          pageSizeOptions: [10, 20, 50],
          total: totalNumber,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} bản ghi`,
        }}
        size="small"
        bordered
      />
    </>
  );
};

export default TourPage;
