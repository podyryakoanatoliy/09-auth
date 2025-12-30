"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/api/clientApi";

export default function EditProfile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    const userName = formData.get("username") as string;
    const newUserName = await updateMe(userName);
    setUser(newUserName);
    router.push("/profile");
    console.log(userName);
  };
  // console.log(user);
  // console.log(setUser);
  return (
    <>
      {user && (
        <main className={css.mainContent}>
          <div className={css.profileCard}>
            <h1 className={css.formTitle}>Edit Profile</h1>

            <Image
              src={user.avatar}
              alt={user.username}
              width={120}
              height={120}
              className={css.avatar}
            />

            <form className={css.profileInfo} action={handleSubmit}>
              <div className={css.usernameWrapper}>
                <label htmlFor="username">Username:</label>
                <input
                  defaultValue={user.username}
                  name="username"
                  id="username"
                  type="text"
                  className={css.input}
                />
              </div>

              <p>Email: {user.email}</p>

              <div className={css.actions}>
                <button type="submit" className={css.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  className={css.cancelButton}
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
}
