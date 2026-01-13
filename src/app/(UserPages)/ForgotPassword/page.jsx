import { UserForgotPassword } from "@/components/Admin-User/userForgotPassword"
import FooterNavbar from "@/components/homepage/FooterNav"
import { Navbar } from "@/components/homepage/Navbar"




const ForgotPassword = () => {
    return (
        <>
        <Navbar></Navbar>
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <UserForgotPassword></UserForgotPassword>
            </div>
        </div>
        
        <FooterNavbar></FooterNavbar>
        </>
    )
}

export default ForgotPassword