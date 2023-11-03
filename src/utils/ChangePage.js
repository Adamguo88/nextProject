// 分頁功能
export const changePage = ({
  indexPage = false, // 是否出現在首頁
  isSearch = false, // 是否搜尋
  tableData, // 所有資料
  e = 1, // 目前(緩存)頁數
  pageSize = 10, // 一次展示幾筆
}) => {
  if (!tableData?.length) return; // 沒有資料
  if (indexPage) {
    // 首頁只要顯示5筆
    const indexShowData = tableData.slice(0, 5);
    return { data: indexShowData, cachePage: 1 };
  }
  // (資料長度 / 10) +1
  const totalNum = Math.ceil(tableData?.length / 10);
  // 目前頁數是否大於 totalNum ? 顯示最後一頁 : 目前頁數
  const newCache = e >= totalNum ? totalNum : e;

  if (isSearch) {
    // 是否有搜尋狀態
    if (tableData?.length > 10) {
      // 資料長度 > 10
      const showDataList = tableData.slice(
        newCache === 1 ? 0 : (newCache - 1) * pageSize,
        newCache * pageSize
      );
      return { data: showDataList, cachePage: newCache };
    } else {
      const showDataList = tableData.slice(0);
      return { data: showDataList, cachePage: newCache };
    }
  } else {
    const showDataList = tableData.slice(
      newCache === 1 ? 0 : (newCache - 1) * pageSize,
      newCache * pageSize
    );
    return { data: showDataList, cachePage: newCache };
  }
};
