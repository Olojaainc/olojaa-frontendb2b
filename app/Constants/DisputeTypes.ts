import { IDisputeTypes } from "../Types/Interfaces/ITransactions";

export const DisputeTypesConstant: IDisputeTypes[] = [
    {
        "id": 1,
        "name": "Money not received",
        "description": "Gas provider didn't get the money"
    },
    {
        "id": 2,
        "name": "Wrong Account",
        "description": "Sent to wrong account number"
    },
    {
        "id": 3,
        "name": "Slow Transaction",
        "description": "Transaction processing for too long"
    }
]