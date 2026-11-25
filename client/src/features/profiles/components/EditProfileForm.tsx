import { Input } from "@/components/ui/input";
import type { ClientProfile } from "../types/profile.types";
import defaultAvatar from "@/assets/images/avatar.png";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createUpdateProfileSchema } from "../schema/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { Field } from "@/components/ui/field";
import { profileApi } from "@/api/profile.api";
import { useNavigate } from "react-router-dom";
import { useRequiredAuth } from "@/context/AuthContext";

interface EditProfileFormProps {
  profile: ClientProfile;
}

export default function EditProfileForm({ profile }: EditProfileFormProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { reloadMe } = useRequiredAuth();

  const updateProfileSchema = createUpdateProfileSchema(
    Boolean(profile.avatar),
  );

  type UpdateProfileFormInput = z.input<typeof updateProfileSchema>;
  type UpdateProfileFormOutput = z.output<typeof updateProfileSchema>;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateProfileFormInput, unknown, UpdateProfileFormOutput>({
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      country: profile.country,
      city: profile.city,
      phone: profile.phone,
      avatar: null,
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const navigate = useNavigate();

  const avatarFormValue = watch("avatar");

  const avatarPreview = avatarFormValue
    ? URL.createObjectURL(avatarFormValue)
    : null;

  const onSubmit: SubmitHandler<UpdateProfileFormOutput> = async (data) => {
    const payload = new FormData();

    payload.append("_method", "PUT");
    payload.append("firstName", data.firstName);
    payload.append("lastName", data.lastName);
    payload.append("country", data.country);
    payload.append("city", data.city);
    payload.append("phone", data.phone);

    if (data.avatar instanceof File) {
      payload.append("avatar", data.avatar);
    }

    const result = await profileApi.update(payload);

    if (!result.success) {
      if (result.status === 422 && result.errors) {
        const serverValidationErrors = result.errors;
        Object.entries(serverValidationErrors).forEach(([field, messages]) => {
          setError(field as keyof UpdateProfileFormInput, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        setError("root", {
          message: "Something went wrong, try again later",
        });
      }
      return;
    }

    reloadMe();
    setIsEditMode(false);
    navigate("/client/dashboard");
  };

  const onGoBack = () => {
    reset();
    setIsEditMode(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4">
        <div className="w-55 h-80 border border-gray-300 mt-5 p-6 rounded-xl flex flex-col items-center">
          <div className="w-25 h-25 rounded-full border border-gray-500">
            <img
              src={avatarPreview ?? profile.avatar ?? defaultAvatar}
              className="size-full rounded-full object-cover ring-2 ring-white shadow-md"
              alt="Avatar"
            />
          </div>
          {isEditMode && (
            <>
              <label
                htmlFor="upload-avatar"
                className="text-white bg-blue-500 border rounded-xl hover:bg-blue-600 transition px-4 py-1 mt-3"
              >
                Upload
              </label>
              <input
                {...register("avatar", {
                  onChange: (e) => {
                    const file = e.target.files?.[0] ?? null;
                    setValue("avatar", file, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  },
                })}
                id="upload-avatar"
                type="file"
                className="hidden"
              />
              {errors.avatar && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.avatar.message}
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-4 border border-gray-300 mt-5 p-6 rounded-xl">
          <Field>
            <span className="text-sm w-23">First Name</span>
            <Input {...register("firstName")} disabled={!isEditMode} />
            {errors.firstName && (
              <div className="text-red-500 text-sm">
                {errors.firstName.message}
              </div>
            )}
          </Field>
          <Field className="flex gap-3 items-center">
            <span className="text-sm w-23">Last Name</span>
            <Input {...register("lastName")} disabled={!isEditMode} />
            {errors.lastName && (
              <div className="text-red-500 text-sm">
                {errors.lastName.message}
              </div>
            )}
          </Field>
          <Field className="flex gap-3 items-center">
            <span className="text-sm w-23">Email</span>
            <Input value={profile.email} disabled />
          </Field>
          <Field className="flex gap-3 items-center">
            <span className="text-sm w-23">Phone</span>
            <Input {...register("phone")} disabled={!isEditMode} />
            {errors.phone && (
              <div className="text-red-500 text-sm">{errors.phone.message}</div>
            )}
          </Field>
          <Field className="flex gap-3 items-center">
            <span className="text-sm w-23">Country</span>
            <Input {...register("country")} disabled={!isEditMode} />
            {errors.country && (
              <div className="text-red-500 text-sm">
                {errors.country.message}
              </div>
            )}
          </Field>
          <Field className="flex gap-3 items-center">
            <span className="text-sm w-23">City</span>
            <Input {...register("city")} disabled={!isEditMode} />
            {errors.city && (
              <div className="text-red-500 text-sm">{errors.city.message}</div>
            )}
          </Field>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        {!isEditMode && (
          <button
            type="button"
            className="text-blue-600 border border-blue-600 px-4 py-1 rounded-xl hover:bg-gray-50"
            onClick={() => setIsEditMode(true)}
          >
            Edit
          </button>
        )}
        {isEditMode && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onGoBack}
              className="text-gray-500 underline hover:text-gray-700"
            >
              Go back
            </button>
            <button
              type="submit"
              className={`px-4 py-1 rounded-xl hover:bg-gray-50 ${!isDirty || isSubmitting ? "text-gray-600 border border-gray-600 cursor-not-allowed" : "text-blue-600 border border-blue-600 cursor-pointer"}`}
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? "Saving" : "Save"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
