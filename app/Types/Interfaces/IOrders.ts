
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
	callback_url?: string;
}

export interface ApiResonse<T>{
	message: string;
	status: boolean;
	data: T;
	errors?: ApiErrorResponse;
}

export interface IOrderBreakdown{
	gas_type: string;
	quantity: number;
	delivery_fee: number
	price_per_kg: number;
	service_charge: number;
	total_price:number;
}

type errors = 'email' | 'password' | 'payment_method' | 'address' | 'delivery_date' | 
'delivery_type' | 'recurring' | 'frequency' | 'frequency_number' | 'start_date' | 'end_date' 
| 'amount' | 'end_after' | 'gas_type_id' | 'gas_provider' | 'delivery_address' | 'quantity' 
| 'delivery_fee' | 'price_per_kg' | 'service_charge' | 'total_price' | 'order_number' | 'slug' 
| 'created_at' | 'status' | 'gas_price' | 'total_amount' | 'url' | 'phone_number' | 'name';

export interface ApiErrorResponse {
	message: string;
	errors?: Record<errors, string[]>;
  }

  