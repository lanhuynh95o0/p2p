import React, { useCallback } from 'react';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { NoData } from 'components/Atoms';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';

const Skill = ({ skills }) => {
  const _itemSkill = useCallback(
    (item) => (
      <div className="item-skill" key={item.name}>
        <Icon component={IconCustom.Checked} className="icon-checked" />
        <div className="skill-content">
          <p className="skill-title">{item.name}</p>
          <p className="sub-skill-title">{item.categoryName}</p>
        </div>
      </div>
    ),
    []
  );

  return (
    <div className="block p-10">
      <h2 className="title">What we are good at</h2>
      {(skills?.length && skills.map(_itemSkill)) || (
        <NoData description={COMMON_NODATA_TEXT.SKILL} />
      )}
    </div>
  );
};

export default Skill;
