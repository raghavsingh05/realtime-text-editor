import { useOthers } from '@liveblocks/react'
import Image from 'next/image';


const defaultAvatar = "/assets/images/avatar.png"

const ActiveCollaborators = () => {
    const other = useOthers();
    const collaborators = other.map((other) => other.info);
  return (
    <ul className='flex space-x-2'>
        {collaborators.map(({id, avatar, name, color}) =>(
            <li key={id} >
                <Image
                    src={avatar && avatar.trim() !== '' ? avatar : defaultAvatar}
                    alt={name}
                    width={100}
                    height={100}
                    className='inline-block size-8 rounded-full ring-2 ring-dark-100'
                    style={{border: `2px solid ${color}`}}
                    />
            </li>
        ))}
    </ul>
  )
}

export default ActiveCollaborators
