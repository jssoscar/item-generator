/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:59:26
 * @Version			1.0
 * @Description
 */

import React, { Component } from 'react';
import { Options } from './ItemProps';
import { Descriptions } from 'antd';
import { ITEMTYPES } from './const';
import DangerHtml from '../custom/DangerHtml';
import { getMiddleId } from './utils';
import { getGlobalConfig } from '../utils/globalConfig';
import filterValue from '../utils/filterValue';
import { getRegisteredComponent } from '../utils/registerComponent';

const { HTML } = ITEMTYPES;

const { Item: DescItem } = Descriptions;

interface IProps {
    options: Options;
    form: any;
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
        const globalConfig = getGlobalConfig();
        const middleDescriptionsProps = {
            ...globalConfig.descriptionsProps,
            ...descriptionsProps
        };

        return (
            <Descriptions {...middleDescriptionsProps}>
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
                    const dataValue = initData[getMiddleId(name || id)];
                    let dangerHtmlTemplate: any = null;

                    // 用户：注册组件
                    const RegisteredComponent = getRegisteredComponent()[type];
                    let registeredComponentTemplate = RegisteredComponent ? (
                        <RegisteredComponent form={form} status={0} {...props} />
                    ) : null;

                    // html类型，只能支持到html结构的展示，通过DangerHtml包装
                    if (type === HTML) {
                        const html = template || dataValue;
                        if (typeof html === 'string') {
                            dangerHtmlTemplate = <DangerHtml html={html} {...props} />;
                        } else {
                            // html类型非表单元素，则直接返回模板或者当前值
                            console.warn('type为html类型时，建议template设置为string类型!');
                            dangerHtmlTemplate = html;
                        }
                    }

                    // 最终展示的文案
                    let content =
                        registeredComponentTemplate ||
                        dangerHtmlTemplate ||
                        template ||
                        filterValue({
                            data,
                            value: dataValue,
                            type,
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
