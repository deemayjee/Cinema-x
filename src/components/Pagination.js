import React from 'react'

const Pagination = ({getNext, getBack, page}) => {


    return (
        <div>
            <div className="button-container">
                {page !== 1 ? <button type="button" className="prev-button" onClick={getBack}>PREV</button> : null}
                <div className="page-number">{page}</div>
                <button type="button" className="next-button" onClick={getNext}>NEXT</button>
            </div>
        </div>
    )
}

export default Pagination
