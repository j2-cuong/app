import React, { useRef, useState, useEffect } from 'react';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table, Popconfirm, Modal } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { IDiscountDataset, IDiscountList } from './IDiscountList';
import DiscountForm from './DiscountForm/DiscountForm';
import { post } from '@/services/http';
import { ENDPOINT } from '@/config';
import { SuccessResponse } from '@/types/http.type';

type DataTypeCallback = IDiscountList & {
  callback: (value: boolean) => void;
};

interface DataTypeCallbackProps {
  props: DataTypeCallback;
}

type DataIndex = keyof IDiscountList;

const DiscountTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<IDiscountList>({
    discountId: '',
    categoryId: '',
    discountMax: '',
    partnerCode: '',
    categoryName: '',
  });

  const [data, setData] = useState<IDiscountList[]>([]);
  const loadDataDiscount = () => {
    post<IDiscountDataset>(ENDPOINT.GET_DISCOUNT, { name: '' }).then(
      (res: SuccessResponse<IDiscountDataset>) => setData(res.data.dataList)
    );
  };
  useEffect(() => {
    loadDataDiscount();
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

  const handleEdit = (record: IDiscountList) => {
    setIsOpenEdit(true);
    setEditItem({ ...editItem, ...record });
  };
  const handleCancelEdit = () => {
    setIsOpenEdit(false);
  };
  const handleModalCloseEdit = (value: boolean) => {
    setIsOpenEdit(value);
    loadDataDiscount();
  };
  const handleDelete = (id: string) => {
    post<IDiscountList[]>(ENDPOINT.DELETE_DISCOUNT, { DiscountId: id }).then(
      (res: SuccessResponse<IDiscountList[]>) => setData(res.data)
    );
    loadDataDiscount();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<IDiscountList> => ({
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

  const columns: ColumnsType<IDiscountList> = [
    // {
    //   title: 'DiscountId',
    //   dataIndex: 'discountId',
    //   key: 'discountId',
    //   width: '10%',
    //   ...getColumnSearchProps('discountId'),
    // },
    {
      title: 'categoryName',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: '30%',
      ...getColumnSearchProps('categoryName'),
    },
    {
      title: 'discountMax',
      dataIndex: 'discountMax',
      key: 'discountMax',
      width: '20%',
      ...getColumnSearchProps('discountMax'),
    },
    {
      title: 'Mã đại lý',
      dataIndex: 'partnerCode',
      key: 'partnerCode',
      width: '30%',
      ...getColumnSearchProps('partnerCode'),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_: any, record: IDiscountList) =>
        data != null ? (
          <Space size="middle">
            <a onClick={() => handleEdit(record)}>
              <EditOutlined />
              &nbsp;Chỉnh sửa
            </a>

            <Popconfirm
              title="Chắc chắn xóa?"
              onConfirm={() => handleDelete(record.discountId)}>
              <a>
                <DeleteOutlined />
                &nbsp;Xóa
              </a>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ].filter(x => x.dataIndex != 'warnId');
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={'TourId'}
        pagination={{ pageSizeOptions: [10, 20, 50] }}
        size="small"
        bordered
      />
      <Modal open={isOpenEdit} onCancel={handleCancelEdit} footer={null}>
        <DiscountForm {...editItem} callback={handleModalCloseEdit} />
      </Modal>
    </>
  );
};

export default DiscountTable;
