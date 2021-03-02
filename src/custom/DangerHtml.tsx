/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:54:58
 * @Version			1.0
 * @Description
 */

import React, { PureComponent } from 'react';

interface Props {
    html: string | null;
    tag?: string;
    [name: string]: any;
}

class DangerHtml extends PureComponent<Props> {
    static defaultProps = {
        tag: 'div'
    };

    render() {
        const { html, tag, ...otherProps } = this.props;

        // 无tag
        if (!tag) {
            return null;
        }

        const tagProps = {
            ...otherProps,
            // 设置HTML
            dangerouslySetInnerHTML: {
                __html: html
            }
        };

        return React.createElement(tag, tagProps);
    }
}

export default DangerHtml;
