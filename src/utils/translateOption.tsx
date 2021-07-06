/*
 * @Author			jssoscar
 * @Date			2021-02-01 11:52:32 
 * @Version			1.0 
 * @Description	
 */

const SIMPLETYPES = ['String', 'Number'];

interface Options {
    label?: string;
    value?: string;
    shouldOptionDisabled?: (val: any, config: any, data: any[]) => boolean;
    [name: string]: any;
}

const translate = (data: any, options?: Options) => {
    if (!Array.isArray(data)) {
        return [];
    }

    const {
        value = 'id',
        label = 'value',
        title = 'title',
        shouldOptionDisabled,
        children = 'children'
    } = options || {};

    return data.map((cur) => {
        const isSimple = SIMPLETYPES.includes(Object.prototype.toString.call(cur).slice(8, -1));

        if (isSimple) {
            let result: object | any = {
                label: cur,
                value: cur,
                title: cur
            };
            if (shouldOptionDisabled) {
                result.disabled = shouldOptionDisabled(cur, cur, data) === true;
            }
            return result;
        }

        let result: object | any = {
            label: cur[label],
            value: cur[value],
            title: cur[title] || cur[label]
        };

        if (shouldOptionDisabled) {
            result.disabled = shouldOptionDisabled(cur[value], cur, data) === true;
        }

        if (cur[children] && Array.isArray(cur[children])) {
            result.children = translate(cur[children], options);
        }

        return {
            ...cur,
            ...result
        };
    });
};

export default translate;
