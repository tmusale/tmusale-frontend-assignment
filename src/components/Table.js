import React, { useEffect, useState } from "react";
import "./Table.css";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
    const data = await response.json();
    setTableData(data);
  };

  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr>
            <th>S.No.</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>

          {tableData.slice(indexOfFirstRow, indexOfLastRow).map((data) => {
            return (
              <tr key={data["s.no"]}>
                <td>{data["s.no"]}</td>
                <td>{data["percentage.funded"]}</td>
                <td>{data["amt.pledged"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (v, k) => k + 1)
          .slice(
            Math.max(0, currentPage - 3),
            Math.min(totalPages, currentPage + 2)
          )
          .map((page, index) => {
            return (
              <button
                key={index}
                className={
                  currentPage === page ? "selected-button" : "paginate-button"
                }
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}
        <button
          className="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
