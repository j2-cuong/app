import React, { useRef, useState, useEffect } from 'react';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table, Popconfirm, Modal } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { IWarnList } from './IWarnList'
import WarnForm from './WarnForm/WarnForm';
import { ENDPOINT } from '@/config';
import { post, postGetListOnly } from '@/services/http';
import { wait } from '@testing-library/user-event/dist/utils';

type DataTypeCallback = IWarnList & {
  callback: (value: boolean) => void;
};

interface DataTypeCallbackProps {
  props: DataTypeCallback;
}

type DataIndex = keyof IWarnList;

const WarnTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [editItem, setEditItem] = useState<IWarnList>({
    warnId: '',
    partnerCode: '',
    userId: '',
    title: '',
    content: ''
  });

  // dumb data
  const [isData, setData] = useState<IWarnList[]>();
  const token = localStorage.getItem('jwt');
  let headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const loadDataWarn = () => {
    postGetListOnly<IWarnList[]>(ENDPOINT.SEARCH_WARN, { name: '' }).then(
      (res: IWarnList[]) => {
        setData(res)
      }
    );
  }
  useEffect(() => {
    loadDataWarn()
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

  const handleEdit = (record: IWarnList) => {
    setIsOpenEdit(true);
    setEditItem({ ...editItem, ...record });
  };
  const handleCancelEdit = () => {
    setIsOpenEdit(false);
  };
  const handleModalCloseEdit = (value: boolean) => {
    setIsOpenEdit(value);
    loadDataWarn();
  };
  const handleDelete = (id: string) => {
    let bodyJson = {
      warnId: id
    };
    post(ENDPOINT.DELETE_WARN,bodyJson);
    wait(500);
    loadDataWarn();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<IWarnList> => ({
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

  const columns: ColumnsType<IWarnList> = [
    {
      title: 'WarnId',
      dataIndex: 'warnId',
      key: 'warnId',
      width: '10%',

      ...getColumnSearchProps('warnId'),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      ...getColumnSearchProps('content'),
    },
    {
      title: 'Mã đại lý',
      dataIndex: 'partnerCode',
      key: 'partnerCode',
      width: '20%',
      ...getColumnSearchProps('partnerCode'),
    },
    {
      title: 'Hành động',
      width: '15%',
      dataIndex: 'action',
      render: (_: any, record: IWarnList) =>
        (isData != null) ? (
          <Space size="middle">
            <a onClick={() => handleEdit(record)}>
              <EditOutlined />
              &nbsp;Chỉnh sửa
            </a>

            <Popconfirm
              title="Chắc chắn xóa?"
              onConfirm={() => handleDelete(record.warnId)}>
              <a>
                <DeleteOutlined />
                &nbsp;Xóa
              </a>
            </Popconfirm>
          </Space>
        ) : null,
    },

  ].filter(x => x.dataIndex != "warnId");
  return (
    <>
      <Table
        columns={columns}
        dataSource={isData}
        rowKey={'warnId'}
        pagination={{ pageSizeOptions: [10, 20, 50],total: totalNumber,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} bản ghi`, }}
        size="small"
        bordered
      />
      <Modal open={isOpenEdit} onCancel={handleCancelEdit} footer={null}>
        <WarnForm {...editItem} callback={handleModalCloseEdit} />
      </Modal>

    </>
  );
};

export default WarnTable;
