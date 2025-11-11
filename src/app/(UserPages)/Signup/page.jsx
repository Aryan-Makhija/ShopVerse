import { UsersignupForm } from '@/components/Admin-User/userSignup'
import { Navbar } from '@/components/homepage/Navbar'


const Signup = () => {
    return (
        <div className='bg-gradient-to-t from-orange-200  to-pink-200'>
            <Navbar />
            <div className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <UsersignupForm></UsersignupForm>
                </div>
            </div>

        </div>
    )
}

export default Signup