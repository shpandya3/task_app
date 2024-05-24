import React from "react";
import VerticalMarquee from "../common/VerticalMarquee";
import { useQuery } from "@tanstack/react-query";
import { getUserUpdates } from "../../api/user/UserApi";

const UserUpdates = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users", "updates"],
    queryFn: getUserUpdates,
  });

  if (isLoading) {
    return (
      <div className="h-30rem card">
        <h1>Loading..</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-30rem card">
        <h1>Error..</h1>
      </div>
    );
  }
  return (
    <VerticalMarquee>
         
      {data?.data.map((row) => (
        <li key={row?.id} style={{whiteSpace: "pre-line"}} className="pt-3">{row.content}</li>
      ))}
      
    </VerticalMarquee>
  );
};

export default UserUpdates;
