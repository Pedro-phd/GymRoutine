'use client'
import { useAppContext } from '@/context/app.context'
import { ISetCreate } from '@/domain/model'
import { SetService } from '@/services/set.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input, InputNumber, message } from 'antd'
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
	const [open, setOpen] = useState(false)
	const [messageApi, contextHolder] = message.useMessage()
	const { fetchData } = useAppContext()
	const {
		handleSubmit,
		control,
		formState: { errors },
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
			<Form onFinish={handleSubmit(submit)} className='flex gap-2 mt-4'>
				<FormItem
					control={control}
					name='type'
					required
					status={errors.type?.message && 'error'}
					layout='horizontal'
				>
					<Input placeholder='Tipo' />
				</FormItem>
				<FormItem
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
					/>
				</FormItem>
				<FormItem
					control={control}
					name='weight'
					required
					status={errors.weight?.message && 'error'}
					layout='horizontal'
				>
					<InputNumber placeholder='Peso' addonAfter={<p>KG</p>} min={0} />
				</FormItem>
				<FormItem
					control={control}
					name='description'
					required
					status={errors.description?.message && 'error'}
					layout='horizontal'
				>
					<Input placeholder='Descrição' />
				</FormItem>
				<Button
					type='primary'
					htmlType='submit'
					shape='default'
					className='min-w-8 min-h-8 p-0'
					onClick={handleSubmit(submit)}
					icon={<Add01Icon />}
				/>
			</Form>
			{/* </Drawer> */}
		</>
	)
}
