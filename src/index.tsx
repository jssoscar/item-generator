/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:58:58 
 * @Version			1.0 
 * @Description	
 */

import React, { PureComponent } from 'react';
import ItemProps from './components/ItemProps';
import EditableItem from './components/EditableItem';
import { isView } from './components/const';
import ViewItem from './components/ViewItem';
import { transformConfig, extend } from './utils/logic';

class ItemGenerator extends PureComponent<ItemProps> {
    static defaultProps = {
        options: {
            colable: false,
            status: 1,
            config: []
        }
    };

    render() {
        const { props } = this;
        const { options, form } = props;
        const { config = [], status = 1, logic = {} } = options;

        // 异常配置兜底
        if (!Array.isArray(config)) {
            return null;
        }

        const viewStatus = isView(status);
        let middleConfig = extend(true, [], config);

        // 编辑态： 处理级联逻辑
        if (!viewStatus) {
            middleConfig = transformConfig(form, middleConfig, logic);
        }

        const showItems = middleConfig.filter((data) => data.show !== false);

        // 查看页面，使用查看组件
        if (isView(status)) {
            return (
                <ViewItem
                    options={{
                        ...options,
                        config: showItems
                    }}
                    form={form}
                />
            );
        }

        return showItems.map((data, index) => (
            <EditableItem {...this.props} form={form} data={data} key={data.item.id || index} />
        ));
    }
}

export default ItemGenerator;

/** 全局配置 */
export { setGlobalConfig } from './utils/globalConfig';

/** 注册组件 */
export { register, unregister } from './utils/registerComponent';
