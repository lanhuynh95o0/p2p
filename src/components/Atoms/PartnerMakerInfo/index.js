import React from 'react';
import 'assets/css/google-map.scss';
import './styles.scss';
import Image from '../Image';
import DefaultAvatar from 'assets/images/logo/default.png';
import { LinkOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

const PartnerMarkerInfo = ({
    partner,
    onClick
}) => {
    const _onImageError = () => {
        document.getElementById(`partner-marker-info__logo${partner.id}`).src = DefaultAvatar;
    };

    const _onElementLoad = () => {
        document.querySelector(`#partner-marker-info__content${partner.id} .card-link`).onclick = onClick;
    };

    return (partner && (
        <div onLoad={_onElementLoad} id={`partner-marker-info-${partner.id}`}
            className="partner-marker-info d-none" key={partner.id}>
            <Row>
                <Col span={10} className="card-img-container partner-marker-info__logo">
                    <Image id={`partner-marker-info__logo${partner.id}`} onError={_onImageError}
                        src={partner.logo} defaultSrc={DefaultAvatar} />
                </Col>
                <Col span={14} className="partner-marker-info__content"
                    id={`partner-marker-info__content${partner.id}`}
                >
                    <div className={`card-title`}>
                        {partner.name}
                    </div>
                    <div className={`card-address mb-8`}>
                        {partner.address || 'No address specified'}
                    </div>
                    <div className={`card-link ${onClick ? 'text-link' : 'text-dark-gray'}`}>
                        {onClick ? 'View public profile' : 'No public profile'}
                        <LinkOutlined className="link-icon ml-5" />
                    </div>
                    <hr className="my-8" />
                    <div className="card-description">
                        {partner.aboutUs || 'No description yet'}
                    </div>
                </Col>
            </Row>
        </div>
    )) || null;
};

export default PartnerMarkerInfo;
