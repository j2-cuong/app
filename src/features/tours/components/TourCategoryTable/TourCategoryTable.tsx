import React, { useRef, useState, useEffect } from 'react';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { InputRef, message } from 'antd';
import {
  Button,
  Input,
  Space,
  Table,
  Popconfirm,
  Modal,
  Typography,
} from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { TourCategoryHeader } from './TourCategoryTableStyled';
import TourCategoryForm from '../TourCategoryForm';
import { post } from '@/services/http';
import { ENDPOINT } from '@/config';
import { SuccessResponse } from '@/types/http.type';
import { ITourCategory, ITourCategoryDataset } from '@/types/tourcategory.type';
import { MESSAGE_MODAL_VI } from '@/constants/constants';
const { Title } = Typography;

type DataTypeCallback = ITourCategory & {
  callback: (value: boolean) => void;
};

interface DataTypeCallbackProps {
  props: DataTypeCallback;
}

type DataIndex = keyof ITourCategory;

const TourCategoryPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [totalNumber, setTotalNumber] = useState<number>(0);

  const [editItem, setEditItem] = useState<ITourCategory>({
    categoryId: '',
    categoryCode: '',
    categoryName: '',
  });

  const [data, setData] = useState<ITourCategory[]>([]);
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

  const handleDelete = (id: string) => {
    post<ITourCategory[]>(ENDPOINT.DELETE_CATEGORY, {
      categoryId: id,
    }).then((res: SuccessResponse<ITourCategory[]>) => {
      if(res.code === 0) {
        setData([...data].filter(x => x.categoryId !== id));
        setTotalNumber(totalNumber - 1);
        message.success(MESSAGE_MODAL_VI.DELETE_SUCCESS);
      } else {
        message.error(res.message)
      }
      
    });
  };

  // SEARCH FUNCTION
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<ITourCategory> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder="Tìm danh mục"
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

  // TOUR CATEGORY COLUMN
  const columns: ColumnsType<ITourCategory> = [
    {
      title: 'Mã danh mục tour',
      dataIndex: 'categoryCode',
      key: 'categoryCode',
      width: '20%',
      ...getColumnSearchProps('categoryCode'),
      sorter: (a, b) => a.categoryCode.length - b.categoryName.length,
    },
    {
      title: 'Tên danh mục Tour',
      dataIndex: 'categoryName',
      key: 'categoryName',
      ...getColumnSearchProps('categoryName'),
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      width: '15%',
      render: (_, record) =>
        data.length >= 1 ? (
          <Space size="middle">
            <a onClick={() => handleEdit(record)}>
              <EditOutlined />
              &nbsp;Chỉnh sửa
            </a>

            <Popconfirm
              title="Chắc chắn xóa?"
              onConfirm={() => handleDelete(record.categoryId)}>
              <a>
                <DeleteOutlined />
                &nbsp;Xóa
              </a>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];

  // ADD MODAL FUNCTION
  const handleAdd = () => {
    setIsOpenAdd(true);
  };
  const handleCancel = () => {
    setIsOpenAdd(false);
  };
  const handleSubmitAdd = (value: boolean, payload: any) => {
    setIsOpenAdd(value);
    setData([...data, payload]);
    setTotalNumber(totalNumber + 1);
  };

  // EDIT MODAL FUNCTION
  const handleEdit = (record: ITourCategory) => {
    setIsOpenEdit(true);
    setEditItem({ ...editItem, ...record });
  };
  const handleCancelEdit = () => {
    setIsOpenEdit(false);
  };
  const handleSubmitEdit = (value: boolean, payload: any) => {
    setIsOpenEdit(value);
    const updatedData = data.map(item => {
      if (item.categoryId === payload.categoryId) {
        return {
          ...item,
          categoryCode: payload.categoryCode,
          categoryName: payload.categoryName,
        };
      }
      return item;
    });
    setData(updatedData);
  };

  // LOAD DATA FIRST TIME
  const getAllCategory = () => {
    post<ITourCategoryDataset>(ENDPOINT.GET_ALL_CATEGORY, { name: '' }).then(
      (res: SuccessResponse<ITourCategoryDataset>) => {
        setLoadingTable(false);
        setData(res.data.dataList);
        setTotalNumber(res.data.totalNumber);
      }
    );
  };

  useEffect(() => {
    setLoadingTable(true);
    getAllCategory();
  }, []);

  return (
    <>
      <TourCategoryHeader>
        <Title level={3}>Danh mục Tour</Title>
        <Button type="primary" onClick={handleAdd}>
          <PlusSquareOutlined />
          Thêm danh mục
        </Button>
        <Modal open={isOpenAdd} onCancel={handleCancel} footer={null}>
          <TourCategoryForm callback={handleSubmitAdd} />
        </Modal>
      </TourCategoryHeader>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={'categoryId'}
        pagination={{
          pageSizeOptions: [10, 20, 50],
          total: totalNumber,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} bản ghi`,
        }}
        size="small"
        loading={loadingTable}
        bordered
      />
      <Modal open={isOpenEdit} onCancel={handleCancelEdit} footer={null}>
        <TourCategoryForm {...editItem} callback={handleSubmitEdit} />
      </Modal>
    </>
  );
};

export default TourCategoryPage;
