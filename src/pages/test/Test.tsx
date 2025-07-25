import React, { useEffect, useState } from "react";

const Test = () => {
  const [value, setValue] = useState("초기상태");
  // 마운트 시 로컬스토리지에서 값 불러오기
  useEffect(() => {
    const storedValue = localStorage.getItem("SetKey");
    if (storedValue) setValue(storedValue);
  }, []);

  // 값 변경 시 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("SetKey", value);
  }, [value]);

  return (
    <>
      <div>가나다</div>
      <div>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </>
  );
};

export default Test;
