import type { MetaFunction } from "@remix-run/node";
import { Socket } from "socket.io-client";
import { Cigarette, LucideAArrowDown, Mail } from "lucide-react";
import { InputAmount, InputPassword, InputPhoneNumber, InputSearch, InputDefault } from "~/components";
import { Button } from "~/components/ui/button";
import { signal } from "@preact/signals";
import { NotificationBell } from "~/components/notofocation-bell";
import { Notification } from "~/components/notification";
// import { InputPassword } from '../../node_modules/testing-input'
import useSocket from "~/hooks/useSocket";
import React from "react";
// import ExampleForm from "~/components/example-form";
import UserForm from "~/components/useForm";
import { getUsers, createUser, deleteUser, getUserById, updateUser } from "~/lib/api";
import UserTable from "~/components/userTabel";
import { ElnusaSVG } from "~/components/ui/elnusa_svg";
import { CheckboxDefault, CheckboxWithLabel } from "~/components/CheckboxDefault";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { isConnected, connect, disconnect, ReceiveData, sendData } = useSocket("http://localhost:3000", {

  });

  const [messageToSend, setMessageToSend] = React.useState<string>("");
  const [data, setData] = React.useState<{ id: number; text: string }[]>([])
  const [users, setUsers] = React.useState([]);
  const [editingUser, setEditingUser] = React.useState<any>(null);
  const text = signal("");
  const handleCountry = (value: string) => {
    console.log('====================================');
    console.log(value);
    console.log('====================================');
  }
  const onInput = (event: any) => {
    text.value = event
    console.log(event);
    console.log('====================================');
    console.log(text);
    console.log('====================================');
  }

  // console.log('====================================');
  // console.log(text);
  // console.log('====================================');
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleCreateOrUpdate = async (user: any) => {
    if (editingUser) {
      await updateUser(editingUser?.id, user);
    } else {
      await createUser(user);
    }
    setEditingUser(null);
    fetchUsers();
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
  };

  const handleDelete = async (id: any) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setMessageToSend(e.target.value)

  }

  // const addItem = () => {
  //   sendData('add_item', messageToSend)
  // }

  const updatedList = ReceiveData("update_list") ?? []


  // React.useEffect(() => {
  //   if (updatedList) {
  //     setData(updatedList);
  //   }
  // }, [updatedList]);

  // console.log('====================================');
  // console.log(data);
  // console.log('====================================');
  return (

    <div className="p-8" >
      <h1 className="text-2xl font-bold mb-4">Notification Bell Demo</h1>
      <div className="flex items-center space-x-4 mb-4">

        {/* <Button variant="outline" onClick={clearNotifications}>Clear All</Button> */}
        <NotificationBell count={updatedList?.length}>
          <div className="max-h-[300px] overflow-y-auto">

            {updatedList.map((item: any, id: any) => (
              <Notification className="space-y-1" variant='default' key={id} title={item.id.toString()} description={item.text} />
            ))
            }

          </div>
        </NotificationBell>

        {/* <div className="p-2 w-full border rounded-md">
          <InputDefault variant="success" onChange={onInput} className="my-2" label="Update Artikel" />
          <Button onClick={addItem}>Add Notification</Button></div> */}

      </div>
      {/* <InputPassword variant="error" onChange={(e) => setMessageToSend(e.target.value)} className="" label="amount" />
      <InputAmount onChange={onInput} variant="hint" placeholder="test" label="test" message="this text is not valid" />
      <InputSearch heading="medium" />
      <InputPhoneNumber onCountryCodeChange={handleCountry} />
       */}

      <div>
        {/* <UserForm onSubmit={handleCreateOrUpdate} initialData={editingUser} />
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} /> */}
        {/* <CheckboxDefault /> */}
        <CheckboxWithLabel description="test description" titles="test title" variant="azure-primary" sizes="sm" />
      </div>
    </div >

  );
}

const resources = [
  {
    href: "https://remix.run/start/quickstart",
    text: "Quick Start (5 min)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M8.51851 12.0741L7.92592 18L15.6296 9.7037L11.4815 7.33333L12.0741 2L4.37036 10.2963L8.51851 12.0741Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "https://remix.run/start/tutorial",
    text: "Tutorial (30 min)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M4.561 12.749L3.15503 14.1549M3.00811 8.99944H1.01978M3.15503 3.84489L4.561 5.2508M8.3107 1.70923L8.3107 3.69749M13.4655 3.84489L12.0595 5.2508M18.1868 17.0974L16.635 18.6491C16.4636 18.8205 16.1858 18.8205 16.0144 18.6491L13.568 16.2028C13.383 16.0178 13.0784 16.0347 12.915 16.239L11.2697 18.2956C11.047 18.5739 10.6029 18.4847 10.505 18.142L7.85215 8.85711C7.75756 8.52603 8.06365 8.21994 8.39472 8.31453L17.6796 10.9673C18.0223 11.0653 18.1115 11.5094 17.8332 11.7321L15.7766 13.3773C15.5723 13.5408 15.5554 13.8454 15.7404 14.0304L18.1868 16.4767C18.3582 16.6481 18.3582 16.926 18.1868 17.0974Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "https://remix.run/docs",
    text: "Remix Docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];
