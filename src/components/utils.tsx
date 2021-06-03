/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:59:16
 * @Version			1.0
 * @Description
 */

import { ITEMTYPES } from './const';
import Moment from 'moment';

import { getGlobalConfig } from '../utils/globalConfig';
import { SingleItem } from './ItemProps';

const {
    RANGEPICKER,
    DATEPICKER,
    WEEKPICKER,
    MONTHPICKER,
    TIMEPICKER,
    YEARPICKER,
    INPUT_TRIM,
    TEXTAREA_TRIM
} = ITEMTYPES;

/**
 *
 * 获取初始化值
 *
 * @param type : 类型
 * @param value ： 值
 * @returns
 */
export const getInitialValue = (type, value) => {
    if (value === undefined) {
        return value;
    }

    let initialValue: any = value;

    try {
        if (
            [RANGEPICKER, DATEPICKER, WEEKPICKER, MONTHPICKER, TIMEPICKER, YEARPICKER].includes(
                type
            )
        ) {
            // range picker
            if (type === RANGEPICKER) {
                if (Array.isArray(value)) {
                    initialValue = value.map((val) => (val ? Moment(val) : null));
                } else {
                    initialValue = null;
                }
            } else {
                initialValue = value ? Moment(value) : null;
            }
        }
    } catch (e) {}

    return initialValue;
};

/**
 * 获取真实id
 *
 * @param id ： 当前配置id
 * @returns
 */
export const getMiddleId = (id) => {
    if (Array.isArray(id)) {
        return id[id.length - 1];
    }

    try {
        const blocks = `${id}`.split('.').reverse();
        return blocks[0];
    } catch (e) {
        return id;
    }
};

/**
 *
 * 获取解析后的组件props
 *
 * @param item ： 当前item配置
 * @returns
 */
export const getParsedProps = (item: SingleItem) => {
    const { label, type = INPUT_TRIM, props } = item;
    const realType = `${type}`.toLowerCase();

    let parsedProps: any = {
        placeholder: typeof label != 'object' ? label : undefined // label存在为JSX情况，所以JSX不主动设置placeholder
    };

    let { itemProvider = {} } = getGlobalConfig();

    // 获取全局重置antd组件默认属性
    let antCompProps: any = Object.entries(itemProvider).reduce((pre, [key, value]) => {
        pre[`${key}`.toLowerCase()] = value;
        return pre;
    }, {});

    // input.trim/textarea.trim类型： 使用input/textarea类型配置进行组件配置
    if ([INPUT_TRIM, TEXTAREA_TRIM].includes(realType)) {
        const type = realType.split('.')[0];
        antCompProps[realType] = antCompProps[realType] || antCompProps[type];
    } else if (realType === RANGEPICKER) {
        parsedProps.placeholder = ['开始时间', '结束时间'];
    }

    return {
        ...parsedProps,
        ...antCompProps[realType],
        ...props
    };
};
