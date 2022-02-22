import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, DatePicker } from 'antd';
import moment from "moment";
const originData = [];

for (let i = 0; i < 100; i++) {
    originData.push({
        plant_id: i.toString(),
        name: `Edrward ${i}`,
        country: `U.S.`,
        latitude: 32,
        longitude: 42,
        date_of_construction: '2012-04-04',
        address: `London Park no. ${i}`,
    });
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default function EditableDemo() {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.plant_id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            country: '',
            latitude: '',
            longitude: '',
            date_of_construction: '',
            address: '',
            ...record,
        });
        setEditingKey(record.plant_id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (plant_id) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => plant_id === item.plant_id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'country',
            dataIndex: 'country',
            width: '25%',
            editable: true,
        },
        {
            title: 'latitude',
            dataIndex: 'latitude',
            width: '15%',
            editable: true,
        },
        {
            title: 'longitude',
            dataIndex: 'longitude',
            width: '15%',
            editable: true,
        },
        {
            title: 'date_of_construction',
            dataIndex: 'date_of_construction',
            width: '15%',
            editable: true,
        },
        {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.plant_id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'latitude' || col.dataIndex === 'longitude' ? 'number' : col.dataIndex === 'date_of_construction' ? 'date' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                rowKey={record => record.plant_id}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
}
