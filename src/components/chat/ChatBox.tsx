import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { Alert, Avatar, Text, useMantineColorScheme } from '@mantine/core';
import type { Chat } from '@types';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTypedSelector } from 'store';

import EmployerAPI from '@/API/EmployerAPI';
import { Utils } from '@/utils';

const fetchChat = async () => {
  const { data } = await EmployerAPI.getChat();
  return data.chat;
};

const getInitial = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName[0]}`;
};

// const getUnreadCount = (messages: Message[], userID?: string) => {
//   if (!userID) return 0;
//   return messages.filter(
//     (message) => message.unread && userID !== message.sender
//   ).length;
// };

const ChatBody = ({
  activeChat,
  receiver,
}: {
  activeChat: Chat | null;
  receiver: 'employer' | 'jobseeker';
}) => {
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

  // useEffect(() => {
  //   if (activeChat) {
  //     EmployerAPI.markAsRead({ chatID: activeChat._id });
  //   }
  // }, [activeChat]);

  if (!activeChat) {
    return null;
  }
  return (
    <div className="hidden lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="relative flex items-center border-b border-gray-300  p-3 dark:border-gray-800">
          <Avatar color="cyan" radius="xl">
            {getInitial(
              activeChat[receiver].firstName,
              activeChat[receiver].lastName
            )}
          </Avatar>

          <Text weight={'bold'} color="dimmed" p={10}>
            {activeChat[receiver].firstName} {activeChat[receiver].lastName}
          </Text>
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
                      isSelf && 'bg-gray-100 dark:bg-gray-900'
                    } rounded px-4 py-2 text-gray-700 dark:text-gray-500 shadow`}
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
          className="flex w-full items-center justify-between border-t border-gray-300 p-3 dark:border-gray-800"
        >
          <input
            type="text"
            placeholder="Message"
            className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700 dark:bg-gray-800 dark:text-gray-500"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            required
          />

          <button type="submit">
            <svg
              className="h-5 w-5 origin-center rotate-90 text-green-600"
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

const ChatBox = ({
  initialData,
  receiver,
}: {
  initialData: Chat[];
  receiver: 'employer' | 'jobseeker';
}) => {
  const { data, isLoading, isError } = useQuery('chat', fetchChat, {
    initialData,
  });

  const { colorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';

  const [activeChat, setActiveChat] = useState((data && data[0]) || null);

  // const { user } = useTypedSelector((state) => state.user);

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
    <div className={`${dark && 'dark'} container mx-auto`}>
      <div className="min-w-full rounded border dark:border-gray-800 lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 dark:border-gray-800 lg:col-span-1">
          <ul className="h-[32rem] overflow-auto">
            <li>
              {data.map((chat) => {
                const active = activeChat?._id === chat._id;
                return (
                  <div
                    key={chat._id}
                    onClick={() => handleClick(chat._id)}
                    className={`flex cursor-pointer items-center  border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 ${
                      active && 'bg-gray-100'
                    } focus:outline-none dark:border-gray-800`}
                  >
                    <Avatar color="cyan" radius="xl">
                      {getInitial(
                        chat[receiver].firstName,
                        chat[receiver].lastName
                      )}
                    </Avatar>

                    <div className="w-full ">
                      <div className="flex items-center justify-between">
                        <Text weight={'bold'} color="dimmed" p={10}>
                          {chat[receiver].firstName} {chat[receiver].lastName}
                        </Text>
                        {/* {getUnreadCount(chat.messages, user?._id) > 0 ? (
                          <Indicator
                            inline
                            color={"red"}
                            label={getUnreadCount(chat.messages, user?._id)}
                            style={{ zIndex: "1" }}
                            size={16}
                          >
                            <span className="ml-2 block text-sm text-gray-600">
                              {Utils.formatDate(chat.createdAt)}
                            </span>
                          </Indicator>
                        ) : (
                          <span className="ml-2 block text-sm text-gray-600">
                            {Utils.formatDate(chat.createdAt)}
                          </span>
                        )} */}
                        <span className="ml-2 block text-sm text-gray-600">
                          {Utils.formatDate(chat.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </li>
          </ul>
        </div>

        <ChatBody activeChat={activeChat} receiver={receiver} />
      </div>
    </div>
  );
};

export default ChatBox;
