import {IoIosArrowRoundDown, IoIosArrowRoundUp} from "react-icons/io";
import {TiArrowUnsorted} from "react-icons/ti";
import {twMerge} from "tailwind-merge";

const ColumnHeader = ({column, title, ...props}) => {
    return (
        <div className={twMerge("flex flex-row w-full p-2 items-center cursor-pointer text-sm", props?.className)}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <span className={`whitespace-normal break-words`}>{title}</span>
            {column?.getCanSort() && <>
                {column.getIsSorted() === "desc" ? (
                    <IoIosArrowRoundDown className="ml-2 h-4 w-4"/>
                ) : column.getIsSorted() === "asc" ? (
                    <IoIosArrowRoundUp className="ml-2 h-4 w-4"/>
                ) : (
                    <TiArrowUnsorted className="ml-2 h-4 w-4"/>
                )}
            </>}
        </div>
    )
}
export default ColumnHeader
