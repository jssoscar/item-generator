/*
 * @Author			jishengsheng
 * @Date			2021-04-13 11:10:25
 * @Version			1.0
 * @Description
 */

import { FormInstance } from 'antd/es/form/Form';
import set from 'lodash.set';

const SEPARATION = '.';

/**
 * getFieldValue方法优化，a.b.c此类id字段保持跟antd3一致
 *
 * @param form : 当前表单对象
 * @param id : 当前表单元素ID
 */
export const getFieldValue = (form: FormInstance, id) => {
    return form.getFieldValue(id);
};

/**
 * getFieldsValue方法优化，处理a.b.c此类id字段
 *
 * @param from : 当前表单对象
 * @param ids : id集合
 */
export const getFieldsValue = (form: FormInstance, ids: string[] | number[] | any[]) => {
    const values = form.getFieldsValue(ids);

    const result = {};

    // 只遍历一层数据
    Object.entries(values).forEach(([key, value]) => {
        if (`${key}`.includes(SEPARATION)) {
            set(result, key, value);
        } else {
            result[key] = value;
        }
    });

    return result;
};

/**
 *
 * setFieldsValue方法优化，处理a.b.c此类id字段
 *
 * @param from : 当前表单对象
 * @param values : 需要设置的value
 */
export const setFieldsValue = (form: FormInstance, values) => {
    form.setFieldsValue(values);
};

/**
 *
 * 重塑表单实例，数据'a.b.c'这类id的数据处理
 *
 * @param form 当前表单对象实例
 *
 * @returns
 */
export const rebuildForm = (form: FormInstance) => {
    return {
        getFieldValue: (id) => getFieldValue(form, id),
        getFieldsValue: (ids?) => getFieldsValue(form, ids),
        setFieldsValue: (values) => setFieldsValue(form, values)
    };
};
