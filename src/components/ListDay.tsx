import { ITraining } from '@/domain/model'
import { dateFormater } from '@/helpers'
import { List, Tag, Typography } from 'antd'
import { ListExercises } from './ListExercises'

interface Props {
	data: ITraining
}

export const ListDay = ({ data }: Props) => {
	const { Text } = Typography

	return (
		<List
			header={
				<div className='flex gap-2 justify-between'>
					<Text strong className='capitalize'>
						{data.name}
					</Text>
					<Tag color='blue'>{dateFormater(data.day)}</Tag>
				</div>
			}
			bordered
			className='bg-neutral-50 w-full'
			dataSource={data.exercises}
			renderItem={(item) => <ListExercises data={item} />}
		/>
	)
}
