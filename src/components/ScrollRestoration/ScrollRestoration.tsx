import React, { FC, PropsWithChildren, useEffect } from 'react';

const ScrollRestoration: FC<PropsWithChildren> = (props) => {
  useEffect(
    () => () => {
      document.getElementById('main')?.scrollTo(0, 0);
    },
    [],
  );
  return <>{props.children}</>;
};

export default ScrollRestoration;
