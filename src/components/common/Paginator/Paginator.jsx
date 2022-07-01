import React, {useEffect, useState} from "react";
import classes from "./Paginator.module.scss";
import cn from "classnames"
import {Icon} from "@iconify/react/dist/iconify";

const {page, pageBtn, pageNumbers, active, pageDots} = classes

const Paginator = ({totalItemsCount, usersOnPage, pageSelected, onPageNumber, portionSize = 10}) => {

    const portionCount = Math.ceil(totalItemsCount / usersOnPage)
    const [portionNumber, setPortionNumber] = useState(1)
    // const [firstPortionItem, setFirstPortionItem] = useState((portionNumber - 1) * portionSize + 1)

    console.log("RERENDER");
    let firstPortionItem = (portionNumber - 1) * portionSize + 1
    console.log(firstPortionItem);

    useEffect(() => {
        console.log('firstPortionItem')
        // onPageNumber(firstPortionItem)
    }, [firstPortionItem])

    const lastPortionItem = portionSize * portionNumber

    let pagArray = []
    for (let i = 1; i <= portionCount; i++)
        pagArray.push(i)
// debugger
    const prevPages = () => {
        setPortionNumber(portionNumber - 1)
    }

    const nextPages = () => {
        setPortionNumber(portionNumber + 1)
    }


    return (
        <ul className={page}>
            {portionNumber > 1 &&
                <li onClick={prevPages} className={pageBtn}><Icon icon="ic:round-navigate-before"/></li>}


            {pagArray
                .filter(p => p >= firstPortionItem && p <= lastPortionItem)
                .map(p => <li key={p} onClick={(e) => onPageNumber(p)}
                              className={cn(pageNumbers, {[active]: pageSelected === p})}
                >{p}</li>)}

            <li className={pageDots}>...</li>
            <li  className={cn(pageNumbers, {[active]: pageSelected === portionCount})}
                onClick={(e) => onPageNumber(portionCount)}>{portionCount}</li>
            {/*classNames('foo', { bar: true }); // => 'foo bar'*/}


            {portionCount > portionNumber &&
                <li onClick={nextPages} className={pageBtn}><Icon icon="ic:round-navigate-next"/></li>}
        </ul>
    )
}

export default React.memo(Paginator)