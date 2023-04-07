import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, message } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { useStore } from '@/store';
import { UploadWrapContent } from './TourUploadImageFormStyled';
import { postImage } from '@/services/http';
import { IImageUploadResponse } from '@/types/tour.type';
import { ENDPOINT } from '@/config';
import { useHistory } from 'react-router-dom';
import { getPath } from '@/router-paths';

interface Iprop {
  tourId: string;
}

const TourUploadImageForm: React.FC<Iprop> = ({ tourId }) => {
  const history = useHistory();
  const [imageList, setImageList] = useState<FileList>();
  const handleChange = (e: any) => {
    setImageList(e.target.files);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    if (imageList) {
      for (let i = 0; i < imageList.length; i++) {
        formData.append('files', imageList[i]);
        formData.append('tourId', tourId);
      }
    }

    postImage<IImageUploadResponse>(ENDPOINT.UPLOAD_IMG, formData)
      .then(res => {
        if (res.code === 0) {
          message.success(res.message);
          history.push(getPath('tourlist'));
        } else {
          message.error('Code:' + res.code + ':' + res.message);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <UploadWrapContent>
      <Space direction="horizontal" style={{ width: '100%' }} size="large">
        <input
          type="file"
          accept=".png,.jpg"
          max={10}
          multiple
          onChange={handleChange}
        />
      </Space>
      <Button onClick={handleSubmit} type='primary'>Upload ảnh</Button>
    </UploadWrapContent>
  );
};

export default TourUploadImageForm;
