import Profile from "@/components/forms/Profile";
import { getUserById } from "@/database/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Edit Your Profile | CodeLounge`,
  description: `Edit your profile and update your information.`,
};

const EditProfile = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) return null;

  const mongoUser = await getUserById({ userId: clerkId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile clerkId={clerkId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default EditProfile;
