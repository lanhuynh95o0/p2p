import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.scss';
import moment from 'moment';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import WeekHeader from 'components/Organisms/GanttChart/Components/ViewWeek/index';
import MonthHeader from 'components/Organisms/GanttChart/Components/ViewMonth/index';
import RowItem from 'components/Organisms/GanttChart/Components/RowItem';
import * as routePath from 'routers/route-path';
import { useHistory } from 'react-router-dom';

const GanttChart = React.forwardRef(
  (
    { data, onClickBar, view, min, max, onChange, className, height = 500 },
    ref
  ) => {
    const history = useHistory();
    const diffDate = moment(max)
      .startOf('days')
      .diff(moment(min).startOf('days'), 'days');

    const _edit = (item) =>
      history.push(routePath.JOB_DETAIL.replace(':id', item.id));

    const cache = useRef(
      new CellMeasurerCache({
        defaultHeight: 80,
        minHeight: 50,
        fixedWidth: true,
      })
    );

    const option = useMemo(() => {
      if (view === GANTT_VIEW.WEEK) {
        const start = moment(min).startOf('week');
        const end = moment(max).endOf('week');
        const list = (() => {
          const list = [];
          let currentDate = moment(start);
          while (currentDate <= end) {
            list.push(moment(currentDate));
            currentDate = currentDate.add(1, 'week');
          }
          return list;
        })();
        const dateWidth = 14.3; //  14.3 = 100 / 7
        const minX =
          moment(min)
            .startOf('days')
            .diff(moment(start).startOf('days'), 'day') * dateWidth;
        return {
          minDate: start,
          maxDate: end,
          ListFirstRow: WeekHeader.MonthRow,
          ListSecondRow: WeekHeader.WeekRow,
          list,
          dateWidth,
          maxWidth: diffDate * dateWidth,
          minX,
          grid: list.map((_, index) => (
            <div key={index} className="item-week" />
          )),
        };
      }

      const start = moment(min).startOf('month');
      const end = moment(max).endOf('month');
      const dateWidth = 5; // 5 = 150 / 30
      const list = (() => {
        const list = [],
          listYear = {};
        let currentDate = moment(start);
        while (currentDate <= end) {
          const date = moment(currentDate);
          const year = moment(currentDate).format('YYYY');
          list.push({
            year: listYear[year] ? '' : year,
            date,
            width: date.daysInMonth() * dateWidth,
          });
          listYear[year] = true;
          currentDate = currentDate.add(1, 'month');
        }
        return list;
      })();

      const minX =
        moment(min).startOf('days').diff(moment(start).startOf('days'), 'day') *
        dateWidth;
      return {
        minDate: start,
        maxDate: end,
        ListFirstRow: MonthHeader.YearRow,
        ListSecondRow: MonthHeader.MonthRow,
        dateWidth,
        maxWidth: diffDate * dateWidth,
        minX,
        list,
        grid: list.map((_, index) => (
          <div
            key={index}
            className="item-month"
            style={{ width: _.width, minWidth: _.width }}
          />
        )),
      };
    }, [view, min, max, diffDate]);

    const refNameCol = useRef(null);
    const [nameColWidth, setNameColWidth] = useState(0);

    useEffect(() => {
      if (refNameCol.current) {
        setNameColWidth(refNameCol.current.clientWidth + 4);
      }
    }, [data?.length]);

    const _renderListFirstRow = ({ style }) => {
      return (
        <div style={{ ...style }} className="my-table-row">
          <div ref={refNameCol} className="item-name" />
          <option.ListFirstRow list={option.list} />
        </div>
      );
    };

    const _renderListSecondRow = ({ style }) => {
      return (
        <div style={{ ...style }} className="my-table-row">
          <div className="item-name" />
          <option.ListSecondRow list={option.list} />
        </div>
      );
    };

    const _handleChange = useCallback(
      (item) => (time) => onChange(item, time),
      []
    );

    const _handleClickBar = useCallback(
      (item) => (callback) => onClickBar && onClickBar(item, callback),
      []
    );

    const _renderData = ({ index, style }) => {
      const dataIndex = index - 2,
        item = data[dataIndex];

      return (
        <div style={{ ...style }} className="my-table-row">
          <RowItem
            item={item}
            index={dataIndex}
            onClickName={() => _edit(item)}
            onClickBar={_handleClickBar(item)}
            dateWidth={option.dateWidth}
            nameColWidth={nameColWidth}
            minDate={min}
            minX={option.minX}
            grid={option.grid}
            maxWidth={option.maxWidth}
            onChange={_handleChange(item)}
          />
        </div>
      );
    };

    const render = {
      0: _renderListFirstRow,
      1: _renderListSecondRow,
    };

    const _rowRender = ({ key, index, parent, style }) => {
      return (
        <CellMeasurer
          cache={cache.current}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {(render[index] || _renderData)({ index, style })}
        </CellMeasurer>
      );
    };

    const _rowGetter = useCallback(({ index }) => data[index], []);

    const rowCount = useMemo(() => data.length + 2, [data.length]);

    return (
      <div id="my-gantt-chart" className={className} ref={ref}>
        <List
          width={300}
          height={height}
          rowGetter={_rowGetter}
          rowCount={rowCount}
          rowHeight={52}
          rowRenderer={_rowRender}
        />
      </div>
    );
  }
);
export default GanttChart;

export const GANTT_VIEW = {
  WEEK: 'Week',
  MONTH: 'Month',
};
export const GANTT_VIEW_LIST = Object.values(GANTT_VIEW);
