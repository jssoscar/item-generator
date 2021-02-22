/*
 * @Author			jssoscar
 * @Date			2021-01-20 11:15:11
 * @Version			1.0
 * @Description
 */

import React, { useState } from 'react';
import { Button } from 'antd';

export default () => {
    const [count, setCount] = useState(0);
    return <Button onClick={() => setCount(count + 1)} type="primary">{count}</Button>;
};
