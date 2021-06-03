/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:51:37 
 * @Version			1.0 
 * @Description	
 */

import React from 'react';
import { Select, Tooltip } from 'antd';
import translateOption from './translateOption';

const { Option, OptGroup } = Select;

interface IOptions {
    /** 是否展示tooltip */
    showTooltip?: boolean;
    /** 选项是否disabled */
    shouldOptionDisabled?: (val: any) => boolean;
    /** label属性key */
    label?: string;
    /** value属性key */
    value?: string;
    /** 是否展示默认'请选择'  */
    showPleaseSel?: boolean;
    /** 【请选择】所对应值 */
    pleaseSelValue?: any;
    /** select默认placeholder,默认值：【请选择】 */
    initText?: string;
    /** 是否进行select分组， 如果是则取数据children进行分组展示 */
    optGroup?: boolean;
    [name: string]: any;
}

interface IProps {
    /** 表单元素默认placeholder */
    placehoder?: string;
    /** 表单元素类型，比如：多选类型select等 */
    // mode?: string;
    [name: string]: any;
}

/**
 *
 * @param {Array} data : select配置数据
 * @param {Object} options : 展示配置项
 */
const buildOption = (data, options: IOptions) => {
    const { showTooltip = false, tooltip = 'remark', tooltipProps = {} } = options;

    const { value, label, disabled } = data;
    const optionTooltip = data[tooltip];

    return (
        <Option key={value} value={value} disabled={disabled}>
            {showTooltip && optionTooltip ? (
                <Tooltip title={optionTooltip} {...tooltipProps}>
                    {label}
                </Tooltip>
            ) : (
                label
            )}
        </Option>
    );
};

/**
 *
 * @param {Array} data : select配置数据(支持两层)
 * @param {Object} options : 展示配置项
 */
const buildOptions = (data, options: IOptions) => {
    const { optGroup = false } = options;

    return data.map((cur) => {
        const { value, label, children } = cur;

        return optGroup && Array.isArray(children) ? (
            <OptGroup key={value} label={label}>
                {children.map((child) => buildOption(child, options))}
            </OptGroup>
        ) : (
            buildOption(cur, options)
        );
    });
};

/**
 *
 * @param {Array} data : 配置数据
 * @param {Object} props : 元素属性配置
 * @param {Object} options : 自定义配置项
 */
export const wrapBuildOptions = (data, props: IProps, options: IOptions) => {
    const { showPleaseSel = true, initText = '', pleaseSelValue = '' } = options;
    const { length } = data;
    const isMultiple = ['multiple', 'tags'].includes(props.mode);
    const emptyText = initText || '请选择';

    // 空数据
    if ((!data || !length) && !isMultiple) {
        return (
            <Select placeholder={emptyText} {...props}>
                {showPleaseSel && <Option value={pleaseSelValue}>{emptyText}</Option>}
                {buildOptions(data, options)}
            </Select>
        );
    }

    // 可搜索处理
    if (props.showSearch !== false) {
        props = {
            optionFilterProp: 'children',
            showSearch: true,
            filterOption: (input, option) => {
                // 由于现在存在：select中带有tooltip，导致option.props.children可能是object形式
                try {
                    const { children } = option.props;
                    const val = input.toLowerCase();
                    const filter = (data) => data.toLowerCase().indexOf(val) >= 0;

                    if (typeof children === 'string') {
                        return filter(children);
                    }

                    return filter(children.props.children);
                } catch (e) {
                    return false;
                }
            },
            ...props
        };
    }

    //多选的时候请选择要去掉 不然会报错
    if (isMultiple) {
        return (
            <Select placeholder="多选类型" {...props}>
                {buildOptions(data, options)}
            </Select>
        );
    }

    return (
        <Select placeholder={emptyText} {...props}>
            {showPleaseSel && <Option value={pleaseSelValue}>{emptyText}</Option>}
            {buildOptions(data, options)}
        </Select>
    );
};

const buildSelect = (data = [], props = {}, params) => {
    const array = translateOption(data, params);
    return wrapBuildOptions(array, props, params);
};

export default buildSelect;
