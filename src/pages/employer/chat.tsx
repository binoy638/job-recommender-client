import type { Chat } from '@types';
import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React from 'react';

import EmployerAPI from '@/API/EmployerAPI';
import ChatBox from '@/components/chat/ChatBox';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication, Utils } from '@/utils';

const EmployerChat = ({ initialData }: { initialData: Chat[] }) => {
  return <ChatBox initialData={initialData} receiver="jobseeker" />;
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  UserType.EMPLOYER,
  async ({ req }) => {
    try {
      const headers = req.headers as AxiosRequestHeaders;

      const {
        data: { chat },
      } = await EmployerAPI.getChat(headers);

      return {
        props: {
          initialData: chat,
        },
      };
    } catch (error) {
      console.log(error);
      return Utils.redirect('/500');
    }
  }
);

EmployerChat.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EmployerChat;
