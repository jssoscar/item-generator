/* eslint-disable */
/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:52:14
 * @Version			1.0
 * @Description
 */

import { Config, LogicMap } from '../components/ItemProps';
import { getGlobalConfig } from './globalConfig';

const hasOwn = Object.prototype.hasOwnProperty;
const toStr = Object.prototype.toString;

const isFunction = (fun) => {
    return toStr.call(fun) === '[object Function]';
};

const isPlainObject = (obj) => {
    if (!obj || toStr.call(obj) !== '[object Object]') {
        return false;
    }

    let hasOwnConstructor = hasOwn.call(obj, 'constructor');
    let hasIsPrototypeOf =
        obj.constructor &&
        obj.constructor.prototype &&
        hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
    // Not own constructor property must be Object
    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
    }

    // Own properties are enumerated firstly, so to speed up, if last one is own,
    // then all properties are own.
    let key;
    for (key in obj) {
        /**/
    }

    return typeof key === 'undefined' || hasOwn.call(obj, key);
};

/**
 * 拷贝函数 : 对原有jquery的extend代码进行改造
 *
 * 如果是{}，则深/浅拷贝
 *
 * 如果是对象中数组，则使用空数组进行目标数据的拷贝（不论用户配置深/浅拷贝）
 *
 * @param args ： 所有参数
 */
export const extend = (...args) => {
    let options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = args[0] || {},
        i = 1,
        length = args.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target;

        // Skip the boolean and the target
        target = args[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }

    // Extend itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = args[i]) != null) {
            // Extend the base object
            for (name in options) {
                copy = options[name];

                // Prevent Object.prototype pollution
                // Prevent never-ending loop
                if (name === '__proto__' || target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    src = target[name];

                    // Ensure proper type for the source value
                    if (copyIsArray && !Array.isArray(src)) {
                        clone = [];
                    } else if (!copyIsArray && !isPlainObject(src)) {
                        clone = {};
                    } else {
                        clone = src;
                    }
                    copyIsArray = false;

                    // Never move original objects, clone them
                    // 原始代码
                    // target[name] = extend(deep, clone, copy);

                    // 合并时候存在数组，比如配置数据、校验规则等  配置数据全量替换
                    target[name] = Array.isArray(copy)
                        ? extend(true, [], copy)
                        : extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

const transformReg = (data: Config) => {
    let {
        item: { options = {} }
    } = data;

    /**
     * 对规则进行匹配
     *
     * 如果出现string类型的正则（一般是服务端下发的string类型），则转化为 RegExp类型
     */
    if (options.rules) {
        try {
            const str2RegExp = (string) => {
                if (typeof string !== 'string') {
                    return string;
                }

                try {
                    let flags;
                    let regex = string;
                    // 获取flags
                    // @ts-ignore
                    regex = regex.replace(/([gimyu]{0,5})$/, ($0, $1) => {
                        flags = $1;
                        return '';
                    });

                    // 有效的字符串正则 ： 去除头尾正则符号
                    if (regex.startsWith('/') && regex.endsWith('/')) {
                        regex = regex.slice(1, regex.length - 1);
                    }

                    return new RegExp(regex, flags && flags.length ? flags : undefined);
                } catch (err) {}
                return string;
            };

            if (Array.isArray(options.rules)) {
                options.rules.forEach((val: any) => {
                    val.pattern && (val.pattern = str2RegExp(val.pattern));
                });
            } else {
                const { rules = {} }: any = options;
                rules.pattern && (rules.pattern = str2RegExp(rules.pattern));
            }
        } catch (e) {}
    }

    return data;
};

/**
 *
 * 转换表单配置
 *
 * @param form ： 当前表单实例对象
 * @param config ：表单配置
 * @param logicMap: 顶层配置级联规则
 */
export const transformConfig = (form: any, config: Config[], logicMap: LogicMap = {}) => {
    return config.map((data) => {
        const { logic = '' } = data;
        // 无级联逻辑，则返回原始数据
        const realLogic = (() => {
            // 数组类型配置
            if (Array.isArray(logic)) {
                return logic;
            }

            // string类型： 获取配置规则
            if (typeof logic === 'string') {
                const globalConfig = getGlobalConfig();
                const realLogicMap = {
                    ...globalConfig.logic,
                    ...logicMap
                };
                const result = realLogicMap[logic];

                // 未配置规则
                if (result == undefined) {
                    return undefined;
                }

                return Array.isArray(result) ? result : [result];
            }

            return [logic];
        })();

        if (!Array.isArray(realLogic)) {
            return transformReg(data);
        }

        // 获取匹配级联规则
        const fitRules = realLogic.filter((data) => {
            const { test } = data;
            try {
                // 执行自定义规则
                if (isFunction(test)) {
                    return test(form) === true;
                } else {
                    // 替换表达式
                    // @ts-ignore
                    const expression = `${test}`.replace(/(\{([^\}]+)})/g, ($1, $2, name) => {
                        /**
                         * 这里会出现，数组类型数据
                         * 所以需要对数组进行string化，防止[1,2,3]此类数据变成 1,2,3字符串
                         */
                        return JSON.stringify(form.getFieldValue(name));
                    });

                    // 执行表达式
                    return eval(expression) === true;
                }
            } catch (e) {
                return false;
            }
        });

        // 未匹配到级联规则
        if (!fitRules.length) {
            return transformReg(data);
        }

        // 从后往前合并 ： 前置规则优先级更高
        const { rule, ...mergedConfig }: Config = [...fitRules].reverse().reduce((prev, next) => {
            prev = extend(true, {}, prev, next);
            return prev;
        }, {} as Config);

        // 合并原始配置与更新后配置
        return transformReg(extend(true, {}, data, mergedConfig));
    });
};
