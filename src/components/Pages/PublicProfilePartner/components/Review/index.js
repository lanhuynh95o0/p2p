import React, { useCallback } from 'react';
import { Col, Rate, Row } from 'antd';
import { Image, NoData } from 'components/Atoms';
import { getTimeFormatNormal } from 'utilities/time';
import { COMMON_NODATA_TEXT } from 'components/Atoms/NoData';

import './styles.scss';

const Review = ({ profile }) => {
  // const _itemReview = useCallback(
  //   (item) => (
  //     <div key={item.id}>
  //       <Row className="review-item">
  //         <Col span={3}>
  //           <div className="w-100p square review-avatar">
  //             <Image src={item.reviewerLogo} />
  //           </div>
  //         </Col>
  //         <Col span={21} className="pl-10">
  //           <div className="d-table w-100p h-100p">
  //             <div className="d-table-cell va-m">
  //               <div>
  //                 <span className="name">{item.reviewerName}</span>
  //                 <span className="time">
  //                   {getTimeFormatNormal(new Date(item.reviewDate))}
  //                 </span>
  //               </div>
  //               <Rate allowHalf disabled defaultValue={item.rating} />
  //             </div>
  //           </div>
  //         </Col>
  //       </Row>
  //       <Row className="py-10 pl-10">
  //         <Col span={3} />
  //         <Col span={21}>
  //           <span className="content">{item.comment}</span>
  //         </Col>
  //       </Row>
  //     </div>
  //   ),
  //   []
  // );

  const _itemReview = useCallback(
    (item) => (
      <Row key={item.id} className="review-item" gutter={[16, 16]}>
        <Col span={3}>
          <div className="w-100p h-100pc review-avatar">
            <Image src={item.reviewerLogo} />
          </div>
        </Col>
        <Col span={21}>
          <Row align="middle">
            <Col flex="auto">
              <p className="name">{item.reviewerName}</p>
            </Col>
            <Col flex="none">
              <p className="time">
                {getTimeFormatNormal(new Date(item.reviewDate))}
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <Rate allowHalf disabled defaultValue={item.rating} />
            </Col>
          </Row>

          <Row>
            <Col className="mt-10">{item.comment}</Col>
          </Row>
        </Col>
      </Row>
    ),
    []
  );

  return (
    <>
      <div className="block p-10">
        <div>
          <h2 className="title d-inline-block">
            Reviews ({(profile.reviews || []).length})
          </h2>
          <Rate
            allowHalf
            disabled
            value={profile.averageRating}
            className="f-right"
          />
        </div>
        {(profile?.reviews?.length && profile.reviews.map(_itemReview)) || (
          <NoData description={COMMON_NODATA_TEXT.REVIEW} />
        )}
      </div>
    </>
  );
};

export default Review;
