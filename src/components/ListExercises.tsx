import { IExercise } from '@/domain/model'
import { Descriptions, List, Card, Collapse } from 'antd'
import { NewSet } from './NewSet'

interface Props {
	data: IExercise
}

export const ListExercises = ({ data }: Props) => {
	const items = data.sets.map((s, i) => {
		const data = {
			key: s.id,
			label: `${i + 1} | ${s.type ?? `${s.reps} reps x ${s.weight}kg`}`,
			children: (
				<Descriptions size='small' layout='horizontal' bordered>
					<Descriptions.Item label='Tipo'>{s.type}</Descriptions.Item>
					<Descriptions.Item label='Peso'>{s.weight}kg</Descriptions.Item>
					<Descriptions.Item label='Repetições'>{s.reps}</Descriptions.Item>
					<Descriptions.Item label='Descrição'>
						{s.description}
					</Descriptions.Item>
				</Descriptions>
			),
		}
		return data
	})

	return (
		<List.Item className='w-full'>
			<Card
				size='small'
				title={data.name}
				type='inner'
				className='w-full capitalize'
			>
				<Collapse items={items} />
				<NewSet exerciseId={data.id} />
			</Card>
		</List.Item>
	)
}
