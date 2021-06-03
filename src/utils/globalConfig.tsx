/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:52:04
 * @Version			1.0
 * @Description
 */

import { Config as ItemConfig } from '../components/ItemProps';
import { extend } from './logic';

export interface Config {
    /** Select|TreeSelect|Suggest|Checkbox|Radio|Cascader参数配置 */
    params?: Object;
    /** 全局Col属性配置 */
    colProps?: Object;
    /** 查看态元素基础配置 */
    descriptionsProps?: Object;
    /** 查看状态下空值(undefined/null/'')的处理 */
    emptyText?: string;
    /** 元素继承基础配置 */
    extends?: {
        [key: string]: Omit<ItemConfig, 'logic' | 'extend'>;
    };
    /** 全局配置antd组件默认属性 */
    itemProvider?: Object;
    [name: string]: any;
}

let GLOBAL_CONFIG = {
    params: {
        showPleaseSel: true,
        initText: '请选择',
        pleaseSelValue: '',
        label: 'value',
        value: 'id',
        children: 'children'
    },
    colProps: {},
    descriptionsProps: {},
    emptyText: '无',
    extends: {},
    itemProvider: {}
};

let GLOBAL_COUNT = 1;

/**
 * 设置全局配置
 *
 * @param config ： 全局配置
 */
export const setGlobalConfig = (config: Config = {}) => {
    if (GLOBAL_COUNT > 1) {
        console.warn('全局配置建议只配置一次！');
    }

    GLOBAL_CONFIG = extend(true, {}, GLOBAL_CONFIG, config);
};

export const getGlobalConfig = () => GLOBAL_CONFIG;
