import { useRouter } from 'next/router'

export default function UserShow() {
  const router = useRouter()
  return <div>{router.query.uid}</div>
}