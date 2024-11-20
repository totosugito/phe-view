import {useTranslation} from "react-i18next";
import {ColumnHeader, TableData} from "src/components/table/index.jsx";
import {useMemo} from "react";
import {to_decimal_formatted} from "src/utils/MyUtils.js";
import {CardLayout} from "src/components/base/index.js";

const TableArea = ({values}) => {
  const {t} = useTranslation();
  const columns = useMemo(() => [
    {
      accessorKey: "#",
      size: 50,
      enableSorting: false,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"#"}/>)
      },
      cell: ({row}) => {
        return <div className="text-center">{row.index + 1}</div>
      },
    },
    {
      accessorKey: "area",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Area"}/>)
      },
    },
    {
      accessorKey: "count",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Well"}/>)
      },
    },
    {
      accessorKey: "summary.3.sum",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Total Actual Oil (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "summary.4.sum",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Total Actual Water (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "summary.5.sum",
      enableSorting: true,
      size: 220,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Total Actual Gas (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
  ], []);

  return (
    <CardLayout title={"Areas Table"}>
      <TableData columns={columns} data={values} rowsPerPage={10} showTopToolbar={true} showBottomToolbar={true}/>
    </CardLayout>
  )
}
export default TableArea