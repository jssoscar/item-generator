/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:59:16
 * @Version			1.0
 * @Description
 */

import { ITEMTYPES } from './const';
import Moment from 'moment';

const { RANGEPICKER, DATEPICKER, WEEKPICKER, MONTHPICKER, TIMEPICKER, YEARPICKER } = ITEMTYPES;

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
