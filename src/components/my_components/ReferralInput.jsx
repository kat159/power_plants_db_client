import React from 'react'
import { Select } from 'antd';
import { useState } from 'react';
import axios from 'axios'


const { Option } = Select;
axios.defaults.baseURL = 'http://flip3.engr.oregonstate.edu:9417'



export default function ReferralInput({}) {
    const [values, setValues] = useState([
    ]);

    function onChange(value) {
        axios({
            method:'get',
            url:'/keyword/plants'
        })
    }

    return (
        <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {values.map(value => {
                return <Option key={value} value={value}>{value}</Option>
            })}
        </Select>
    )
}
