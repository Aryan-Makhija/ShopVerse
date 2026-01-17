import { AdminLoginForm } from "@/components/Admin-User/adminLogin"
import Footer from "@/components/homepage/Footer"
import Header from "@/components/homepage/Header"
import { Navbar } from "@/components/homepage/Navbar"




const AdminLoggin = () => {
    return (
        <>
            <Header></Header>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <AdminLoginForm></AdminLoginForm>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default AdminLoggin