/*
 * @Author			jssoscar
 * @Date			2021-02-01 16:41:43
 * @Version			1.0
 * @Description
 */

import React, { PureComponent } from 'react';
import ItemProps from './components/ItemProps';

class ItemGenerator extends React.PureComponent<ItemProps> {
    render(): React.ReactNode;
}

export default ItemGenerator;

/** 设置全局配置 */
export { setGlobalConfig } from './utils/globalConfig';

/** 注册组件 */
export { register, unregister } from './utils/registerComponent';
