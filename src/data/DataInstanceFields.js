import { addColorsToArray } from 'utils/ColorUtils';

export function getInstanceFields(type) {
    const fields = [
        {
            static: true,
            id: 'id',
            title: 'ID',
            type: 'text',
            editable: false,
            visible: true
        },
        {
            static: true,
            id: 'creationDate',
            title: 'Creation date',
            type: 'dateTime',
            editable: false,
            visible: false
        },
        {
            static: true,
            id: 'updateDate',
            title: 'Update date',
            type: 'dateTime',
            editable: false,
            visible: false
        },
        {
            static: true,
            id: 'title',
            title: 'Title',
            type: 'text',
            editable: true
        },
        {
            static: true,
            id: 'color',
            title: 'Color',
            type: 'color',
            editable: true
        },
        {
            static: true,
            id: 'type',
            title: 'Type',
            type: 'text',
            editable: true
        }
    ];

    switch (type) {
        case 'direct':
            fields.push(
                {
                    static: true,
                    id: 'host',
                    title: 'Host',
                    type: 'text',
                    editable: true
                },
                {
                    static: true,
                    id: 'port',
                    title: 'Port',
                    type: 'number',
                    editable: true
                },
                {
                    static: true,
                    id: 'password',
                    title: 'Password',
                    type: 'password',
                    editable: true
                }
            );
            break;
        case 'proxy':
            fields.push(
                {
                    static: true,
                    id: 'secret',
                    title: 'Secret',
                    type: 'password',
                    editable: true
                }
            );
            break;
        default:
            break;
    }

    return addColorsToArray(fields);
}