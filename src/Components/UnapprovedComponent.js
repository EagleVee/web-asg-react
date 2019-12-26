import React from "react";

const UnapprovedComponent = ({
  text = "Bạn không có quyền xem và chỉnh sửa nội dung này"
}) => {
  return (
    <div>
      <p style={{ fontSize: 16, fontWeight: "300" }}>{text}</p>
    </div>
  );
};

export default UnapprovedComponent;
