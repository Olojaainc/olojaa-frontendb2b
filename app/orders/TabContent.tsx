import { useMemo, useState } from "react";
import { DataTable } from "../components/DataTable";
import { SearchOutlined} from '@ant-design/icons';
import { TbArrowsSort } from "react-icons/tb";
import { Input, Flex } from 'antd';
import { Check} from "lucide-react"
import Filter from "./Filter";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface ITabContent<T extends object> {
	status?: string
	columns: ColumnDef<T>[]
	data: T[] | undefined
	getSortValues?: (item: T) => {
		total_amount: number;
		quantity: number;
		created_at: number;
	};
	onRowClick?: (row: T) => void;
}

export default function TabContent<T extends object>({status, columns, data, getSortValues, onRowClick}: ITabContent<T>) {
	const [sortOption, setSortOption] = useState("low-to-high");

	const dataArray = Array.isArray(data) ? data : [];

	const filteredItems = status
    ? dataArray.filter((item) => (item as T & { status?: string }).status === status)
    : dataArray;

	const sortedItems = useMemo(() => {
        if (!getSortValues) return filteredItems;

        return [...filteredItems].sort((a, b) => {
            const aValues = getSortValues(a);
            const bValues = getSortValues(b);

            switch (sortOption) {
                case "low-to-high":
                    return aValues.total_amount - bValues.total_amount;
                case "high-to-low":
                    return bValues.total_amount - aValues.total_amount;
                case "popularity":
                    return bValues.quantity - aValues.quantity;
                case "latest":
                    return bValues.created_at - aValues.created_at;
                case "newest":
                    return aValues.created_at - bValues.created_at;
                default:
                    return 0;
            }
        });
    }, [filteredItems, sortOption, getSortValues]);

	const sort = [
		{ value: "low-to-high", label: "Price: Low - High" },
		{ value: "high-to-low", label: "Price: High - Low" },
		{ value: "popularity", label: " Sort by Popularity" },
		{ value: "latest", label: "Sort by Latest" },
		{ value: "newest", label: "Sort by Newest" },
	]


	return(
		<Flex gap={'12px'} className="flex-col">
			<Flex gap={'8px'}>
				<Input placeholder="Search" prefix={<SearchOutlined />} className="w-[296px] rounded-xl border-[0.96px] placeholder:text-[#475467] " />
				<Flex gap={'8px'}>
					<Filter />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="flex bg-transparent text-black hover:bg-[var(--gray-75)] border shadow-none rounded-xl py-2 px-[14px] w-[90px] h-9 text-sm font-semibold ">
								<TbArrowsSort className=" w-5 h-5" />
								Sort
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="min-w-[160px] h-[220px] rounded-2xl flex flex-col justify-center" align="end">
							{sort.map((option) => (
								<DropdownMenuItem
									key={option.value}
									onClick={() => setSortOption(option.value)}
									className={`flex items-center mb-[10px] p-2 rounded-[8px] text-xs cursor-pointer hover:bg-gray-200 ${sortOption === option.value ? "bg-gray-200 border rounded-[8px] h-7 font-semibold" : ""}`}
								>
									{option.label}
									{sortOption === option.value && <Check className="w-4 h-4 text-black" />}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</Flex>
			</Flex>
			<DataTable columns={columns} data={sortedItems as T[]} onRowClick={onRowClick} />
		</Flex>
	)
}