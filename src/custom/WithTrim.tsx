/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:53:45
 * @Version			1.0
 * @Description
 */

import React, { PureComponent } from 'react';
import { InputProps } from 'antd/es/input/Input';
import { TextAreaProps } from 'antd/es/input/TextArea';

const withTrim = (Item) => {
    class WithTrim extends PureComponent<InputProps | TextAreaProps> {
        blurHandler = (e) => {
            const preValue = e.target.value;
            const nextValue = preValue.trim();
            e.target.value = nextValue;
            const emptyFunction = () => {};
            const { onBlur = emptyFunction, onChange = emptyFunction } = this.props;

            // 触发blur事件
            onBlur(e);

            // 两次输入值不相同时，则触发onChange事件
            `${preValue}` !== `${nextValue}` && onChange(e);
        };

        render() {
            return <Item {...this.props} onBlur={this.blurHandler} />;
        }
    }

    return WithTrim;
};

export default withTrim;
