import * as React from "react";
import { useContext, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import FAB from "@/components/FAB";
import useFetch from "@/hooks/useFetch";
import UserCard from "@/components/UserCard";
import { UserContext } from "@/providers/UserProvider";
import {useSelector}  from "react-redux";

type userType = {
  createdAt: string,
  avatar: string,
  name: string,
  id:string,

}


const Users = () => {
  const { getFetch } = useContext(UserContext);
  const users: Array<userType> = useSelector((state: Array<userType>) => state)
  const url = process.env.EXPO_PUBLIC_MOCKAPI_URL ?? "";
  console.log({ url: process.env.EXPO_PUBLIC_MOCKAPI_URL });

  useEffect(() => {
    getFetch(url, {});
  }, []);

  const deleteUser = (userId: string) => {
    getFetch(
      url + "/" + userId,
      {
        method: "DELETE",
      },
      userId
    );
  };

  return (
    <>
      <FlatList
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 20 }}
        style={{ padding: 10 }}
        data={users}
        numColumns={2}
        renderItem={({ item }) => {
          return <UserCard item={item} deleteUser={deleteUser} />;
        }}
      />
      <FAB />
    </>
  );
};

export default Users;
