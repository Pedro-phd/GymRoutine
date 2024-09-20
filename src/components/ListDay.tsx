import { ITraining } from '@/domain/model'
import { dateFormater } from '@/helpers'
import { List, Tag, Typography } from 'antd'
import { ListExercises } from './ListExercises'
import { NewExercise } from './NewExercise'

interface Props {
	data: ITraining
}

export const ListDay = ({ data }: Props) => {
	const { Text } = Typography

	return (
		<List
			header={
				<div className='flex gap-2 justify-between items-center'>
					<Text strong className='capitalize'>
						{data.name}
					</Text>
					<div className='flex gap-2 items-center'>
						<Tag color='blue'>{dateFormater(data.day)}</Tag>
						<NewExercise trainingId={data.id} />
					</div>
				</div>
			}
			bordered
			className='bg-neutral-50 w-full'
			dataSource={data.exercises}
			renderItem={(item) => <ListExercises data={item} />}
		/>
	)
}
