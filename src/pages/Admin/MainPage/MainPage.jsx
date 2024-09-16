import React, { useEffect, useState } from "react";
import { AxiosAdminApi } from "../../../Axios/Axios";
import Skeleton from "../../../components/modules/Skeleton/Skeleton";
import DashboardTableRow from "../../../components/modules/DashboardTableRow/DashboardTableRow";
// import TreeDotsIcon from "../../../components/icons/TreeDotsIcon";

function MainPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    AxiosAdminApi.get("/api/History/GetAll").then((res) => {
      if (res.status == 200) {
        setHistory(res.data);
      }
    });
  }, []);

 ;

  return (
    <div className="  py-10 grid grid-cols-1  px-4 lg:px-0 lg:pe-28 gap-4 mx-auto ">
      <div className="landingAdminBoxes w-full h-[80vh] overflow-y-auto  text-white mx-auto">
        <table className="w-full h-full relative overflow-y-auto">
          <tr className="bg-[#000000e1] z-50 sticky h-16 top-0 left-0 w-full">
            <th>FullName</th>
            <th>Section</th>
            <th className="hidden md:table-cell">Action</th>
            <th className="hidden md:table-cell">Date</th>
            <th className="hidden md:table-cell">Hour</th>
            <th className="md:hidden">Action</th>
          </tr>

          {history.length > 0 ? (
            history.reverse().map((item, index) => (
             <DashboardTableRow key={index} item={item} />
            ))
          ) : (
            <Skeleton count={3} />
          )}
        </table>
      </div>
    </div>
  );
}

export default MainPage;
