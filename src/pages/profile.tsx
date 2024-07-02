import { useEffect, useState } from "react";
import useAuthStateTeacher from "../hooks/useAuth";

function Profile() {
  const { teacherId } = useAuthStateTeacher();
  const [data, setData] = useState<any>();

  console.log(teacherId);

  useEffect(() => {
    const getInfo = async () => {
      const info = {
        id: teacherId,
      };
      const res = await fetch("/api/GetTeacherInfo", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(info),
      });
      console.log(res);

      const data = await res.json();
      setData(data);
    };

    getInfo();

    console.log(data);
  }, [teacherId]);

  return (
    <div className="w-[70%] mx-auto  bg-card text-card-foreground rounded-lg shadow-md">
      <div className=" w-full bg-primary text-primary-foreground p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">My profile</h1>
      </div>
      <div className="p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            UserName
          </label>
          <div className="flex flex-col gap-3 mt-1">
            <input
              type="text"
              value={data?.UserName}
              className="w-full p-2 border border-border rounded-md bg-input text-foreground"
            />
            <button className="w-[20%]  px-8 py-1 border border-border text-foreground rounded-full hover:bg-muted">
              Edit
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Email
          </label>
          <div className="flex flex-col gap-3 mt-1">
            <input
              type="email"
              value={data?.Email}
              className="w-full p-2 border border-border rounded-md bg-input text-foreground"
            />
            <button className="w-[20%]  px-8 py-1 border border-border text-foreground rounded-full hover:bg-muted">
              Edit
            </button>
          </div>
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Password
          </label>
          <div className="flex space-x-4 mt-1">
            <button className="px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted">
              Change password
            </button>
            <button className="px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted">
              Forgot my password
            </button>
          </div>
        </div> */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Sessions
          </label>
          <button className="mt-1 px-4 py-2 border border-destructive text-destructive rounded-md hover:bg-destructive/10">
            Log me out from all devices
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
