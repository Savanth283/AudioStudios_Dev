import React from 'react'

const LinksGroup = ({ open, toggle,title,desc }) => {
  return (
    <>
        <div className="border border-2 border-_green py-[4px]">
            <div className="flex jusity-between" toggle={toggle}>
                <p>{title}</p>
            </div>
        </div>
    </>
  )
}

export default LinksGroup