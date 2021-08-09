import React, { useCallback } from 'react';
import { CardItem, NoData } from 'components/Atoms';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';
import 'components/Pages/Notes/styles.scss';

const Notes = ({ job }) => {
  const _renderItem = useCallback((note) => {
    const extra = [
      {
        icon: IconCustom.Clipboard,
        value: note.tasks?.length || 0,
        text: 'task',
      },
      {
        icon: IconCustom.Message,
        value: note.comments?.length || 0,
        text: 'comment',
      },
    ];

    return (
      <CardItem
        key={note.id}
        id={note.id}
        name={note.partner?.name || ''}
        content={note.description}
        logo={note.partner?.logo}
        time={note.lastUpdatedTime}
        more={<></>}
        footer={
          <div className="note-footer">
            {extra.map((item) => (
              <span key={item.text}>
                <Icon component={item.icon} className="icon" />
                <span className="text">
                  {item.value}
                  {` ${item.text}${item.value === 1 ? '' : 's'}`}
                </span>
              </span>
            ))}
          </div>
        }
      />
    );
  }, []);

  return (
    <>
      <div className="info-header">
        <h4 className="title">Notes</h4>
      </div>
      {(job.notes?.length && <>{job.notes.map(_renderItem)}</>) || (
        <NoData description={COMMON_NODATA_TEXT.NOTE} />
      )}
    </>
  );
};

export default Notes;
