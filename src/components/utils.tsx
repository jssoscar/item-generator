/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:59:16
 * @Version			1.0
 * @Description
 */

import { ITEMTYPES } from './const';
import Moment from 'moment';
import get from 'lodash.get';
import { getGlobalConfig } from '../utils/globalConfig';
import { SingleItem } from './ItemProps';

const {
    RANGEPICKER,
    DATEPICKER,
    WEEKPICKER,
    MONTHPICKER,
    TIMEPICKER,
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
export const getInitialValue = (id, data = {}, type?) => {
    data = data || {};
    // 数据为{a: {b: {c : 1}}}，id为：a.b.c场景的处理
    let initialValue = get(data, id);

    if (initialValue == undefined) {
        const getMiddleId = (id) => {
            try {
                const blocks = id.split('.').reverse();
                return blocks[0];
            } catch (e) {
                return id;
            }
        };

        // 数据为{a: 1}，id为：a 场景的处理
        const middleId = getMiddleId(id);
        initialValue = data[middleId];
    }

    if (initialValue == undefined) {
        return {};
    }

    try {
        if ([RANGEPICKER, DATEPICKER, WEEKPICKER, MONTHPICKER, TIMEPICKER].includes(type)) {
            // range picker
            if (type === RANGEPICKER) {
                if (Array.isArray(initialValue)) {
                    initialValue = initialValue.map((val) => (val ? Moment(val) : null));
                } else {
                    initialValue = null;
                }
            } else {
                initialValue = initialValue ? Moment(initialValue) : null;
            }
        }
    } catch (e) {}

    return {
        initialValue
    };
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