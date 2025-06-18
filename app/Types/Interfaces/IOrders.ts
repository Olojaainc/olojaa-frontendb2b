
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
	total_amount: string,
	order_history?: number;
	credit_line_used?: number;
	payment_status?: string;
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
	date_picked: number
}

export interface ApiResonse<T>{
	message: string;
	status: boolean;
	data: T;
	errors?: ApiErrorResponse;
}

export interface PaginationLink {
	url: string | null;
	label: string;
	active: boolean;
  }
  
  export interface PaginationMeta {
	current_page: number;
	from: number;
	last_page: number;
	links: PaginationLink[];
	path: string;
	per_page: number;
	to: number;
	total: number;
  }
  
  export interface PaginationLinks {
	first: string;
	last: string;
	prev: string | null;
	next: string | null;
  }
  export interface ApiResponse<T extends object> {
	data: T;
	links: PaginationLinks;
	meta: PaginationMeta;
	status: boolean;
	message: string;
  }

export interface IOrderBreakdown{
	gas_type: string;
	quantity: number;
	delivery_fee: number
	price_per_kg: number;
	service_charge: number;
	total_price:number;
}

export interface IOrderManagement{
	pendingOrders: number;
	rejectedOrders: number;
	completedOrders: number;
	recurringOrders: number;
	totalOrders: number;
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

  