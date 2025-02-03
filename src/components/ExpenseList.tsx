import { useBudget } from "../hooks/useBudget"
import { useMemo } from "react"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const { state } = useBudget()

    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <div className=" mt-10">
            {isEmpty ? <p className=" text-gray-600 text-2xl font-bold my-5 ml-4"> No Hay Gastos</p> : (
                <>
                    <p className=" text-gray-600 text-2xl font-bold my-5 ml-4">Listado de Gatos</p>
                    {filteredExpenses.map(expense => (
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense} />
                    ))}
                </>
            )}
        </div>
    )
}
