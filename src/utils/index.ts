export const calcTableHeight = function () {
  const windowsHeight = window.innerHeight;
  /** 顶部导航栏高度 */
  const headerHeight = (document.getElementsByClassName("ant-layout-header")[0] as HTMLElement)?.offsetHeight;
  const appContainerPadding = 40;
  /** 搜索表单高度 */
  const queryFormHeight = document.getElementById("queryForm")?.offsetHeight;
  /** 操作按钮高度 */
  const operationDomHeight = (document.getElementsByClassName("operationDom")[0] as HTMLElement)?.offsetHeight;
  const tableHeaderHeight = 0;
  const paginationHeight = 55;
  /** 底部footer高度 */
  const footerHeight = (document.getElementsByClassName("ant-layout-footer")[0] as HTMLElement)?.offsetHeight
  let tableHeight = windowsHeight - (headerHeight || 0) - (footerHeight || 0) - (((queryFormHeight as number) + 10) || 0)
    - appContainerPadding - tableHeaderHeight - paginationHeight - (operationDomHeight || 0);
  return tableHeight > 200 ? tableHeight : 200;
}