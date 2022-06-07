import React, {useState} from "react";
import classes from "./Paginator.module.scss";
import cn from "classnames"
import {Icon} from "@iconify/react/dist/iconify";

const {pagContainer, page, pageBtn, pageNumbers, active, pageDots} = classes

const Paginator = ({totalItemsCount, usersOnPage, pageSelected, onPageNumber, portionSize = 10}) => {

    const portionCount = Math.ceil(totalItemsCount / usersOnPage)
    const [portionNumber, setPortionNumber] = useState(1)
    let firstPortionItem = (portionNumber - 1) * portionSize + 1
    const lastPortionItem = portionSize * portionNumber

    let pagArray = []
    for (let i = 1; i <= portionCount; i++)
        pagArray.push(i)

    const prevPages = () => {
        setPortionNumber(portionNumber - 1)
    }
    const nextPages = () => {
        setPortionNumber(portionNumber + 1)
    }

    const lastPage = totalItemsCount - 1000

    return (
        <div className={pagContainer}>
            <ul className={page}>
                {portionNumber > 1 && <li onClick={prevPages} className={pageBtn}>
                    <Icon icon="ic:round-navigate-before"/>
                </li>}
                {pagArray
                    .filter(p => p >= firstPortionItem && p <= lastPortionItem)
                    .map(p => <li key={p} onClick={(e) => onPageNumber(p)}
                                  className={cn(pageNumbers, {[active]: pageSelected === p})}
                    >{p}</li>)}
                <li className={pageDots}>...</li>
                <li className={pageNumbers} onClick={(e) => onPageNumber(lastPage)}>last</li>
                {/*classNames('foo', { bar: true }); // => 'foo bar'*/}
                {portionCount > portionNumber && <li onClick={nextPages} className={pageBtn}>
                    <Icon icon="ic:round-navigate-next"/>
                </li>}
            </ul>
        </div>
    )
}

export default Paginator