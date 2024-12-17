import React from "react";

const PageTitle = ({prefix, suffix}) => {
    return (
        <div className={"gap-4 mb-4"}>
            <div className="flex my-page-title gap-[10px]">
                <span className={"whitespace-nowrap"}>{prefix}</span>
                <span className={'text-app-base truncate'}>{suffix}</span>
            </div>
        </div>
    )
}

export default PageTitle