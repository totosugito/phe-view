import {IoIosArrowRoundDown, IoIosArrowRoundUp} from "react-icons/io";
import {TiArrowUnsorted} from "react-icons/ti";

const ColumnHeader = ({column, title, className="text-base-100", styleTitle="text-xs"}) => {
    return (
        <div className={`flex flex-row w-full p-2 items-center cursor-pointer ${className}`}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <span className={`font-bold whitespace-normal break-words ${styleTitle}`}>{title}</span>
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
