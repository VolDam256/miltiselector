import React, { memo } from 'react';
import { IItem } from "./interfaces"
import styled from './indexcss.module.css';

type IDataSelector = {
    index: number
    data: string | IItem
    onUpdata(type: string, data?: string): void
    checked: boolean
}

const DataSelector: React.FC<IDataSelector> = ({ index, data, onUpdata, checked }) => {
    return (
        <label className={styled.DataSelector__Item} key={index}>{typeof (data) === "string" ? data : data.value}
            <input onChange={() => { onUpdata("handleChangeItemsFromCheckBox", (typeof (data) === "string" ? data : data.label)) }} className={styled.DataSelector__Input} type="checkbox" checked={checked}></input>
            <span className={styled.DataSelector__Checkmark}></span>
        </label >)
};

export default memo(DataSelector);