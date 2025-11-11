import { UserloginForm } from '@/components/Admin-User/userLogin'
import { Navbar } from '@/components/homepage/Navbar'
import { IconArrowLeftFromArc } from '@tabler/icons-react'
import { ArrowLeftSquare } from 'lucide-react'


const UserLoginPage = () => {
    return (
        <div className=" bg-gradient-to-t from-orange-200 to-pink-200 ">

            <Navbar></Navbar>
            <div className=" flex min-h-svh relative flex-col items-center justify-center p-6 md:p-10">

                <div className="w-full max-w-sm md:max-w-3xl">
                    <UserloginForm></UserloginForm>
                </div>
            </div>
        </div>
    )
}

export default UserLoginPage