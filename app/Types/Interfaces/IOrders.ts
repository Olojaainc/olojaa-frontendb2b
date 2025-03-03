export type Order = {
	// id: string
	// orderId: string
	// orderDate: string
	// DeliveryDate: string
	// quantity: number
	// gas_price: number
	// total_amount: number
	// status: "pending" | "processing" | "success" | "failed"
	// email: string


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
  