
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../schemas/registrationSchema";

export default function Register() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setSuccess(false);

    // Demonstration only: no account is created on a server.
    await new Promise((resolve) => setTimeout(resolve, 400));

    setSuccess(true);
    reset();
  };

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <p className="mt-2 text-sm text-slate-600">
        Complete the form to try the registration flow.
      </p>

      {success && (
        <p role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
          Form submitted successfully. No account has been created yet.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">Name</label>
          <input
            id="name"
            {...register("name")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          {errors.name && <p role="alert" className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          {errors.email && <p role="alert" className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          {errors.password && <p role="alert" className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          {errors.confirmPassword && <p role="alert" className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600">
        Already registered?{" "}
        <Link to="/login" className="font-medium text-indigo-600 hover:underline">
          Sign in
        </Link>
      </p>
    </section>
  );
}
