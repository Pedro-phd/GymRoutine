'use client'
import { ListDay, ListExercises } from '@/components'
import { useAppContext } from '@/context/app.context'
import type { ITraining } from '@/domain/model'
import { dateFormater } from '@/helpers'
import { TrainingService } from '@/services/training.service'
import { Card, Empty, Space } from 'antd'
import { useEffect, useMemo, useState } from 'react'

export default function Home() {
	const [data, setData] = useState<ITraining[]>([])
	const [loading, setLoading] = useState(true)
	const service = new TrainingService()

	useEffect(() => {
		service
			.get()
			.then((res) => setData(res))
			.finally(() => setLoading(false))
	}, [])

	const { dateFilter } = useAppContext()

	const filteredData = useMemo(() => {
		if (dateFilter) {
			return data.filter(
				(t) => dateFormater(t.day) === dateFormater(dateFilter),
			)
		}
		return data
	}, [dateFilter, data])

	return (
		<div className='w-full'>
			<Space direction='vertical' size='middle' className='p-4 w-full'>
				{loading && <Card loading />}
				{filteredData.map((t) => (
					<ListDay data={t} key={t.id} />
				))}
				{filteredData.length === 0 && !loading && (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description={<p>Sem treinos!</p>}
					/>
				)}
			</Space>
		</div>
	)
}
