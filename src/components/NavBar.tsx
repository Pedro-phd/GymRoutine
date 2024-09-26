'use client'
import { Dumbbell02Icon, Logout03Icon } from 'hugeicons-react'
import { DatePicker } from './DatePicker'
import dayjs from 'dayjs'
import { useAppContext } from '@/context/app.context'
import { Button, Tag, Tooltip, Typography } from 'antd'
import { dateFormater } from '@/helpers'
import { NewTraining } from './NewTraining'
import { useRouter } from 'next/navigation'

export function NavBar() {
	const { push } = useRouter()

	const { setDateFilter, dateFilter } = useAppContext()
	const { Text } = Typography
	return (
		<div className='flex flex-col gap-2'>
			<div className='bg-slate-900 py-2 px-6 w-full flex justify-between'>
				<div className='text-white flex gap-2 items-center'>
					<Dumbbell02Icon />
					<p className='text-xl font-bold'>GymRoutine</p>
				</div>
				<div className='flex gap-2'>
					<DatePicker
						onChange={(d: dayjs.Dayjs) => setDateFilter(d.toDate())}
					/>
					<NewTraining />
					<Tooltip title='Sair'>
						<Button
							type='link'
							icon={<Logout03Icon />}
							danger
							onClick={() => push('/auth/logout')}
						/>
					</Tooltip>
				</div>
			</div>
			<div className='px-4 flex gap-2'>
				<Text>Filtros:</Text>
				{dateFilter && (
					<Tag
						closable
						onClose={(e) => {
							e.preventDefault()
							setDateFilter(null)
						}}
						color='blue'
					>
						{dateFormater(dateFilter)}
					</Tag>
				)}
			</div>
		</div>
	)
}
