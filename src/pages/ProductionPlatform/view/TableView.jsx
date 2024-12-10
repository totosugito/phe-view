import {useTranslation} from "react-i18next";
import {ColumnHeader, TableData} from "src/components/table/index.js";
import {useMemo} from "react";
import {date_to_string, to_decimal_formatted} from "src/utils/MyUtils.js";
import {CardLayout} from "src/components/base/index.js";

const TableView = ({title, values}) => {
  const {t} = useTranslation();

  const colPrefix = "";
  const reformatHeader = (header) => {
    return header.replace(colPrefix, "").replace(/_/g, " "); // Replace underscores with spaces
  };
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
      accessorKey: "1",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Date"}/>)
      },
      cell: ({cell}) => {
        return <div className="">{date_to_string(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "2",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Actual Oil (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "3",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={reformatHeader("Actual Water (bbl)")}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "4",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={reformatHeader("Actual Gas (mcf)")}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "5",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Potential Oil (bbl)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "6",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={reformatHeader("Potential Water (bbl)")}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "7",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={reformatHeader("Potential Gas (mcf)")}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "8",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={reformatHeader("Total Production Wells")}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "9",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={reformatHeader("Region")}/>)
      },
    },
    {
      accessorKey: "10",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Actual Oil (Weekly Avg)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
    {
      accessorKey: "11",
      enableSorting: true,
      header: ({column}) => {
        return (<ColumnHeader column={column} title={"Actual Gas (Monthly Avg)"}/>)
      },
      cell: ({cell}) => {
        return <div className="text-center">{to_decimal_formatted(cell.getValue())}</div>
      },
    },
  ], []);

  return (
    <CardLayout title={title}>
      <TableData columns={columns} data={values} rowsPerPage={10} showTopToolbar={true} showBottomToolbar={true}/>
    </CardLayout>
  )
}
export default TableView