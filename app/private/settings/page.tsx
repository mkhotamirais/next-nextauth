import { fetchAllUsers } from "@/actions/authAction";
import { deleteUser } from "@/actions/userAction";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/getSession";
import { User } from "@/models/userModel";
import { redirect } from "next/navigation";

export default async function Settings() {
  const session = await getSession();
  const user = session?.user;
  if (!user) return redirect("/login");
  if (user?.role !== "admin") return redirect("/private/dashboard");
  const allUsers = await fetchAllUsers();
  console.log(allUsers);
  return (
    <div>
      Settings
      {allUsers?.map((user) => (
        <div key={user.id}>
          <div>{user.name}</div>
          <form
            action={async () => {
              "use server";
              await User.findByIdAndDelete(user.id);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      ))}
    </div>
  );
}
