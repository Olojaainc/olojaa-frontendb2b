export default function CreditLine(){
    return(
        <div className="flex flex-col w-[776px] h-[458px] mt-4 mb-6 px-3 rounded-2xl bg-white">
            <p className="text-sm text-[var(--gray-900)] mt-4 mb-3 font-semibold">Credit Line Usage</p>
            <hr />
            <div className="flex w-full justify-between">
                <div className="flex w-[174px] mt-3 justify-between">
                    <div className="flex flex-col">
                        <p className="text-xs text-[var(--gray-600)]">Available Credit</p>
                        <p className="text-lg text-[var(--gray-900)]" >0KG</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs text-[var(--gray-600)]">Used Credit</p>
                        <p className="text-lg text-[var(--gray-900)]">0KG</p>
                    </div>
                </div>
                
                <div className="flex  mt-3 w-[350px] justify-between">
                    <button className="border rounded-xl font-semibold text-sm w-[170px] h-[36px]">Reactivate Credit Line</button>
                    <button className="border rounded-xl font-semibold text-sm w-[170px] h-[36px]">Extend Credit Line</button>
                </div>
            </div>
        </div>
    )
}