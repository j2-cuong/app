import { MoreOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Chỉnh sửa',
    icon: <EditOutlined />,
  },
  {
    key: '2',
    label: 'Xóa',
    icon: <DeleteOutlined />,
  },

];

const ActionMenu = () => {
  const onClickDropdown = () => {
    console.log('click')
  }

    return (
        <Dropdown menu={{items}}>
            <MoreOutlined />
        </Dropdown>
    )
}

export default ActionMenu;