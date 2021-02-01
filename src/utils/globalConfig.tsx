/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:52:04 
 * @Version			1.0 
 * @Description	
 */

import { LogicMap } from '../components/ItemProps';
import { extend } from './logic';

export interface Config {
    params?: Object;
    colProps?: Object;
    descriptionsProps?: Object;
    emptyText?: string;
    logic?: LogicMap;
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
    logic: {}
};

let GLOBAL_COUNT = 1;

export const setGlobalConfig = (config: Config = {}) => {
    if (GLOBAL_COUNT > 1) {
        console.warn('全局配置建议只配置一次！');
    }

    GLOBAL_CONFIG = extend(true, {}, GLOBAL_CONFIG, config);
};

export const getGlobalConfig = () => GLOBAL_CONFIG;
