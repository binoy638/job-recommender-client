import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { Alert, Avatar, Text } from '@mantine/core';
import type { Chat } from '@types';
import { UserType } from '@types';
import type { AxiosRequestHeaders } from 'axios';
import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTypedSelector } from 'store';

import EmployerAPI from '@/API/EmployerAPI';
import Layout from '@/layouts/BasicLayout';
import { requireAuthentication, Utils } from '@/utils';

const fetchChat = async () => {
  const { data } = await EmployerAPI.getChat();
  return data.chat;
};

const getInitial = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName[0]}`;
};

const ChatBody = ({ activeChat }: { activeChat: Chat | null }) => {
  const { user } = useTypedSelector((state) => state.user);
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();
  const { mutate } = useMutation(EmployerAPI.sendMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries('chat');
      setValue('');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeChat) {
      mutate({ chatID: activeChat._id, message: value });
    }
  };

  if (!activeChat) {
    return null;
  }
  return (
    <div className="hidden lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="relative flex items-center border-b border-gray-300 p-3">
          <Avatar color="cyan" radius="xl">
            {getInitial(
              activeChat.jobseeker.firstName,
              activeChat.jobseeker.lastName
            )}
          </Avatar>
          <span className="ml-2 block font-bold text-gray-600">
            {activeChat.jobseeker.firstName} {activeChat.jobseeker.lastName}
          </span>
        </div>
        <div className="relative h-[40rem] w-full overflow-y-auto p-6">
          <ul className="space-y-2">
            {activeChat.messages.map((message) => {
              const isSelf = message.sender === user?._id;
              return (
                <li
                  key={message._id}
                  className={`flex  ${
                    isSelf ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`relative max-w-xl ${
                      isSelf && 'bg-gray-100'
                    } rounded px-4 py-2 text-gray-700 shadow`}
                  >
                    <span className="block">{message.message}</span>
                    <Text
                      style={{
                        fontSize: '10px',
                      }}
                      align={`${isSelf ? 'right' : 'left'}`}
                    >
                      {Utils.formatTime(message.createdAt)}
                    </Text>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center justify-between border-t border-gray-300 p-3"
        >
          <input
            type="text"
            placeholder="Message"
            className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            required
          />

          <button type="submit">
            <svg
              className="h-5 w-5 origin-center rotate-90 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

const EmployerChat = ({ chat }: { chat: Chat[] }) => {
  const { data, isLoading, isError } = useQuery('chat', fetchChat, {
    initialData: chat,
  });

  const [activeChat, setActiveChat] = useState((data && data[0]) || null);

  useEffect(() => {
    if (data && data.length > 0) {
      if (data[0]) {
        setActiveChat(data[0]);
      }
    }
  }, [data]);

  const handleClick = (id: string) => {
    if (data) {
      const chatMessages = data.find((c) => c._id === id);
      if (chatMessages) {
        setActiveChat(chatMessages);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error</div>;
  }

  if (data.length === 0) {
    return (
      <Alert icon={<ExclamationCircleIcon />} title="Bummer!" color="red">
        <span>You do not have any active chats.</span>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="min-w-full rounded border lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <ul className="h-[32rem] overflow-auto">
            <h2 className="my-2 ml-2 text-lg text-gray-600">Chats</h2>
            <li>
              {data.map((chat_) => {
                return (
                  <div
                    key={chat_._id}
                    onClick={() => handleClick(chat_._id)}
                    className="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
                  >
                    <Avatar color="cyan" radius="xl">
                      {getInitial(
                        chat_.jobseeker.firstName,
                        chat_.jobseeker.lastName
                      )}
                    </Avatar>
                    <div className="w-full pb-2">
                      <div className="flex justify-between">
                        <span className="ml-2 block font-semibold text-gray-600">
                          {chat_.jobseeker.firstName} {chat_.jobseeker.lastName}
                        </span>
                        <span className="ml-2 block text-sm text-gray-600">
                          {Utils.formatDate(chat_.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </li>
          </ul>
        </div>

        <ChatBody activeChat={activeChat} />
      </div>
    </div>
  );
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
          chat,
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
