'use client'
import { ListDay, ListExercises } from '@/components'
import type { ITraining } from '@/domain/model'
import { dateFormater } from '@/helpers'
import { TrainingService } from '@/services/training.service'
import {
	Card,
	Collapse,
	Descriptions,
	Divider,
	List,
	Skeleton,
	Space,
	Tag,
	Typography,
} from 'antd'
import { useEffect, useState } from 'react'

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

	return (
		<div className='w-full'>
			<Space direction='vertical' size='middle' className='p-4 w-full'>
				{loading && <Card loading />}
				{data.map((t) => (
					<ListDay data={t} key={t.id} />
				))}
			</Space>
		</div>
	)
}
