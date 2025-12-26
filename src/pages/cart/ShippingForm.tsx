"use client";

import type { SubmitHandler } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";

type AddressFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
};

type Props = {
  onSubmit: (data: AddressFormValues) => void;
};

export default function AddressForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddressFormValues>({
    defaultValues: { isDefault: false },
  });

  const submitHandler: SubmitHandler<AddressFormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-medium mb-4">Add Shipping Address</h2>

      {/* First Name */}
      <div>
        <label className="block mb-1 font-medium">First Name</label>
        <input
          {...register("firstName", { required: "First name is required" })}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>

      {/* Last Name */}
      <div>
        <label className="block mb-1 font-medium">Last Name</label>
        <input
          {...register("lastName", { required: "Last name is required" })}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          {...register("phone", { required: "Phone number is required" })}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      {/* Address Line 1 */}
      <div>
        <label className="block mb-1 font-medium">Address Line 1</label>
        <input
          {...register("addressLine1", { required: "Address line 1 is required" })}
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1.message}</p>}
      </div>

      {/* Address Line 2 */}
      <div>
        <label className="block mb-1 font-medium">Address Line 2 (Optional)</label>
        <input {...register("addressLine2")} className="w-full border border-gray-300 px-3 py-2 rounded" />
      </div>

      {/* City */}
      <div>
        <label className="block mb-1 font-medium">City</label>
        <input {...register("city", { required: "City is required" })} className="w-full border border-gray-300 px-3 py-2 rounded" />
        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
      </div>

      {/* State */}
      <div>
        <label className="block mb-1 font-medium">State</label>
        <input {...register("state", { required: "State is required" })} className="w-full border border-gray-300 px-3 py-2 rounded" />
        {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
      </div>

      {/* Postal Code */}
      <div>
        <label className="block mb-1 font-medium">Postal Code</label>
        <input {...register("postalCode", { required: "Postal code is required" })} className="w-full border border-gray-300 px-3 py-2 rounded" />
        {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
      </div>

      {/* Country */}
      <div>
        <label className="block mb-1 font-medium">Country</label>
        <input {...register("country", { required: "Country is required" })} className="w-full border border-gray-300 px-3 py-2 rounded" />
        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
      </div>

      {/* Is Default */}
      <div className="flex items-center gap-2">
        <Controller
          name="isDefault"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        />
        <span>Set as default address</span>
      </div>

      <button type="submit" className="w-full py-2 bg-indigo-500 text-white font-medium rounded hover:bg-indigo-600 transition">
        Save Address
      </button>
    </form>
  );
}
