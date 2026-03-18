import { IDispute } from "../Types/Interfaces/ITransactions";

export const disputeConstant: IDispute[] = [
    {
        id: 1,
        dispute_type_id: "1",
        description: "Payment was sent but gas provider claims they didn't receive it. Transaction reference: REF-OLJ-2026-78901",
        attachments: ["payment_receipt.pdf", "bank_statement.pdf"],
        status: "pending",
        updated_at: "2026-03-17T10:30:00Z",
        created_at: "2026-03-17T10:30:00Z"
    },
    {
        id: 2,
        dispute_type_id: "2",
        description: "Accidentally sent payment to wrong account number. Need to reverse transaction REF-OLJ-2026-78905",
        attachments: ["transaction_proof.jpg"],
        status: "investigating",
        updated_at: "2026-03-16T14:20:00Z",
        created_at: "2026-03-16T14:20:00Z"
    },
    {
        id: 3,
        dispute_type_id: "3",
        description: "Transaction has been processing for over 24 hours. Reference: REF-OLJ-2026-78906",
        attachments: ["screenshot.png"],
        status: "resolved",
        updated_at: "2026-03-15T09:45:00Z",
        created_at: "2026-03-15T09:45:00Z"
    },
    {
        id: 4,
        dispute_type_id: "1",
        description: "Paid for 300kg LPG but provider says no payment received. Have bank confirmation.",
        attachments: ["bank_confirmation.pdf", "order_details.pdf"],
        status: "pending",
        updated_at: "2026-03-14T16:15:00Z",
        created_at: "2026-03-14T16:15:00Z"
    },
    {
        id: 5,
        dispute_type_id: "3",
        description: "Payment stuck in processing for 48 hours. Customer needs urgent gas delivery.",
        attachments: ["payment_screenshot.png"],
        status: "escalated",
        updated_at: "2026-03-13T11:30:00Z",
        created_at: "2026-03-13T11:30:00Z"
    },
    {
        id: 6,
        dispute_type_id: "2",
        description: "Wrong account details used during payment. Need immediate reversal and correct routing.",
        attachments: ["wrong_account_proof.jpg", "correct_account_details.pdf"],
        status: "resolved",
        updated_at: "2026-03-12T13:45:00Z",
        created_at: "2026-03-12T13:45:00Z"
    }
];
