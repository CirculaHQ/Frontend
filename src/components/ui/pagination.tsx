import React from 'react';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalReports: number;
  reportsPerPage: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  // totalReports,
  // reportsPerPage,
}) => {
  // const startReport = (currentPage - 1) * reportsPerPage + 1;
  // const endReport = Math.min(currentPage * reportsPerPage, totalReports);

  return (
    <div className="flex items-center justify-between mt-4">
      
      <div>
        <p className="text-sm text-secondary font-medium">
          Page <span className="">{currentPage}</span> of{' '}
          <span className="">{totalPages}</span>
        </p>
      </div>

      <div className="flex justify-between">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="relative inline-flex items-center rounded-md border border-[#D5D7DA] bg-white px-2 h-[30px] text-sm font-medium text-secondary shadow-sm mr-2"
          >
            Previous
          </button>
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center rounded-md border border-[#D5D7DA] bg-white px-2 h-[30px] text-sm font-medium text-secondary shadow-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export { TablePagination };
