import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import {config} from 'config';

type Props = {
  title?: string;
};

const AppHelmet: FunctionComponent<Props> = (props) => {
  const { title } = props;
  const pageTitle = title ? config.appName + ' - ' + title : config.appName;
  return (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  );
};

export default AppHelmet;
