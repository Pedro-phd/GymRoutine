'use client'

import { ITraining } from '@/domain/model'
import { TrainingService } from '@/services/training.service'
import { message } from 'antd'
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

interface IContext {
	dateFilter: Date | null
	setDateFilter: (d: Date | null) => void
	data: ITraining[]
	loading: boolean
	fetchData: () => void
}

const defaultValues: IContext = {
	dateFilter: null,
	setDateFilter: (d: Date | null) => {},
	data: [],
	loading: true,
	fetchData: () => {},
}

export const AppContext = createContext({
	...defaultValues,
})

export const useAppContext = () => useContext<IContext>(AppContext)

export const AppContextProvider = ({ children }: PropsWithChildren) => {
	const [dateFilter, setDateFilter] = useState<null | Date>(null)
	const [data, setData] = useState<ITraining[]>([])
	const [loading, setLoading] = useState(true)
	const service = new TrainingService()
	const [messageApi, contextHolder] = message.useMessage()

	const fetchData = async () => {
		try {
			messageApi.open({
				type: 'loading',
				content: 'Atualizando informações..',
				duration: 0,
			})
			const res = await service.get()
			setData(res)
			setLoading(false)
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Erro ao atualizar informações',
				duration: 0,
			})
		} finally {
			messageApi.destroy()
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<AppContext.Provider
			value={{
				dateFilter,
				setDateFilter,
				data,
				fetchData,
				loading,
			}}
		>
			{contextHolder}
			{children}
		</AppContext.Provider>
	)
}
