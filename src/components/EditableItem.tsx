/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:52:50 
 * @Version			1.0 
 * @Description	
 */

import React, { PureComponent } from 'react';
import { ItemProps, Config } from './ItemProps';
import { Col, Form } from 'antd';
import TemplateFactory from './TemplateFactory';
import { ITEMTYPES } from './const';
import { getInitialValue, getMiddleId } from './utils';
import { getGlobalConfig } from '../utils/globalConfig';

const { Item: FromItem } = Form;
const { HIDDEN } = ITEMTYPES;

interface IProps extends ItemProps {
    data: Config;
    form: any;
}

class Item extends PureComponent<IProps> {
    getTemplate = () => {
        const { props } = this;
        const { data, options } = props;
        const { item, formItemProps } = data;
        const { label } = item;

        // 新增 && 编辑
        return (
            <FromItem label={label} {...options.formItemProps} {...formItemProps}>
                {TemplateFactory(props)}
            </FromItem>
        );
    };

    render() {
        const { data, options, form } = this.props;
        const { colable } = options;
        const { item = {}, colProps } = data;
        const { getFieldDecorator } = form;
        const realType = `${item.type}`.toLowerCase();

        // hidden类型
        if (realType === HIDDEN) {
            const middleId = getMiddleId(item.id);
            const { initialValue } = getInitialValue(HIDDEN, (options.data || {})[middleId]);
            getFieldDecorator(item.id, {
                initialValue,
                ...item.options
            });
            return null;
        }

        const template = this.getTemplate();

        // 编辑状态
        if (colable) {
            const middleColProps = {
                ...getGlobalConfig().colProps,
                ...options.colProps,
                ...colProps
            };
            return <Col {...middleColProps}>{template}</Col>;
        }

        return template;
    }
}

export default Item;
