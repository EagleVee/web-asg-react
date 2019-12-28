import React from "react";

const UnapprovedComponent = ({
  text = "Bạn không có quyền xem và chỉnh sửa nội dung này"
}) => {
  return (
    <div style={styles.viewCenter}>
      <p style={{ fontSize: 16, fontWeight: "300" }}>{text}</p>
    </div>
  );
};

const styles = {
  viewCenter: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default UnapprovedComponent;
