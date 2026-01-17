
"use client"


import Footer from "@/components/homepage/Footer";
import FooterNavbar from "@/components/homepage/FooterNav";
import Header from "@/components/homepage/Header";
import { Navbar } from "@/components/homepage/Navbar";
import Stepper, { Step } from "@/components/OrderStepper";
import { AddressDetails } from "@/components/OrderSteps/AddressDetails";
import { PlaceOrder } from "@/components/OrderSteps/FinalDetails";
import { Paymenttype } from "@/components/OrderSteps/PaymentType";
import { UserDetails } from "@/components/OrderSteps/UserStep";



// import Stepper, { Step } from "@/components/Stepper";


const OrderPage = () => {
  return (

    <div>

      <Header></Header>

      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-2 md:p-2 m-6">
        {/* ✅ Container with fixed width for the stepper */}
        <div className="w-full flex justify-center items-center flex-col  max-w-sm md:max-w-[1100px] min-h-[800px] ">
          {/* ✅ Stepper fills this container completely and has padding inside */}

          <div className="w-full h-full p-3   flex flex-col justify-center  items-center min-h-[800px] bg-background rounded-lg shadow-2xl">
            <h1 className="text-3xl font-semibold font-serif text-pink-500">Order Details</h1>

            <Stepper
              initialStep={1}
              onStepChange={(step) => {
                // console.log(step);
              }}
              onFinalStepCompleted={() => console.log("All steps completed!")}
              backButtonText="Previous"
              nextButtonText="Next"

            >
              <Step>
                <UserDetails></UserDetails>
              </Step>

              <Step>
                <AddressDetails></AddressDetails>
              </Step>

              <Step>
                <Paymenttype></Paymenttype>
              </Step>

              <Step>
                <PlaceOrder></PlaceOrder>
              </Step>


            </Stepper>
          </div>
        </div>
      </div>
      <FooterNavbar></FooterNavbar>
      <Footer></Footer>
    </div>
  )
}

export default OrderPage