import React from 'react';
import styled from 'styled-components';

import GlobalStyle from '@styles/global-style';
import { Experience, Layout } from '@components';

const PageStyle = styled.div``;

export default function Page() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Experience />
      </Layout>
    </>
  );
}
