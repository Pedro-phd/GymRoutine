'use client'
import { ITrainingCreate } from '@/domain/model'
import { Tooltip, Button, Drawer, Input, Form } from 'antd'
import { Add01Icon } from 'hugeicons-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker } from './DatePicker'
import { FormItem } from 'react-hook-form-antd'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
	name: z
		.string({ required_error: 'É obrigatório um nome para o treino' })
		.min(1),
	description: z.string().optional(),
	day: z.date({ required_error: 'É obrigatório uma data' }),
})

export const NewTraining = () => {
	const [open, setOpen] = useState(false)
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ITrainingCreate>({
		defaultValues: {
			day: new Date(),
		},
		resolver: zodResolver(schema),
	})

	const submit = (data: ITrainingCreate) => {
		console.log(data)
	}

	return (
		<>
			<Tooltip title='Novo Treino'>
				<Button
					type='link'
					shape='default'
					icon={<Add01Icon />}
					onClick={() => setOpen(true)}
				/>
			</Tooltip>
			<Drawer
				title='Novo treino'
				placement='bottom'
				closable={true}
				onClose={() => setOpen(false)}
				open={open}
			>
				<Form
					onFinish={handleSubmit((data) => {
						console.log(data)
					})}
				>
					<FormItem
						control={control}
						name='name'
						label='Nome do treino'
						required
						status={errors.name?.message && 'error'}
					>
						<Input placeholder='Nome do treino' />
					</FormItem>
					<FormItem
						control={control}
						name='description'
						label='Descrição do treino'
					>
						<Input.TextArea />
					</FormItem>
					<Controller
						control={control}
						name='day'
						render={({ field }) => {
							return (
								<DatePicker
									onChange={field.onChange}
									defaultValue={field.value}
								/>
							)
						}}
					/>
					<Form.Item>
						<Button type='primary' htmlType='submit'>
							<Add01Icon />
							Novo Treino
						</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	)
}
