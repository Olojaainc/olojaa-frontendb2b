export interface ITransactionMeta {
    amount: number;
    end_date: string;
    quantity: number;
    frequency: string;
    recurring: number;
    start_date: string;
    description: string;
    gas_type_id: number;
    order_number: string;
    delivery_date: string;
    delivery_type: string;
    payment_method: string;
    delivery_address: string;
    frequency_number: number;
  }
  
  export interface ITransaction {
    slug: string;
    reference: string;
    amount: string;
    status: string;
    created_at: string;
    payment_method: string;
    description: string;
    meta: ITransactionMeta;
  }

  export interface ITransactionBreakdown{
    pendingTransactions: number;
    successfulTransactions: number
  }

  export interface IDisputeTypes {
    id: number;
    name: string;
    description: string;
  }

  export interface IDispute {
    dispute_type_id: string;
    description: string;
    attachments: string[];
    status: string;
    updated_at: string;
    created_at: string;
    id: number;
}

  export interface IDisputePayload{
    attachments: File[];
    description: string;
    dispute_type_id: number
  }