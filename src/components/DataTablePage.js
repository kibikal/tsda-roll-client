import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import CircularProgress from "@mui/material/CircularProgress";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolKitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

function DataTablePage() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  // const { ExportCSVButton } = CSVExport;
  const MyExportCSV = (props) => {
    const handlClick = () => {
      props.onExport();
    };

    return (
      <div className="download-csv-container">
        <button className="download-csv-btn" onClick={handlClick}>
          Download
        </button>
      </div>
    );
  };

  const columns = [
    {
      dataField: "fullName",
      text: "Full Name",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "staffID", text: "Staff ID", filter: textFilter() },
    { dataField: "job", text: "Job/Grade", filter:textFilter() },
    {
      dataField: "dateOfBirth",
      text: "Date of Birth",
      filter: textFilter(),
    },
    { dataField: "ssnit", text: "SSNIT No.", filter: textFilter() },
    { dataField: "ghCard", text: "Ghana Card No.",filter: textFilter() },
    { dataField: "unit", text: "Management Unit",filter: textFilter() },
    { dataField: "bank", text: "Bank Name", filter: textFilter() },
    { dataField: "accountNumber", text: "Account No.", filter: textFilter() },
    { dataField: "payrollStatus", text: "Payroll Status", filter: textFilter() },
    { dataField: "post", text: "At Post?", filter: textFilter() },
    { dataField: "leaveType", text: "Leave Type", filter: textFilter() }
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  useEffect(() => {
    fetch("http://localhost:4000/registered")
      .then((res) => res.json())
      .then((result) => setStaffList(result))
      .catch((err) => console.log(err))
      .finally((_) => setLoading(false));
  }, []);

  return (
    <div className="table-main">
      {loading ? (
        <div className="table-loader">
          <p>Loading...</p>
          <CircularProgress />
        </div>
      ) : (
        <ToolKitProvider
          bootstrap4
          keyField="_id"
          columns={columns}
          data={staffList}
          exportCSV
        >
          {(props) => (
            <React.Fragment>
              <MyExportCSV {...props.csvProps} />
              <BootstrapTable
                pagination={pagination}
                filter={filterFactory()}
                {...props.baseProps}
              />
            </React.Fragment>
          )}
        </ToolKitProvider>
      )}
    </div>
  );
}

export default DataTablePage;
