import React from 'react';
import { Card, Empty } from 'antd';

const NoData = ({ description, ...props }) => {
  return (
    <Card className="my-8" {...props}>
      <Empty className="mt-20" description={description || 'Data not found'} />
    </Card>
  );
};

export default NoData;

export const COMMON_NODATA_TEXT = {
  DOCUMENT: "There's no attachment yet!",
  JOB: "There's no job yet!",
  NOTE: "There's no note yet!",
  COMMENT: "There's no comment yet!",
  TASK: "There's no task yet!",
  SKILL: "There's no skill yet!",
  REVIEW: "There's no review yet!",
};
