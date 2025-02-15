import { useState } from "react";

interface Props {
    limit?: number;
    search?: string;
    offset?: number;
    [key: string]: any; // Accepts additional params dynamically
}

export const useTableFilters = ({ limit = 20, search = '', offset = 0, ...rest }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState<any>({ limit, search, offset, ...rest });

    const handleSearchChange = (search: string) => {
        setParams({ ...params, search, offset: 0 });
        setCurrentPage(1);
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        setParams({ ...params, offset: page - 1 });
    };

    return { 
        params, 
        currentPage, 
        handleSearchChange, 
        onPageChange,
        setParams,
        setCurrentPage
    }
}