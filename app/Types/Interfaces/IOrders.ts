
export type Order = {
	order_number: string,
	quantity: number,
	address: string,
	delivery_date: string,
	delivery_type: string,
	slug: string,
	created_at: string,
	status: string,
	gas_price: string,
	total_amount: string
}

export interface IOrderDetails{
	gas_type_id: number;
	gas_provider: string;
	quantity: number;
	delivery_address: string;
	delivery_date: string;
	delivery_type: string;
	recurring: number;
	frequency: string;
	frequency_number: number;
	start_date: string;
	end_date: string;
	payment_method: string;
	amount: number;
	end_after: number;
}

export interface ApiResonse<T>{
	message: string;
	status: boolean;
	data: T;
	errors?: IOrderError;
}

export interface IOrderBreakdown{
	gas_type: string;
	quantity: number;
	delivery_fee: number
	price_per_kg: number;
	service_charge: number;
	total_price:number;
}

export interface IOrderError{
	gas_type_id?: string[];
	quantity?: string[];
}

  