import { message } from 'antd';

const duration = 3;

export const messageSuccess = (config) => {
  message.success({ ...config, duration });
};

export const messageError = (config) => {
  message.error({ ...config, duration });
};

export const messageDestroy = () => {
  message.destroy();
};

export const messageLoading = (config) => {
  return message.loading({ ...config, duration });
};

export const messageAction = {
  removeClientSuccess: () => {
    messageSuccess({
      content: 'You have removed this client successfully',
    });
  },
  removeProjectSuccess: () => {
    messageSuccess({
      content: 'You have archived project successfully',
    });
  },
  removeJobSuccess: (job) => {
    messageSuccess({
      content: 'You have archived job successfully',
    });
  },
  removeNoteSuccess: (note) => {
    messageSuccess({
      content: 'You have archived note successfully',
    });
  },
  removeDocSuccess: (doc) => {
    messageSuccess({
      content: 'You have archived attachments successfully',
    });
  },
  removeCommentSuccess: (comment) => {
    messageSuccess({
      content: 'You have archived comment successfully',
    });
  },
  updateProfileSuccess: (data) => {
    messageSuccess({
      content: 'You have updated your profile successfully',
    });
  },
  createCommentSuccess: ({ content, type }) => {
    messageSuccess({
      content: 'You have added comment successfully',
    });
  },
  updateJob: ({ job }) => {
    messageSuccess({
      content: 'You have updated this job successfully',
    });
  },
  acceptJob: ({ job }) => {
    messageSuccess({
      content: 'You have accepted this job successfully',
    });
  },
  rejectJob: ({ job }) => {
    messageSuccess({
      content: 'You have rejected this job successfully',
    });
  },
  removeParticipant: ({ partner }) => {
    messageSuccess({
      content: 'You have removed this contractor successfully',
    });
  },
  verifyContract: ({ contract }) => {
    messageSuccess({
      content: 'You have verified this contract successfully',
    });
  },
};
