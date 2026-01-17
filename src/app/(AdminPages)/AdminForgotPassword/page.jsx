import { AdminForgotPassword } from "@/components/Admin-User/adminForgotPassword"
import Footer from "@/components/homepage/Footer"
import FooterNavbar from "@/components/homepage/FooterNav"
import Header from "@/components/homepage/Header"





const ForgotPassword = () => {
    return (
        <>
            <Header></Header>
            <div className="bg-muted flex   flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-xl  ">
                    <AdminForgotPassword></AdminForgotPassword>
                </div>
            </div>
            <FooterNavbar></FooterNavbar>
            <Footer></Footer>

        </>
    )
}

export default ForgotPassword