import { AdminSignupForm } from "@/components/Admin-User/adminSignup"


const AdminSignup = () => {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <AdminSignupForm></AdminSignupForm>
            </div>
        </div>
    )
}

export default AdminSignup