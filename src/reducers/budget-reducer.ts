import { DraftExpenses } from "../types";
import { Expense } from "../types";

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'hide-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpenses } }

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[]
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: []
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === 'hide-modal') {
        return {
            ...state,
            modal: false
        }
    }

    if (action.type === 'add-expense') {
        return {
            ...state,
            expense: [...state.expenses, action.payload.expense]
        }
    }

    return state
}