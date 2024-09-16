import React, { useEffect, useState } from "react";
import AdminPanelTitles from "../../../components/modules/AdminPanelTitle/AdminPanelTitle";
import EyeIcon from "../../../components/icons/EyeIcon";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesData } from "../../../store/slices/Messages/messagesExtraReducers";
import Skeleton from "../../../components/modules/Skeleton/Skeleton";
import CloseIcon from "../../../components/icons/CloseIcon";
import TreeDotsIcon from "../../../components/icons/TreeDotsIcon";
import AdminMessageTable from "../../../components/modules/AdminMessageTable/AdminMessageTable";

function Messages() {
  const { MessagesDataLoading, MessagesData } = useSelector(
    (data) => data.messages
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessagesData());
  }, []);

  

  return (
    <div className="w-full ">
      <AdminPanelTitles title={"Messages"} />
      <div className="pe-10 lg:pe-20 py-7">
        <table className="w-full h-full bg-[#8080804b]   rounded-lg   ">
          <tr className="w-full border-b border-gray-500 sticky bg-[#04040499] top-0 left-0">
            <th className="text-white py-4 ">Id</th>
            <th className="text-white py-4">Name</th>
            <th className="text-white py-4">Email</th>
            <th className="text-white py-4 ">Message </th>
            <th className="text-white py-4">Action</th>
          </tr>
          {MessagesDataLoading ? (
            <Skeleton count={3} />
          ) : (
            MessagesData.map((message) => (
              <>
                <AdminMessageTable message={message} />
              </>
            ))
          )}
        </table>
      </div>
    </div>
  );
}

export default Messages;
