import { useState } from "react"
import type { DraftExpenses, Value } from "../types"
import { ChangeEvent } from "react"

import { categories } from "../data/categories"
import 'react-date-picker/dist/DatePicker.css'
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import ErrorMensaje from "./ErrorMensaje"
import { useBudget } from "../hooks/useBudget"


export default function ExpenseForm() {

    const { dispatch } = useBudget()

    const [expense, setExpense] = useState<DraftExpenses>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(expense)) {
            setError('Todos los campos son obligatorios')
            return
        }

        dispatch({ type: 'add-expense', payload: { expense } })
    }
}

return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend
            className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500"
        >Nuevo Gasto</legend>

        {error && <ErrorMensaje>{error}</ErrorMensaje>}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName"
                className="text-xl"
            >Nombre Gasto:</label>

            <input type="text"
                id="expenseName"
                placeholder="Añande el nombre del gasto"
                className="p-2 border border-gray-300 rounded-lg"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount"
                className="text-xl"
            >Cantidad Gasto:</label>

            <input type="number"
                id="amount"
                placeholder="Añande la cantidad del gasto Ej.300"
                className="p-2 border border-gray-300 rounded-lg"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category"
                className="text-xl"
            >Categoria:</label>

            <select
                id="category"
                className="p-2 border border-gray-300 rounded-lg"
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value=""> -- Selecione -- </option>
                {categories.map(category => (
                    <option
                        value={category.id}
                        key={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="date"
                className="text-xl"
            >Fecha Gasto:</label>

            <DatePicker
                className="p-2 border border-gray-300 rounded-lg"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>


        <input type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={'Registrar Gasto'}
        />
    </form>
)
}
