'use client'
import { Dumbbell02Icon } from 'hugeicons-react'
import { DatePicker } from './DatePicker'
import dayjs from 'dayjs'

export function NavBar() {
	return (
		<div className='bg-slate-900 py-2 px-6 w-full flex justify-between'>
			<div className='text-white flex gap-2 items-center'>
				<Dumbbell02Icon />
				<p className='text-xl font-bold'>GymRoutine</p>
			</div>
			<DatePicker onChange={(d: dayjs.Dayjs) => console.log(d.toDate())} />
		</div>
	)
}
