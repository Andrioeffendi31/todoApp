import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="mb-4 flex flex-row items-center gap-4 rounded-md bg-white p-4 shadow dark:bg-dark-secondary md:p-6">
      {user.profilePictureUrl ? (
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={`/${user.profilePictureUrl}`}
            alt="profile picture"
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-lg font-semibold text-gray-700">
          {user.username.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col">
        <h3 className="font-semibold text-gray-900">{user.username}</h3>
        <p className="text-sm text-gray-600">User ID: #{user.userId}</p>
      </div>
    </div>
  );
};

export default UserCard;
