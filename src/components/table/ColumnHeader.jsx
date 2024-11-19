import {IoIosArrowRoundDown, IoIosArrowRoundUp} from "react-icons/io";
import {TiArrowUnsorted} from "react-icons/ti";

const ColumnHeader = ({column, title, className="text-base-100"}) => {
    return (
        <button className={`flex flex-row h-full w-full p-2 items-center ${className} h-full`}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <span className={"text-base font-bold"}>{title}</span>
            {column?.getCanSort() && <>
                {column.getIsSorted() === "desc" ? (
                    <IoIosArrowRoundDown className="ml-2 h-4 w-4"/>
                ) : column.getIsSorted() === "asc" ? (
                    <IoIosArrowRoundUp className="ml-2 h-4 w-4"/>
                ) : (
                    <TiArrowUnsorted className="ml-2 h-4 w-4"/>
                )}
            </>}
        </button>
    )
}
export default ColumnHeader