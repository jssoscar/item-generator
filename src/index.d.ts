/*
 * @Author			jssoscar
 * @Date			2021-02-01 16:41:43
 * @Version			1.0
 * @Description
 */

import React from 'react';
import ItemProps from './components/ItemProps';

/** 设置全局配置 */
export { setGlobalConfig } from './utils/globalConfig';

/** 注册组件 */
export { register, unregister } from './utils/registerComponent';

/** 重塑表单对象 */
export { rebuildForm } from './utils/formAPI';

/** 导出ItemProps */
export { ItemProps, Options, Config, SingleItem } from './components/ItemProps';

/** 导出ItemGenerator */
type ItemGenerator = (props: ItemProps) => React.ReactNode;

export default ItemGenerator;
