/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:51:58 
 * @Version			1.0 
 * @Description	
 */

import { ITEMTYPES } from '../components/const';
import translateOption from './translateOption';

const {
    SELECT,
    TREESELECT,
    CHECKBOX,
    CHECKBOXGROUP,
    RADIO,
    RADIOGROUP,
    RADIOGROUPBUTTON,
    CASCADER
} = ITEMTYPES;

const TYPES = [
    SELECT,
    TREESELECT,
    CHECKBOX,
    CHECKBOXGROUP,
    RADIO,
    RADIOGROUP,
    RADIOGROUPBUTTON,
    CASCADER
];

export default (config: any = {}) => {
    const { data = [], value = '', type = '', params = {} } = config;
    const realType = `${type}`.toLowerCase();

    // 非数组 || 数组长度为0 || 不包含类型，不处理数据，则直接返回原始数据
    if (
        !Array.isArray(data) ||
        !TYPES.includes(realType) ||
        (Array.isArray(data) && data.length === 0)
    ) {
        return value;
    }

    // 抹平数据
    const options = translateOption(data, params);

    const filter = (data, val) => {
        for (let values of data) {
            const { label, value, children } = values;

            // 值相等
            if (val === value) {
                return label;
            }

            // 深层遍历
            if (Array.isArray(children) && children.length) {
                const result = filter(children, val);
                if (result !== undefined) {
                    return result;
                }
            }
        }
    };

    if (Array.isArray(value)) {
        const result = value.map((val, index) => {
            const result = filter(options, val);
            return result === undefined ? value[index] : result;
        });

        return result.join(realType === CASCADER ? ' / ' : ', ');
    } else {
        let result = filter(options, value);
        return result === undefined ? value : result;
    }
};
