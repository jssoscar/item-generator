/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:58:58
 * @Version			1.0
 * @Description
 */

import React from 'react';
import ItemProps from './components/ItemProps';
import EditableItem from './components/EditableItem';
import { isView } from './components/const';
import ViewItem from './components/ViewItem';
import { extend } from './utils/logic';

export default (props: ItemProps) => {
    const {
        options = {
            colable: false,
            status: 1,
            config: []
        },
        form
    } = props;
    const { config = [], status = 1 } = options;

    // 异常配置兜底
    if (!Array.isArray(config)) {
        console.error('配置数据类型必须为数组类型！');
        return null;
    }

    let middleConfig = extend(true, [], config);

    // 查看页面，使用查看组件
    if (isView(status)) {
        return (
            <ViewItem
                options={{
                    ...options,
                    config: middleConfig.filter((data) => data.show !== false)
                }}
            />
        );
    }

    return middleConfig.map((data, index) => (
        <EditableItem
            {...props}
            data={data}
            key={Array.isArray(data.item.id) ? index : data.item.id || index}
        />
    ));
};

/** 全局配置 */
export { setGlobalConfig } from './utils/globalConfig';

/** 注册组件 */
export { register, unregister } from './utils/registerComponent';
