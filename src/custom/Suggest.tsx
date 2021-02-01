/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:51:37 
 * @Version			1.0 
 * @Description	
 */

import React, { PureComponent } from 'react';
import { Select, Spin } from 'antd';
import translateOption from '../utils/translateOption';

const { Option } = Select;

interface Props {
    params: any;
    [name: string]: any;
}

const throttle = (fn, wait = 100) => {
    let timer;

    return (...args) => {
        const context = this;
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, wait);
        }
    };
};

class Suggest extends PureComponent<Props> {
    constructor(props) {
        super(props);
        this.search = throttle(this.search.bind(this));
    }

    state = {
        loading: false,
        data: []
    };

    lastFetchId = 0;

    search = (keyWord) => {
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({
            data: [],
            loading: true
        });

        const { params = {} } = this.props;

        const val = keyWord.trim();
        if (!val) {
            this.setState({
                data: [],
                loading: false
            });
            return;
        }

        try {
            params.onSearch(val).then(
                (data) => {
                    if (fetchId !== this.lastFetchId) {
                        return;
                    }
                    this.setState({
                        data: Array.isArray(data) ? translateOption(data, params) : [],
                        loading: false
                    });
                },
                () => {
                    this.setState({
                        data: [],
                        loading: false
                    });
                }
            );
        } catch (e) {
            this.setState({
                data: [],
                loading: false
            });
        }
    };

    render() {
        const { loading, data = [] } = this.state;
        return (
            <Select
                showSearch
                placeholder="输入搜索"
                allowClear
                notFoundContent={loading ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={(val) => this.search(val)}
                showArrow={false}
                {...this.props}
            >
                {data.map((cur: any) => (
                    <Option key={cur.value} value={cur.value}>
                        {cur.label}
                    </Option>
                ))}
            </Select>
        );
    }
}

export default Suggest;
