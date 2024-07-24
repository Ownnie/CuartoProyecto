import { ReactNode } from "react"

type ErrorMensajeProps = {
    children: ReactNode
}

export default function ErrorMensaje({ children }: ErrorMensajeProps) {
    return (
        <p className=" bg-red-600 text-white font-bold text-sm text-center">{children}</p>
    )
} 
