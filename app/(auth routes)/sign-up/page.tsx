"use client";
import css from "./SignUpPage.module.css";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function SingUp() {
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();
  const [error, setError] = useState<string>(``);
  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setUser(data);
      router.push("/profile");
    },
    onError: () => setError("The user is registered or validation was failed"),
  });
  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as RegisterRequest;
    console.log(values);
    mutate(values);
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
