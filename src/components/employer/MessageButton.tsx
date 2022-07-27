import { ChatIcon, CheckIcon, XIcon } from '@heroicons/react/solid';
import { Button, Loader, Modal, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

import EmployerAPI from '@/API/EmployerAPI';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  jobseeker: string;
}

const MessageForm = ({ jobseeker, setOpenModal }: Props) => {
  const [value, setValue] = useState('');

  const { mutate, isLoading } = useMutation(EmployerAPI.createChat, {
    onSuccess: () => {
      setOpenModal(false);
      showNotification({
        message: 'Message Send',
        color: 'teal',
        icon: <CheckIcon className="h-5 w-5 " />,
      });
    },
    onError: () => {
      setOpenModal(false);
      showNotification({
        message: 'Oh no! Something went wrong',
        color: 'red',
        icon: <XIcon className="h-5 w-5 " />,
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ jobseeker, message: value });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Textarea
        placeholder="Enter your message"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        required
      />
      <Button color={'green'} type="submit">
        {isLoading ? <Loader size={'sm'} /> : 'Send'}
      </Button>
    </form>
  );
};

const MessageButton = ({ jobseeker }: { jobseeker: string }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpenModal(true)}>
        <ChatIcon className="mr-2 h-5 w-5" />
        Message
      </Button>
      <Modal centered opened={openModal} onClose={() => setOpenModal(false)}>
        <MessageForm jobseeker={jobseeker} setOpenModal={setOpenModal} />
      </Modal>
    </>
  );
};

export default MessageButton;
