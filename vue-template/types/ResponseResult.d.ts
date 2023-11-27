/**
 * 响应结果
 */
interface ResponseResult<T> {
  /**
   * 响应码
   */
  code: number;
  /**
   * 响应消息
   */
  message: string;
  /**
   * 响应状态
   */
  type: "success" | "error";
  /**
   * 响应数据
   */
  data: T;
}
