/*
 * @Author			jssoscar
 * @Date			2020-12-03 20:58:37
 * @Version			1.0
 * @Description
 */

import React, { PureComponent } from 'react';
import { Row } from 'antd';
import ItemGenerator from '../src';

class City extends PureComponent {
    render() {
        const { form, province, city, status } = this.props;
        const config = [
            {
                id: 1,
                value: '北京',
                children: [
                    {
                        id: 11,
                        value: '市内'
                    }
                ]
            },
            {
                id: 2,
                value: '陕西',
                children: [
                    {
                        id: 22,
                        value: '西安'
                    }
                ]
            }
        ];
        const options = {
            colable: true,
            colProps: {
                span: 12
            },
            config: [
                {
                    item: {
                        id: province,
                        type: 'select',
                        data: config
                    }
                },
                {
                    item: {
                        id: city,
                        type: 'select',
                        data: config
                    }
                }
            ]
        };

        if (!status) {
            return <div>我是查看态啊</div>;
        }

        return (
            <Row gutter={4}>
                <ItemGenerator form={form} options={options} />
            </Row>
        );
    }
}

export default City;
