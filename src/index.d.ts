/*
 * @Author			jssoscar
 * @Date			2021-02-01 16:41:43
 * @Version			1.0
 * @Description
 */

import React, { PureComponent } from 'react';
import ItemProps from './src/components/ItemProps';

/** 设置全局配置 */
export { setGlobalConfig } from './src/utils/globalConfig';

/** 注册组件 */
export { register, unregister } from './src/utils/registerComponent';

/** 导出ItemProps */
export { ItemProps, Options, Config, SingleItem } from './src/components/ItemProps';

class ItemGenerator extends PureComponent<ItemProps> {
    render(): React.ReactNode;
}

export default ItemGenerator;
