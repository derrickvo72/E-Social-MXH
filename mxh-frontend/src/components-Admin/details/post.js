import React from "react";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import Image from "@material-tailwind/react/Image";
export const PostElement = () => {
  return (
    <>
      <tr>
        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
          <div className=" space-x-2 w-10 h-10 rounded-full border-2 border-white flex items-center">
            <p className="flex">1</p>
          </div>
        </th>
        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
          <div className=" space-x-2 w-10 h-10 rounded-full border-2 border-white flex items-center">
            <Image src={"/assets/image/defaultAvatar.png"} rounded alt="..." />
            <p className="flex">DucThuTU</p>
          </div>
        </th>
        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
          07/02/2000
        </th>
        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
          <Dropdown
            buttonText={<i className="far fa-edit color text-white" />}
            size="regular"
            rounded={true}
            block={false}
            ripple="light"
          >
            {/* <DropdownItem color="lightBlue">Add</DropdownItem> */}
            <DropdownItem color="lightBlue">Edit</DropdownItem>
            <DropdownItem color="lightBlue">Delete</DropdownItem>
          </Dropdown>
        </th>
      </tr>
    </>
  );
};

export const PostDetail = () => {
  return (
    <>
      <tr>
        <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
          Id
        </th>
        <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
          Username
        </th>
        <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
          Date
        </th>
        <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
          Action
        </th>
      </tr>
    </>
  );
};
