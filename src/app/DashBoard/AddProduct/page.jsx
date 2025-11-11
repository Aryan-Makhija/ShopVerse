"use client"


import { AttributeVaraintForm } from "@/components/AddProduct/AttributeandVariant";
import { BrandForm } from "@/components/AddProduct/BrandDetails";
import { CategoryForm } from "@/components/AddProduct/Categorydetail";
import { MaterialForm } from "@/components/AddProduct/MaterialandCareDetails";
import { ProductBasicInfo } from "@/components/AddProduct/Productbasicdetails";
import { TypeForm } from "@/components/AddProduct/Producttypeform";
import { ReturnForm } from "@/components/AddProduct/ReturnPolicyDetails";
import { SubcategoryForm } from "@/components/AddProduct/SubCategoryDetails";
import Stepper, { Step } from "@/components/Stepper";




const Addproduct = () => {
    return (


        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-5">
            {/* ✅ Container with fixed width for the stepper */}
            <div className="w-full flex justify-center items-center flex-col gap-10 max-w-sm md:max-w-[1100px] min-h-[700px] ">
                {/* ✅ Stepper fills this container completely and has padding inside */}
                <h1 className="text-3xl">Add new Product</h1>
                <div className="w-full h-full p-6 flex justify-center  items-center min-h-[800px] bg-background rounded-lg shadow-md">

                  
                    <Stepper
                        initialStep={1}
                        onStepChange={(step) => {
                            console.log(step);
                        }}
                        onFinalStepCompleted={() => console.log("All steps completed!")}
                        backButtonText="Previous"
                        nextButtonText="Next"

                    >
                        <Step>
                            <div>

                                <ProductBasicInfo></ProductBasicInfo>
                            </div>
                        </Step>
                        <Step>
                            <TypeForm></TypeForm>
                        </Step>
                        <Step>
                            <CategoryForm></CategoryForm>
                        </Step>
                        <Step>
                            <SubcategoryForm></SubcategoryForm>
                        </Step>
                        <Step>
                            <BrandForm></BrandForm>
                        </Step>
                        <Step>
                            <AttributeVaraintForm></AttributeVaraintForm>
                        </Step>
                        <Step>
                            <MaterialForm></MaterialForm>
                        </Step>
                        <Step>
                            <ReturnForm></ReturnForm>
                        </Step>


                    </Stepper>
                </div>
            </div>
        </div>
    )
}

export default Addproduct