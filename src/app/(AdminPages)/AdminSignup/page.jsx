import { AdminSignupForm } from "@/components/Admin-User/adminSignup"
import Footer from "@/components/homepage/Footer"
import { Navbar } from "@/components/homepage/Navbar"


const AdminSignup = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <AdminSignupForm></AdminSignupForm>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default AdminSignup