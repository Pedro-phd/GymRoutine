'use client'
import { Button, Calendar, Modal, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { Calendar01Icon } from 'hugeicons-react'
import { useState } from 'react'

interface Props {
	onChange: (data: dayjs.Dayjs) => void
}

export const DatePicker = ({ onChange }: Props) => {
	const [modalOpen, setModalOpen] = useState(false)
	return (
		<>
			<Tooltip title='Pesquisar por data'>
				<Button
					type='primary'
					shape='default'
					icon={<Calendar01Icon />}
					onClick={() => setModalOpen(true)}
				/>
			</Tooltip>
			<Modal
				title='Pesquise por data'
				centered
				open={modalOpen}
				onOk={() => setModalOpen(false)}
				onCancel={() => setModalOpen(false)}
			>
				<Calendar fullscreen={false} mode='month' onChange={onChange} />
			</Modal>
		</>
	)
}
