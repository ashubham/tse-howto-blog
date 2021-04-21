import React from "react";
import Modal from "antd/lib/modal/Modal";
import Input from "antd/lib/input/Input";
import { notification } from "antd";
import { formatData, createHtmlTable } from "./format-data";

function _sendEmail(rows) {
  console.log("rows", rows);
  let table = createHtmlTable(rows);
  console.log(table);
}

export const useEmailSender = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [data, setData] = React.useState<any[]>([]);
  const sendEmail = async (data: any) => {
    console.log(data);
    setVisible(true);
    setData(formatData(data));
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const messageLink = await _sendEmail(data);
    notification["success"]({
      message: "Email Sent!",
      description: `Email has been sent successfully`
    });
    setConfirmLoading(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const modalJSX = (
    <Modal
      title="Send survey"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div>Send the Email with these {data.length} records.</div>
      <br />
      <Input placeholder="Enter your email address" />
    </Modal>
  );

  return {
    sendEmail,
    modalJSX
  };
};
