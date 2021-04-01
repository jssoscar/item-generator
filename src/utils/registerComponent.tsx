/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:52:25
 * @Version			1.0
 * @Description
 */

import { forwardRef } from 'react';

let REGISTERTED_COMPONENT = {};

/**
 *
 * 注册自定义组件
 *
 * @param type ： 组件类型
 * @param Comp ： 自定义组件
 * @param isHookComponent : 是否为hooks类型component
 */
export const register = (type: string, Comp, isHookComponent: boolean = false) => {
    if (!type || !Comp) {
        return;
    }

    const realType = `${type}`.toLowerCase();

    // 组件已注册
    if (REGISTERTED_COMPONENT[realType]) {
        console.warn(`类型：${type} 已注册，将覆盖已有组件！`);
    }

    REGISTERTED_COMPONENT[realType] = isHookComponent ? forwardRef(Comp) : Comp;
};

/**
 *
 * 取消自定义组件的注册
 *
 * @param type ： 自定义type
 */
export const unregister = (type) => {
    if (!type) {
        return;
    }

    const realType = `${type}`.toLowerCase();

    delete REGISTERTED_COMPONENT[realType];
};

/**
 * 获取注册组件配置
 */
export const getRegisteredComponent = () => {
    return REGISTERTED_COMPONENT;
};
