/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:52:50
 * @Version			1.0
 * @Description
 */

import React from 'react';
import { ItemProps, Config } from './ItemProps';
import { Col, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ITEMTYPES } from './const';
import TemplateFactory from './TemplateFactory';
import { getGlobalConfig } from '../utils/globalConfig';
import { transformConfig, extend } from '../utils/logic';

const { Item: FormItem } = Form;

interface IProps extends ItemProps {
    data: Config;
}

const { HIDDEN } = ITEMTYPES;

export default (props: IProps) => {
    const { data, options } = props;
    const { formItemProps = {} } = data;

    const hasDep =
        Array.isArray(formItemProps.dependencies) && formItemProps.dependencies.length > 0;

    const renderTemplate = (config) => {
        const {
            show = true,
            colProps,
            item: { type }
        } = config;
        const { colable } = options;
        const realType = `${type}`.toLowerCase();
        let template4Render = TemplateFactory({
            ...props,
            data: config
        });
        const globalConfig = getGlobalConfig();
        const getColTemplate = () => {
            let middleColProps = {
                ...globalConfig.colProps,
                ...options.colProps,
                ...colProps
            };

            if (realType === HIDDEN) {
                middleColProps = {
                    ...middleColProps,
                    style: {
                        ...middleColProps.style,
                        display: 'none'
                    }
                };
            }

            return <Col {...middleColProps}>{template4Render}</Col>;
        };

        // 需要colable包装
        if (colable) {
            template4Render = getColTemplate();
        }

        // 是否展示
        return show ? template4Render : null;
    };

    /**
     * 有依赖 => render props
     */
    if (hasDep) {
        return (
            <FormItem dependencies={formItemProps.dependencies} noStyle>
                {(form: FormInstance) => {
                    const config = transformConfig(data, options, form);
                    const newConfig = extend(true, {}, config, {
                        formItemProps: {
                            dependencies: []
                        }
                    });
                    return renderTemplate(newConfig);
                }}
            </FormItem>
        );
    }

    /**
     * 不存在依赖 => 正常渲染组件
     */
    return renderTemplate(transformConfig(data, options));
};
