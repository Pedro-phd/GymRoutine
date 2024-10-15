'use client'
import { ListDay } from '@/components'
import { useAppContext } from '@/context/app.context'
import { dateFormater } from '@/helpers'
import { createClient } from '@/infra/clientsideSupabase'
import { Card, Empty, Space, message } from 'antd'
import { useMemo } from 'react'

export default function Home() {
	const supabase = createClient()
	supabase.auth.getSession().then((res) => console.log('session', res))

	const { dateFilter, data, loading } = useAppContext()

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
				{/* {loading && <Card loading />} //loading */}
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
