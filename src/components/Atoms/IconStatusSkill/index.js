import React from 'react';
import Icon, { IconCustom } from 'components/Atoms/Icon';
import { SKILL_STATUS } from 'constants/common';
import './styles.scss';

const IconStatusSkill = ({ status }) => {
  return (
    <>
      {status === SKILL_STATUS.VERIFIED && (
        <div className='icon-skill-verify mr-5'>
          <Icon component={IconCustom.Checked} />
        </div>
      )}
      {status === SKILL_STATUS.PENDING && (
        <div className='icon-skill-pending mr-5'>
          <Icon component={IconCustom.Information} />
        </div>
      )}
      {status === SKILL_STATUS.REJECTED && (
        <div className='icon-skill-reject mr-5'>
          <Icon component={IconCustom.Error} />
        </div>
      )}
    </>
  )
}

export default IconStatusSkill;
