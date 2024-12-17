import {useTranslation} from "react-i18next";
import {twMerge} from "tailwind-merge";

const RowsPerPage = ({table, rowsPerPage, setRowsPerPage, pageList=[5,10,15,20], props}) => {
    const {t} = useTranslation();
    return (
        <div className={twMerge("flex gap-2 items-center", props?.styleContainer)}>
            <label className={twMerge("text-sm", props?.styleLabel)}>{t("shared.rowsPerPage")}</label>
            <select
                className={twMerge("select select-bordered select-sm", props?.styleSelect)}
                value={rowsPerPage}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    setRowsPerPage(value);
                    table.setPageSize(value); // Update the page size in TanStack Table
                }}
            >
                {pageList.map(size => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default RowsPerPage
