import React from 'react';
import { MyProgress } from 'components/Atoms';

const AssignedJobTimeline = ({ status }) => {
  return <MyProgress option={TIMELINE} type="text" progress={status} />;
};
const TIMELINE = {
  Pending: { value: 1, view: <span className="in-progress">Pending</span> },
  Accepted: { value: 2, view: <span className="completed">Accepted</span> },
};

export default AssignedJobTimeline;
