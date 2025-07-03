import { Actor } from '@prisma/client'
import { getImageUrl , departmentFormatter} from '../utils/utils'

const ActorCard = ({actor} : {actor : Actor}) => {
    return (
        <div className='group flex-1 flex flex-col items-center justify-start gap-3'>
            <img src={getImageUrl(actor.profile_path)} alt=""
            className='flex-1 aspect-square w-full rounded-full object-center object-cover cursor-pointer '/>
            <div className=''>
                <h1 className='text-2xl text-center text-text font-medium duration-250  opacity-0 group-hover:opacity-100 ease-in-out translate-y-[100%] group-hover:-translate-y-0'>{actor.name}</h1>
                <h1 className='text-2xl text-center text-soft-text font-medium delay-50 duration-400 opacity-0 group-hover:opacity-100 ease-in-out translate-y-[100%] group-hover:-translate-y-0'>{departmentFormatter(actor.department)}</h1>
            </div>
        </div>
    )
}

export default ActorCard