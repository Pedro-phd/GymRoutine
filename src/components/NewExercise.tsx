'use client'
import { useAppContext } from '@/context/app.context'
import { IExerciseCreate } from '@/domain/model'
import { ExerciseService } from '@/services/exercise.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input, Modal, message } from 'antd'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormItem } from 'react-hook-form-antd'
import { z } from 'zod'

const schema = z.object({
	name: z
		.string({ required_error: 'É obrigatório um nome para o treino' })
		.min(1),
})

interface Props {
	trainingId: number
}

export const NewExercise = ({ trainingId }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [messageApi, contextHolder] = message.useMessage()

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<IExerciseCreate>({
		resolver: zodResolver(schema),
	})

	const { fetchData } = useAppContext()

	const service = new ExerciseService()
	const submit = async (data: IExerciseCreate) => {
		try {
			await service.create({ data: { ...data, trainingId } })
			messageApi.open({
				type: 'success',
				content: 'Exercício criado com sucesso!',
			})
			reset()
			setIsModalOpen(false)
			fetchData()
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Erro ao criar exercício!',
			})
			console.error(error)
		}
	}

	return (
		<div>
			{contextHolder}
			<Button type='link' onClick={() => setIsModalOpen(true)}>
				Novo Exercício
			</Button>
			<Modal
				title='Novo Exercício'
				open={isModalOpen}
				onOk={handleSubmit(submit)}
				onCancel={() => setIsModalOpen(false)}
			>
				<Form onFinish={handleSubmit(submit)} className='flex flex-col gap-4'>
					<FormItem
						control={control}
						name='name'
						label='Nome do exercício'
						required
						status={errors.name?.message && 'error'}
						layout='vertical'
						vertical
					>
						<Input placeholder='Nome do exercício' />
					</FormItem>
				</Form>
			</Modal>
		</div>
	)
}
