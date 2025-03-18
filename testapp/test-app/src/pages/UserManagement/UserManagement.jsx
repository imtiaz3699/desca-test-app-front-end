import { useEffect } from "react";
import React from "react";
import { useUser } from "../../context/userContext";
import { GiConsoleController } from "react-icons/gi";

function UserManagement() {
  const { getRequest } = useUser();
  const fetchLists = async () => {
    try {
        console.log('alfsdjhlasdkjfasd')
      const response = await getRequest("/api/admin/get-user");
      console.log(response, 'fasdlfashdl');
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchLists();
  }, []);
  return <div>user management</div>;
}

export default UserManagement;
