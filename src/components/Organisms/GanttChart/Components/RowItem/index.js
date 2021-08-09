import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import moment from 'moment';
import { Rnd } from 'react-rnd';
import { getTimeFormatDateTime, getTimeFormatNormal } from 'utilities/time';
import { Tooltip, Button } from 'antd';
import { setHoursForDate } from 'utilities/time';

const RowItem = ({
  item,
  maxWidth,
  grid,
  dateWidth,
  minDate,
  minX,
  onChange,
  onClickName,
  onClickBar,
}) => {
  const [, forceUpdate] = useState(0);
  const refRnd = useRef(null);
  const start = setHoursForDate(item?.startDate);
  const end = setHoursForDate(item?.endDate, '23:59:59');
  const duration = moment(end).diff(start, 'days');
  const [tooltip, setTooltip] = useState({
    visible: false,
    startDate: '',
    endDate: '',
  });
  const startTime = start.startOf('days').diff(minDate.startOf('days'), 'days');
  const min = useMemo(() => LEFT + minX, [minX]);
  const x = useMemo(
    () => min + startTime * dateWidth,
    [startTime, dateWidth, min]
  );
  const width = useRef(duration * dateWidth);

  useEffect(() => {
    width.current = duration * dateWidth;
    if (refRnd.current) {
      refRnd.current.updatePosition({ x, y: 0 });
      refRnd.current.updateSize({ width: width.current, height: ROW_HEIGHT });
    }
  }, [x, duration, dateWidth]);

  const _handleResize = useCallback(
    (e, direction, ref, delta, position) => {
      const currentX = Math.max(min, Math.round(position.x));
      refRnd.current.updatePosition({ x: currentX, y: 0 });

      width.current = Math.min(maxWidth - (currentX - min), ref.offsetWidth);
      refRnd.current.updateSize({
        width: width.current,
        height: ROW_HEIGHT,
      });

      const { startDate, endDate } = _getDate(currentX, width.current);

      setTooltip({
        visible: true,
        startDate: getTimeFormatNormal(startDate),
        endDate: getTimeFormatNormal(endDate),
      });
    },
    [maxWidth, min]
  );

  const _handleResizeStop = (e, direction, ref, delta, position) => {
    setTooltip((value) => ({ ...value, visible: false }));
    _handleChange(Math.max(position.x, min), ref.offsetWidth);
  };

  const _handleDrag = useCallback(
    (e, d) => {
      const currentX = Math.round(d.x);
      const result = !(
        currentX + 1 < min || width.current >= maxWidth - (currentX - min) + 1
      );
      if (!result) {
        _handleChange(d.lastX, width.current);
      }
      const { startDate, endDate } = _getDate(currentX, width.current);

      setTooltip({
        visible: true,
        startDate: getTimeFormatNormal(startDate),
        endDate: getTimeFormatNormal(endDate),
      });
      return result;
    },
    [maxWidth, min]
  );

  const _handleDragStop = (e, d) => {
    setTooltip((value) => ({ ...value, visible: false }));
    if (d.deltaX && d.x > 0 && Math.abs(d.x - d.lastX) < dateWidth)
      return _handleChange(d.lastX, width.current);
    if (!d.deltaX)
      onClickBar(({ startDate, endDate }) => {
        item.startDate = startDate;
        item.endDate = endDate;
        forceUpdate((n) => n + 1);
      });
  };

  const _getDate = useCallback(
    (x, w) => {
      const l = x - min;
      const startDate = moment(minDate).add(l / dateWidth, 'day');
      const endDate = setHoursForDate(
        moment(minDate).add((w + l) / dateWidth, 'day'),
        '23:59:59'
      );
      return { startDate, endDate };
    },
    [minDate, min]
  );

  const _handleChange = useCallback(
    (x, w) => {
      if (onChange && x + 1 >= min) {
        const { startDate, endDate } = _getDate(x, w);
        if (
          getTimeFormatDateTime(item.startDate) !==
            getTimeFormatDateTime(startDate) ||
          getTimeFormatDateTime(item.endDate) !== getTimeFormatDateTime(endDate)
        ) {
          item.startDate = startDate;
          item.endDate = endDate;
          onChange({ startDate, endDate });
        }
      }
    },
    [minDate, min]
  );

  return (
    <div className="item">
      <div
        className="item-name"
        style={{ color: '#1890ff' }}
        onClick={onClickName}
      >
        <span className="name text-1-line">{item.name}</span>
      </div>
      {grid}
      <Tooltip
        placement="top"
        title={`${tooltip.startDate} - ${tooltip.endDate}`}
        visible={tooltip.visible}
      >
        <Rnd
          ref={refRnd}
          className="fill-wrapper"
          dragGrid={[dateWidth, dateWidth]}
          resizeGrid={[dateWidth, dateWidth]}
          onResize={_handleResize}
          onResizeStop={_handleResizeStop}
          onDrag={_handleDrag}
          onDragStop={_handleDragStop}
          dragAxis="x"
        >
          <div className="fill" />
        </Rnd>
      </Tooltip>
    </div>
  );
};
export default RowItem;

const ROW_HEIGHT = 48;
const LEFT = 200;
