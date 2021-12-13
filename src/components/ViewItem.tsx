/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:59:26
 * @Version			1.0
 * @Description
 */

import React, { Component } from 'react';
import { Options } from './ItemProps';
import { Descriptions, Rate } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { ITEMTYPES } from './const';
import DangerHtml from '../custom/DangerHtml';
import { getParsedProps, getInitialValue } from './utils';
import { getGlobalConfig } from '../utils/globalConfig';
import filterValue from '../utils/filterValue';
import { getRegisteredComponent } from '../utils/registerComponent';

const { HTML, RATE } = ITEMTYPES;

const { Item: DescItem } = Descriptions;

interface IProps {
    options: Options;
    form?: FormInstance;
}

class ViewItem extends Component<IProps> {
    shouldComponentUpdate(nextProps) {
        try {
            const { stringify } = JSON;
            return stringify(nextProps.options) !== stringify(this.props.options);
        } catch (e) {
            return true;
        }
    }

    render() {
        const { options, form } = this.props;
        const { config, descriptionsProps, data: initData = {} } = options;
        const globalConfig: any = getGlobalConfig();

        const parsedDescriptionsProps = {
            ...globalConfig.descriptionsProps,
            ...descriptionsProps
        };

        return (
            <Descriptions {...parsedDescriptionsProps}>
                {config.map(({ item = {} }, index) => {
                    const {
                        template,
                        id = '',
                        label,
                        emptyText,
                        name = '',
                        type = '',
                        descriptionProps,
                        props,
                        params,
                        data = []
                    } = item;

                    const realType = `${type}`.toLowerCase();
                    const initialValue = getInitialValue(name || id, initData);

                    // 用户：注册组件
                    const RegisteredComponent = getRegisteredComponent()[realType];
                    let registeredComponentTemplate = RegisteredComponent ? (
                        <RegisteredComponent form={form} status={0} {...props} />
                    ) : null;

                    let defaultTypeTemplate: any = null;
                    // html类型，只能支持到html结构的展示，通过DangerHtml包装
                    if (realType === HTML) {
                        const html = template || initialValue;
                        const parsedProps = getParsedProps(item);
                        if (typeof html === 'string') {
                            defaultTypeTemplate = <DangerHtml html={html} {...parsedProps} />;
                        } else {
                            // html类型非表单元素，则直接返回模板或者当前值
                            console.warn('type为html类型时，建议template设置为string类型!');
                            defaultTypeTemplate = html;
                        }
                    } // 评分类型
                    else if (realType === RATE) {
                        const parsedProps = getParsedProps(item);
                        defaultTypeTemplate = (
                            <Rate {...parsedProps} disabled defaultValue={initialValue} />
                        );
                    }

                    // 最终展示的文案
                    let content =
                        registeredComponentTemplate ||
                        defaultTypeTemplate ||
                        template ||
                        filterValue({
                            data,
                            value: initialValue,
                            type: realType,
                            params: { ...globalConfig.params, ...params }
                        });
                    // 空字符串处理
                    typeof content === 'string' && (content = content.trim());

                    if ([undefined, ''].includes(content)) {
                        const defaultEmptyText =
                            emptyText || options.emptyText || globalConfig.emptyText;
                        content = defaultEmptyText == undefined ? '无' : defaultEmptyText;
                    }

                    return (
                        // @ts-ignore
                        <DescItem label={label} key={name || id || index} {...descriptionProps}>
                            {content}
                        </DescItem>
                    );
                })}
            </Descriptions>
        );
    }
}

export default ViewItem;