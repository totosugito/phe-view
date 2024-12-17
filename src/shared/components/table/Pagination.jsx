import {twMerge} from "tailwind-merge";
import {useTranslation} from "react-i18next";

const Pagination = ({table, pageIndex, setPageIndex, rowsPerPage, ...props}) => {
    const {t} = useTranslation();
    const pageCount = table.getPageCount();
    const generatePageNumbers = () => {
        const pageNumbers = [];
        const maxDisplayedPages = 1; // Number of pages to show before and after the current page

        // Show pages before and after the current page index
        for (let i = 0; i < pageCount; i++) {
            pageNumbers.push(i);
        }

        // Add ellipses when necessary
        const filteredPageNumbers = [];

        // set left pagination
        let idxLeftStart = (pageIndex - maxDisplayedPages) < 0 ? 0 : (pageIndex - maxDisplayedPages);
        let addToTheRight = (pageIndex - idxLeftStart) < maxDisplayedPages ? (maxDisplayedPages - (pageIndex - idxLeftStart)) : 0;
        let idxRightPos = pageIndex + maxDisplayedPages + addToTheRight + 1;
        let idxLeftEnd = idxRightPos >= pageCount ? pageCount : idxRightPos;
        if ((idxLeftEnd - idxLeftStart) < (maxDisplayedPages * 2 + 1)) {
            idxLeftStart = (idxLeftEnd - (maxDisplayedPages * 2) - 1) < 0 ? 0 : (idxLeftEnd - (maxDisplayedPages * 2) - 1);
        }

        // --------------------------------------------------------------------------------
        // ADD PAGINATION
        // --------------------------------------------------------------------------------
        // add start pagination
        if (idxLeftStart > 0) {
            filteredPageNumbers.push(pageNumbers[0]);
            if ((idxLeftStart + 1) > 2) {
                filteredPageNumbers.push('...');
            }
        }

        // add center pagination
        for (let j = idxLeftStart; j < idxLeftEnd; j++) {
            filteredPageNumbers.push(pageNumbers[j]);
        }

        // add end pagination
        if (idxLeftEnd < pageCount) {
            if (idxLeftEnd < pageCount) {
                filteredPageNumbers.push('...');
            }
            filteredPageNumbers.push(pageNumbers[pageCount - 1]);
        }
        return filteredPageNumbers;
    };

    const pageNumbers = generatePageNumbers();
    const totalRows = table.getFilteredRowModel().rows.length;
    const startIndex = (rowsPerPage*pageIndex) + 1;
    const endIndex = Math.min(startIndex + rowsPerPage - 1, totalRows);
    return (
        <div className={twMerge("flex flex-row items-center gap-4", props?.styleContainer)}>
            <div className={twMerge("text-sm", props?.styleLabel)}>
                {startIndex} - {endIndex} {t("shared.of")} {totalRows}
            </div>
            <div className="flex items-center">
                {(pageNumbers.length > 1) &&
                    pageNumbers.map((page, index) => (
                        <button key={index}
                                className={twMerge(`btn btn-sm btn-neutral ${pageIndex === page ? '' : 'btn-outline'} mx-1`, props?.styleButton)}
                                onClick={() => {
                                    if (page !== '...') {
                                        setPageIndex(page);
                                    }
                                }} disabled={page === '...'}>
                            {(page !== '...') ? page + 1 : page}
                        </button>
                    ))}
            </div>
        </div>
    )
};
export default Pagination
