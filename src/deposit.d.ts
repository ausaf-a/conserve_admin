interface IDeposit { 
    image: string, 
    items: IDepositItems, 
    status: 'pending' | 'approved' | 'denied', 
    submitted: Object, 
    total: number, 
    userId: string,
    id: string, 
}