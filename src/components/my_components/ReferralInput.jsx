import React from 'react'
import { Select } from 'antd';
import { useState } from 'react';
import axios from 'axios'


const { Option } = Select;
axios.defaults.baseURL = 'http://flip3.engr.oregonstate.edu:9417'



export default function ReferralInput({path, filter, setInputValue}) {
    const [values, setValues] = useState([
    ]);

    function onChange(value) {
        setInputValue(value);
        console.log('onChange: ', value);
    }

    const onSearch = (value) => {
        axios({
            method:'get',
            url:'/keyword/' + path,
            params: {...filter, name_vague_tail : value},
        }).then(
            result => {
                const data = result.data.results 
                console.log(data);
                setValues(data)
            }
        )
    }

    return (
        <Select style={{width:200}}
            showSearch
            placeholder=""
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
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
