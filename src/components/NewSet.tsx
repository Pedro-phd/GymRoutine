'use client'
import { useAppContext } from '@/context/app.context'
import { ISetCreate } from '@/domain/model'
import { SetService } from '@/services/set.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Collapse, Form, Input, InputNumber, message } from 'antd'
import { Add01Icon } from 'hugeicons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormItem } from 'react-hook-form-antd'
import { z } from 'zod'

const schema = z.object({
	type: z.string().optional(),
	weight: z
		.number({
			required_error: 'É necessário um peso para validar a série.',
			coerce: true,
		})
		.min(1, { message: 'É necessário um peso para validar a série.' }),
	reps: z
		.number({
			required_error: 'É necessário uma repetição para validar a série.',
			coerce: true,
		})
		.min(1, { message: 'É necessário uma repetição para validar a série.' }),
	description: z.string().optional(),
})

interface Props {
	exerciseId: number
}

export const NewSet = ({ exerciseId }: Props) => {
	const [messageApi, contextHolder] = message.useMessage()
	const { fetchData } = useAppContext()
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ISetCreate>({
		resolver: zodResolver(schema),
	})

	const service = new SetService()
	const submit = async (data: ISetCreate) => {
		try {
			await service.create({ data: { ...data, exerciseId } })
			messageApi.open({
				type: 'success',
				content: 'Série adicionada com sucesso!',
			})
			reset()
			fetchData()
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Erro ao adicionar série!',
			})
			console.error(error)
		}
	}

	return (
		<>
			{contextHolder}
			<Collapse
				className='mt-4'
				ghost
				size='small'
				bordered
				items={[
					{
						key: '1',
						label: (
							<p className='flex gap-2 items-center text-blue-600 text-sm'>
								<Add01Icon className='size-4' /> Nova série
							</p>
						),
						showArrow: false,
						children: (
							<Form onFinish={handleSubmit(submit)} className='flex flex-col'>
								<div className='flex gap-2 w-full'>
									<FormItem
										control={control}
										name='type'
										required
										status={errors.type?.message && 'error'}
										layout='horizontal'
										className='w-1/2'
									>
										<Input placeholder='Tipo' />
									</FormItem>
									<FormItem
										control={control}
										name='description'
										required
										status={errors.description?.message && 'error'}
										layout='horizontal'
										className='w-1/2'
									>
										<Input placeholder='Descrição' />
									</FormItem>
								</div>
								<div className='flex gap-2 w-full'>
									<FormItem
										className='w-1/2'
										control={control}
										name='reps'
										required
										status={errors.reps?.message && 'error'}
										layout='horizontal'
									>
										<InputNumber
											placeholder='Repetições'
											min={0}
											addonAfter={<p>Reps</p>}
											className='w-full'
										/>
									</FormItem>
									<FormItem
										className='w-1/2'
										control={control}
										name='weight'
										required
										status={errors.weight?.message && 'error'}
										layout='horizontal'
									>
										<InputNumber
											placeholder='Peso'
											addonAfter={<p>KG</p>}
											min={0}
											className='w-full'
										/>
									</FormItem>
								</div>
								<Button
									type='primary'
									htmlType='submit'
									shape='default'
									className='min-w-8 min-h-8 p-0 ml-auto'
									onClick={handleSubmit(submit)}
									icon={<Add01Icon />}
									loading={isSubmitting}
								/>
							</Form>
						),
					},
				]}
			/>
			{/* </Drawer> */}
		</>
	)
}
