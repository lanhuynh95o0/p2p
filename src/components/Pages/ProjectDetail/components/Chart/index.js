import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MyButton, MyModal } from 'components/Atoms';
import { getJob, updateJobDuration } from 'states/job/actions';
import { useDispatch } from 'react-redux';
import GanttChart, {
  GANTT_VIEW,
  GANTT_VIEW_LIST,
} from 'components/Organisms/GanttChart';
import DropDownWithArrowIcon from 'components/Atoms/DropDownWithArrowIcon';
import { messageAction } from 'utilities/message';
import ModalUpdateJobDuration from 'components/Pages/ProjectDetail/components/ModalUpdateJobDuration';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import './styles.scss';

const Chart = ({ jobs, min, max, projectId, principal, onRefreshPage }) => {
  const dispatch = useDispatch();
  const refChart = useRef(null);
  const [viewMode, setViewMode] = useState(GANTT_VIEW.WEEK);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chartHeight, setChartHeight] = useState(500);
  const [selectedJob, setSelectedJob] = useState(null);
  const callbackOpenPopup = useRef(null);

  useEffect(() => {
    setChartHeight(
      refChart.current && isFullscreen ? refChart.current.offsetHeight : 500
    );
  }, [isFullscreen]);

  useEffect(() => {
    if (!selectedJob) {
      return;
    };
    setSelectedJob((jobs || []).find(job => job.id === selectedJob.id));
  }, jobs);

  const _switchIsFullscreen = useCallback(
    (value) => () => setIsFullscreen(value),
    []
  );

  const _handleSetSelected = (value) => (item) => {
    if (value === undefined) return dispatch(getJob(item.id, setSelectedJob));
    setSelectedJob(null);
  };

  const _handleOpenPopup = (item, callback) => {
    callbackOpenPopup.current = callback;
    setSelectedJob(item);
  };

  const viewMenu = useMemo(
    () =>
      GANTT_VIEW_LIST.map((item) => ({
        value: item,
        component: <span className="text-16">{item}</span>,
      })),
    []
  );

  const _handleChange = useCallback(
    (item, time) => {
      dispatch(
        updateJobDuration(
          { id: item.id, ...time, projectId },
          messageAction.updateJob
        )
      );
    },
    [projectId]
  );

  if (jobs.length)
    return (
      <div className={isFullscreen ? 'chart-full-screen' : ''}>
        <div className="info-header project-info-header">
          <h4 className="title">Job overview</h4>
          <div className="d-flex">
            <MyButton
              className="px-8 my-btn-no-style"
              onClick={_switchIsFullscreen(!isFullscreen)}
            >
              <Icon
                component={
                  isFullscreen
                    ? IconCustom.FullscreenExist
                    : IconCustom.FullscreenExpand
                }
                className="my-icon-md"
              />
            </MyButton>
            <h4 className="text-bold-md mr-32">View as: </h4>
            <DropDownWithArrowIcon
              menu={viewMenu}
              trigger={['click']}
              onSelectItem={setViewMode}
            >
              <span className="text-md">{viewMode}</span>
            </DropDownWithArrowIcon>
          </div>
        </div>
        <GanttChart
          ref={refChart}
          data={jobs}
          onClickBar={_handleOpenPopup}
          view={viewMode}
          min={min}
          max={max}
          onChange={_handleChange}
          height={chartHeight}
          className={`my-gantt-chart ${isFullscreen && 'my-gantt-chart-zoom'}`}
        />

        <MyModal visible={!!selectedJob} onClose={_handleSetSelected(null)}>
          <ModalUpdateJobDuration
            principal={principal}
            onRefreshPage={onRefreshPage}
            job={selectedJob}
            onSubmit={callbackOpenPopup.current}
            projectId={projectId}
            onClose={_handleSetSelected(null)}
            minDate={min}
            maxDate={max}
          />
        </MyModal>
      </div>
    );
  return null;
};
export default Chart;
