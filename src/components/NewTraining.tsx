'use client'
import { ITrainingCreate } from '@/domain/model'
import { Tooltip, Button, Drawer, Input, Form, DatePicker, message } from 'antd'
import { Add01Icon } from 'hugeicons-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormItem } from 'react-hook-form-antd'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { TrainingService } from '@/services/training.service'
import { useAppContext } from '@/context/app.context'

const schema = z.object({
	name: z
		.string({ required_error: 'É obrigatório um nome para o treino' })
		.min(1),
	description: z.string().optional(),
	day: z.date({ required_error: 'É obrigatório uma data para o treino' }),
})

export const NewTraining = () => {
	dayjs.locale('pt-br')

	const { fetchData } = useAppContext()

	const service = new TrainingService()
	const [messageApi, contextHolder] = message.useMessage()

	const [open, setOpen] = useState(false)
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<ITrainingCreate>({
		defaultValues: {
			day: new Date(),
		},
		resolver: zodResolver(schema),
	})

	const submit = async (data: ITrainingCreate) => {
		try {
			await service.create({ data })
			messageApi.open({
				type: 'success',
				content: 'Treino criado com sucesso!',
			})
			fetchData()
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Erro ao criar treino!',
			})
			console.error(error)
		}
	}

	return (
		<>
			{contextHolder}
			<Tooltip title='Novo Treino'>
				<Button
					type='link'
					shape='default'
					icon={<Add01Icon />}
					onClick={() => setOpen(true)}
					loading={isSubmitting}
				>
					Novo Treino
				</Button>
			</Tooltip>
			<Drawer
				title='Novo treino'
				placement='bottom'
				closable={true}
				onClose={() => setOpen(false)}
				open={open}
				extra={
					<Button
						type='primary'
						htmlType='submit'
						onClick={handleSubmit(submit)}
					>
						Adicionar
					</Button>
				}
			>
				<Form
					onFinish={handleSubmit((data) => {
						console.log(data)
					})}
					className='flex flex-col gap-4'
				>
					<FormItem
						control={control}
						name='name'
						label='Nome do treino'
						required
						status={errors.name?.message && 'error'}
						layout='vertical'
						vertical
					>
						<Input placeholder='Nome do treino' />
					</FormItem>
					<FormItem
						control={control}
						name='description'
						label='Descrição do treino'
						layout='vertical'
						vertical
					>
						<Input />
					</FormItem>
					<div className='flex justify-between items-baseline'>
						<FormItem
							control={control}
							name='day'
							label='Data'
							layout='vertical'
							vertical
							required
						>
							<Controller
								control={control}
								name='day'
								render={({ field }) => {
									return (
										<DatePicker
											onChange={field.onChange}
											defaultValue={dayjs(field.value)}
											value={dayjs(field.value)}
											format={{
												format: 'DD-MM-YYYY',
												type: 'mask',
											}}
											allowClear={false}
										/>
									)
								}}
							/>
						</FormItem>
					</div>
				</Form>
			</Drawer>
		</>
	)
}
