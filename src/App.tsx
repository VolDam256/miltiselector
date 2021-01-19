import React, { useState, useCallback, useRef, useEffect } from 'react';
import DateSelectorItem from "./DateSelectorItem";
import { IItem } from "./interfaces"
import styled from './indexcss.module.css';
import { CSSTransition } from 'react-transition-group';
import "./DataSelectorTransition.css"
import "./TriangleTransition.css"

type SelectContentsProps = {
  Items: string[] | IItem[]
}


const App: React.FC<SelectContentsProps> = ({ Items }) => {
  const [SelectedItems, setSelectedItems] = useState<string[]>([]);
  const [DateSelectedIsOpen, setDateSelectedIsOpen] = useState<boolean>(false);

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as HTMLElement)) {
        setDateSelectedIsOpen(false)
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const onUpdata = useCallback((type: string, data?: string) => {
    if (type === 'handleOpenCloseDateSelector') {
      setDateSelectedIsOpen(prev => { return !prev })
    }
    else {
      setSelectedItems(prev => {
        let newSelectedItems = [...prev]
        switch (type) {
          case 'handleChangeItemsFromCheckBox':
            if (newSelectedItems.includes(data as string)) {
              let index = newSelectedItems.indexOf(data as string);
              newSelectedItems.splice(index, 1);
              break
            }
            newSelectedItems = [...prev, data as string];
            break;
          case 'handleChangeItemsFromClose':
            let index = newSelectedItems.indexOf(data as string);
            newSelectedItems.splice(index, 1);
            break
          case 'handleCleanAll':
            newSelectedItems = [];
            break;
        }
        return newSelectedItems
      })
    }
  }, [])

  return (
    <div className={styled.MultiSelector} ref={wrapRef} >
      <div className={styled.MultiSelector__SelectedItems}>
        <ul className={styled.MultiSelector__SelectedItemsList}>
          {SelectedItems.map((item, index) =>
            <li className={styled.MultiSelector__Item} key={index}>
              <span className={styled.MultiSelector__ItemContent} >{item}</span><div className={styled.Close} onClick={() => { onUpdata("handleChangeItemsFromClose", item) }} ></div>
            </li>
          )}
        </ul>
        <div className={styled.MultiSelector__SelectedItemsConcole}>
          <div className={styled.Close} onClick={() => { onUpdata("handleCleanAll") }}></div>
          <div className={styled.VerticalLine}></div>
          <CSSTransition in={DateSelectedIsOpen} timeout={2000} classNames="Triangle">
            <div className={styled.Triangle} onClick={() => { onUpdata("handleOpenCloseDateSelector") }}></div>
          </CSSTransition>
        </div >
      </div >
      <CSSTransition in={DateSelectedIsOpen} timeout={2000} classNames="DataSelector">
        <div className={styled.DataSelector}>
          {(Items as (string | IItem)[]).map((data: string | IItem, index: number) =>
            <DateSelectorItem key={index} index={index} data={data} onUpdata={onUpdata} checked={SelectedItems.includes(typeof (data) === "string" ? data : data.label)}></DateSelectorItem>
          )}
        </div>
      </CSSTransition>
    </div >
  );
}

export default App;
