'use client'

import { PropsWithChildren, createContext, useContext, useState } from 'react'

interface IContext {
	dateFilter: Date | null
	setDateFilter: (d: Date | null) => void
}

const defaultValues: IContext = {
	dateFilter: null,
	setDateFilter: (d: Date | null) => {},
}

export const AppContext = createContext({
	...defaultValues,
})

export const useAppContext = () => useContext<IContext>(AppContext)

export const AppContextProvider = ({ children }: PropsWithChildren) => {
	const [dateFilter, setDateFilter] = useState<null | Date>(null)

	return (
		<AppContext.Provider
			value={{
				dateFilter,
				setDateFilter,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
